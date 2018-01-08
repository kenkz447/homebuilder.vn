import { Action } from 'redux'

export const SUCCESS = 'FETCH@SUCCESS'
export const ERROR = 'FETCH@ERROR'
export const PROCESSING = 'FETCH@PROCESSING'

export const FETCH_START = 'FETCH@START'
export const FETCH_SUCCESS = 'FETCH@SUCCESS'
export const FETCH_ERROR = 'FETCH@FETCH_ERROR'
export const FETCH_COMPLETE = 'FETCH@COMPLETE'
export const FETCH_CACHE_DELETE = 'FETCH@CACHE_DELETE'

export interface ApiInfo {
    name?: string
    url: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    meta?: any
}

export interface ApiCallbacks {
    success?: (value) => void
    error?: (response: Response) => void
    complete?: () => void
}

export interface FetchResult {
    response?: Response
    request?: FetchStartPayload
    value?: any
}

export interface FetchStartPayload extends ApiInfo, ApiCallbacks {
    /** Request params */
    data?: {}
    headers?: {}

    /** 
     * For special reason
     * Following https://developer.mozilla.org/en-US/docs/Web/API/Request 
     * */
    requestInit?: RequestInit

    /** 
     * By default, the loading bar always show when you call any request,
     * Your turn this value to false, loading bar will gone
     */
    hideLoadingBar?: boolean

    /** No global error put if response status code following. eg [401] */
    acceptErrorStatus?: Array<number>
}

export interface FetchStartAction extends Action  {
    payload: FetchStartPayload
}

export function FetchStart(payload: FetchStartPayload): FetchStartAction {
    if (!payload.name)
        payload.name == payload.url
    
    return {
        type: FETCH_START,
        payload
    }
}

export interface FetchSuccessAction extends Action {
    payload: FetchResult
}

export const FetchSuccess = (payload: FetchResult): FetchSuccessAction => ({
    type: FETCH_SUCCESS,
    payload
})

export interface FetchErrorAction extends Action {
    payload: FetchResult
}

export const FetchError = (payload: FetchResult): FetchErrorAction => ({
    type: FETCH_ERROR,
    payload
})

export interface FetchCompleteAction extends Action, FetchResult {
    payload: { request?: FetchStartPayload }
}

export const FetchComplete = (payload: FetchResult): FetchCompleteAction => ({
    type: FETCH_COMPLETE,
    payload
})

export const FetchCacheDelete = (name: string) => ({
    type: FETCH_CACHE_DELETE, name
})