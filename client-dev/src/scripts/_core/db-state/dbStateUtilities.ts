import { ORM } from 'redux-orm'
import { initORM, getORM, getSession, sessionEnd, sessionStart } from './orm'
import { createDbStateHistoryModel } from './DbStateHistory'

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

        const clone = createDbStateHistoryModel({modelName: `${model.modelName}_history`})
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

    for (const model of models) {
        if (!model.reducer)
            continue

        model.reducer(dbState, action, session)
    }

    return sessionEnd()
}

export function theEntryId(id?) {
    if (!id)
        id = Math.floor((Math.random() * 1000000000) + 1).toString()

    return `_${id}`
}