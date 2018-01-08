import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import ReactReduxLoadingBar from 'react-redux-loading-bar'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { put, takeEvery } from 'redux-saga/effects'
import {
    APP_RUN,
    CRService,
    getStore,
    FETCH_COMPLETE,
    FETCH_START,
    FetchCompleteAction,
    FetchStartAction,
    takeFirst,
} from 'scripts/_core'

const style: React.CSSProperties = {
    backgroundColor: 'blue',
    height: '3px',
    left: 0,
    top: 0,
    position: 'fixed',
    zIndex: 999
}

const AppLoadingBar = (props) => {
    const store = getStore()

    return (
        <Provider store={store}>
            <ReactReduxLoadingBar style={style} showFastActions />
        </Provider>
    )
}

function* initLoadingBar() {
    let loadingBarContainerElement = document.getElementById('loadingBarContainer')
    if (!loadingBarContainerElement) {
        loadingBarContainerElement = document.createElement('div')
        loadingBarContainerElement.setAttribute('id', 'loadingBarContainer')
        document.body.appendChild(loadingBarContainerElement)
    }

    const ContainerReactElement = React.createElement(AppLoadingBar)
    render(ContainerReactElement, loadingBarContainerElement)
}

function* ShowOnRequestSend({ payload }: FetchStartAction) {
    if (!payload.hideLoadingBar) {
        const showLoadingAction = showLoading()
        yield put(showLoadingAction)
    }
}

function* HideOnRequestCompleted({ payload }: FetchCompleteAction) {
    if (!payload.request.hideLoadingBar) {
        const hideLoadingAction = hideLoading()
        yield put(hideLoadingAction)
    }
}

export function* sagas() {
    yield takeEvery(FETCH_START, ShowOnRequestSend)
    yield takeEvery(FETCH_COMPLETE, HideOnRequestCompleted)
    yield takeFirst(APP_RUN, initLoadingBar)
}

export const Service: CRService = {
    middlewares: {
        sagas: sagas
    }
}