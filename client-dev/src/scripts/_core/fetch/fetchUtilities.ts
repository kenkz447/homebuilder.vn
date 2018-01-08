import { FetchResult } from './state/actions'
import { RootState } from './../types/RootState'
import { getStore } from '../app/state'
import { FetchStartPayload, FetchStart, SUCCESS, ERROR, PROCESSING } from './state'

/**
 * Create RequestSend action and execution
 */
const FetchStartBind = (payload: FetchStartPayload) => {
    const requestSendAction = FetchStart(payload)
    const store = getStore()
    store.dispatch(requestSendAction)
}

const Success = (state: RootState, requestKey: string) => {
    return state.fetch.getIn([requestKey, SUCCESS])
}

const Error = (state: RootState, requestKey: string): FetchResult => {
    return state.fetch.getIn([requestKey, ERROR])
}

const IsFetching = (state: RootState, requestKey: string): boolean => {
    return state.fetch.getIn([requestKey, PROCESSING])
}

export const fetchUti = { FetchStartBind, Success, Error, IsFetching }