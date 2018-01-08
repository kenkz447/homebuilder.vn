import { put, takeEvery } from 'redux-saga/effects'

import { getToken } from '../../identity'

import {
    FETCH_START,
    FetchSuccess, FetchStartAction, FetchError, FetchComplete
} from './actions'

function* onFetchStart({ payload }: FetchStartAction) {
    try {
        const token = getToken()
        const authBearer = token && `Bearer ${token}`
        const authHeader = {
            'Authorization': authBearer
        }

        if (!payload.requestInit) {
            const headers = Object.assign(payload.headers || {}, authHeader, {
                'Content-Type': 'application/json'
            })

            payload.requestInit = {
                method: payload.method || 'GET',
                headers: new Headers(headers),
                body: payload.data && JSON.stringify(payload.data)
            }
        } else {
            const headers = new Headers(authHeader)

            if (payload.requestInit.headers)
                for (const header in payload.requestInit.headers)
                    headers.append(header, payload.requestInit.headers[header])

            payload.requestInit.headers = headers
        }

        const response: Response = yield fetch(payload.url, payload.requestInit)

        if (response.ok) {
            // Sometime, server not response any object
            // In this case, using response.json() will cause “Unexpected end of JSON” error
            // So rather than use response.json(), I decided to use response.text() to parse the response. 
            // Then I just test the response for a length and either parse the string to JSON or return an empty object.
            let responseValue = yield response.text()
            if (responseValue)
                responseValue = JSON.parse(responseValue)

            const requestResponseAction = FetchSuccess({
                request: payload,
                response,
                value: responseValue
            })
            yield put(requestResponseAction)

            // Do callback after done
            payload.success && payload.success(responseValue)
        }
        else
            throw response
    } catch (response /**type Response*/) {
        const isSkipErrorPut = payload.acceptErrorStatus && payload.acceptErrorStatus.includes(response.status)

        if (!isSkipErrorPut) {
            const fetchFailedPayload = {
                response,
                request: payload
            }
            const requestFailedAction = FetchError(fetchFailedPayload)
            yield put(requestFailedAction)
        }

        // Request error callback
        payload.error && payload.error(response)
    }
    finally {
        const fetchCompletedPayload = {
            request: payload
        }
        const fetchCompletedAction = FetchComplete(fetchCompletedPayload)
        yield put(fetchCompletedAction)

        // Request complete callback
        payload.complete && payload.complete()
    }
}

export function* fetchSagas() {
    yield takeEvery(FETCH_START, onFetchStart)
}