import { Action } from 'redux'
import { Map, fromJS } from 'immutable'
import { statePipeWithAction } from '../../utilities'

import {
    PROCESSING, ERROR, SUCCESS,
    FETCH_START, FETCH_SUCCESS, FETCH_ERROR, FETCH_CACHE_DELETE,
    FetchResult, FetchStartAction, FetchSuccessAction, FetchErrorAction
} from './actions'

const deleteResponse = ({ name }) => (state: Map<any, any>) =>
    state.set(name, Map({}))

const setSuccess = ({ payload }: FetchSuccessAction) =>
    (state: Map<any, any>) => state.setIn([payload.request.name, SUCCESS], fromJS(payload.value))

const setError = ({ payload }: FetchErrorAction) =>
    (state: Map<any, any>) => state.setIn([payload.request.name, ERROR], fromJS(payload))

const startProcess = ({ payload }: FetchStartAction) =>
    (state: Map<any, any>) => state.setIn([payload.name, PROCESSING], true)

const stopProcess = ({ payload }: { payload: FetchResult }) =>
    (state: Map<any, any>) => state.setIn([payload.request.name, PROCESSING], true)

const initState = Map({})

export const reducer = (state = initState, action: Action) => {
    switch (action.type) {
        case FETCH_START:
            return statePipeWithAction([startProcess], state, action)
        case FETCH_SUCCESS:
            return statePipeWithAction([setSuccess, stopProcess], state, action)
        case FETCH_ERROR:
            return statePipeWithAction([setError, stopProcess], state, action)
        case FETCH_CACHE_DELETE:
            return statePipeWithAction([deleteResponse], state, action)
    }
    return state
}