import { Model, attr } from 'redux-orm'
import { FETCH_SUCCESS, FETCH_START } from '../fetch'
import { getSession } from './orm'
import { Meta } from './Types'

const filter = require('lodash/filter')

export interface DbStateHistory {
    spec?: Array<number | string>
    status?: 'start' | 'success' | 'error'
    meta?: Meta
}

export function getDbStateHistories({ uuid, modelName }) {
    const lastSession = getSession()
    const dbState = lastSession.state
    const historyTable = dbState[`${modelName}_history`]
    const historyItems: Array<DbStateHistory> = historyTable.itemsById

    const histories = filter(historyItems, (history: DbStateHistory) => {
        if (!history.meta.uuid)
            return history.meta.modelName === modelName
        
        return history.meta.uuid === uuid
            && history.meta.modelName === modelName
    })

    return histories as Array<DbStateHistory>
}

export function createDbStateHistoryModel({modelName}) {
    return class DbStateHistoryModel extends Model<DbStateHistory> {
        static modelName = modelName
    
        static fields = {
            [nameof<DbStateHistory>(o => o.spec)]: attr(),
            [nameof<DbStateHistory>(o => o.meta)]: attr(),
        }
    
        static reducer(action, session) {
            if (action.type == FETCH_START) {
                if (!action.payload.meta || !action.payload.meta.history)
                    return
                const history: typeof DbStateHistoryModel = session[this.modelName]
                history.create({
                    meta: action.payload.meta,
                    status: 'start'
                })
            }
            if (action.type == FETCH_SUCCESS) {
                if (!action.payload.request.meta || !action.payload.request.meta.history)
                    return
                let responseValue = action.payload.value
    
                // If server return pagination object
                if (responseValue.totalPages != undefined)
                    responseValue = responseValue.content
    
                const newHistoryLine: DbStateHistory = {
                    meta: action.payload.request.meta,
                    status: 'success'
                }
                
                // if no-content
                if (!responseValue)
                    newHistoryLine.spec = [action.payload.request.meta.id]
                else
                    newHistoryLine.spec = Array.isArray(responseValue) ? responseValue.map(o => o.id) : [responseValue.id]
    
                // Page Info
                if (typeof action.payload.value.totalPages === 'number')
                    newHistoryLine.meta.pagination = {
                        first: action.payload.value.first,
                        last: action.payload.value.last,
                        currentPage: action.payload.value.number,
                        currentItemCount: action.payload.value.numberOfElements,
                        pageSize: action.payload.value.size,
                        sort: action.payload.value.sort,
                        totalItems: action.payload.value.totalElements,
                        totalPages: action.payload.value.totalPages
                    }
    
                const history: typeof DbStateHistoryModel = session[this.modelName]
    
                history.create(newHistoryLine)
            }
        }
    }
}