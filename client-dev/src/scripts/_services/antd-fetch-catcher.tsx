import * as React from 'react'
import { put, takeEvery } from 'redux-saga/effects'
import { CRService, FETCH_ERROR, FetchErrorAction } from 'scripts/_core'
import { default as ReactJson } from 'react-json-view'
import { ShowNotification } from './antd-notification'

function* onFetchFailed(action: FetchErrorAction) {
    const info = yield action.payload.response.text()
    const errorDescriptionString = `Status: ${action.payload.response.statusText || action.payload.response.status}`

    let errorDescription = undefined
    try {
        const json = JSON.parse(info)
        errorDescription = (
            <div>
                {errorDescriptionString}
                <br /><br />
                <ReactJson src={json} theme="bright:inverted" displayObjectSize={false} displayDataTypes={false}/>
            </div>
        )
    }
    catch (e) {
        errorDescription = errorDescriptionString
    }

    const showNotifyAction = ShowNotification({
        notifyType: 'error',
        message: 'Fetch',
        description: errorDescription,
        duration: 30
    })
    yield put(showNotifyAction)
}

export function* sagas() {
    yield takeEvery(FETCH_ERROR, onFetchFailed)
}

export const Service: CRService = {
    middlewares: { sagas }
}