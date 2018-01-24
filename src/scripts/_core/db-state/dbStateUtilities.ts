import { ORM } from 'redux-orm'
import { initORM, getORM, getSession, sessionEnd, sessionStart } from './orm'
import { createDbStateHistoryModel } from './DbStateHistory'
import { FETCH_START, FETCH_COMPLETE, FETCH_ERROR, FETCH_SUCCESS } from 'scripts/_core/fetch'

function proxyClassForORM(klass) {
    const proxy = new Proxy(klass, {
        apply(target, thisArg, rest) {
            const tartget = new target(...rest)
            return tartget
        },
    })

    Object.defineProperty(proxy, 'session', {
        get: function () {
            return getSession()
        }
    })
    return proxy
}

export function initDbState(models) {
    const orm = new ORM()

    for (const model of models) {
        orm.register(proxyClassForORM(model))

        const clone = createDbStateHistoryModel({ modelName: `${model.modelName}_history` })
        const modelHistory = proxyClassForORM(clone, )
        orm.register(modelHistory)
    }

    // Register history model
    // orm.register(proxyClassForORM(DbStateHistoryModel))

    initORM(orm)
    return orm
}

let dbReducerObjectInstance

export function createDbStateReducer(models: Array<any>) {
    if (dbReducerObjectInstance)
        return dbReducerObjectInstance

    let orm = getORM()
    if (!orm)
        orm = initDbState(models)

    const reducers = {}

    for (const model of models) {
        reducers[model.modelName] = model.reducer
    }

    return dbReducerObjectInstance = {
        dbState: createReducer(orm)
    }
}

function createReducer(orm: ORM, updater = defaultUpdater) {
    return (state, action) =>
        updater(state, action)
}

function defaultUpdater(dbState, action) {

    const orm = getORM()
    const models = orm.getModelClasses()

    if (!dbState)
        return orm.getEmptyState()

    const session = sessionStart(dbState)

    if (action.type === FETCH_START ||
        action.type === FETCH_COMPLETE ||
        action.type === FETCH_ERROR ||
        action.type === FETCH_SUCCESS
    )
        for (const model of models) {
            if (!model.reducer)
                continue

            if (action.payload &&
                action.payload.meta &&
                action.payload.meta.modelName !== model.modelName
            )
                continue

            else if (action.payload &&
                action.payload.request &&
                action.payload.request.meta &&
                action.payload.request.meta.modelName !== model.modelName
            )
                continue

            model.reducer(action, session)

            const historyModel = models.find(o => o.modelName === `${model.modelName}_history`)
            if(historyModel)
                historyModel.reducer(action, session)

            break
        }

    return sessionEnd()
}

export function theEntryId(id?) {
    if (!id)
        id = Math.floor((Math.random() * 1000000000) + 1).toString()

    return `_${id}`
}
