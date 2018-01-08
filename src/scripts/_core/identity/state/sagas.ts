import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'

import { push, LOCATION_CHANGE } from 'react-router-redux'

import { getSetting } from '../../settings'
import { getRouteInfo, checkAccessible } from '../../router'
import { FETCH_ERROR, FetchErrorAction } from '../../fetch'

const getLoginURL = () => {
    const loginPath = getSetting('loginPath')

    const loginURL = new URL(loginPath, location.origin)
    const redirectPath = window.location.pathname
    if ((redirectPath != '/') && (loginURL.pathname != redirectPath))
        loginURL.searchParams.append('returnUrl', `${window.location.pathname}${window.location.search}`)

    return `${loginURL.pathname}${loginURL.search}`
}

function* unauthorizedHandler(action: FetchErrorAction) {
    if (action.payload.response.status !== 401)
        return
    
    const loginURL = getLoginURL()
    const redirectToLoginAction = push(loginURL)
    yield put(redirectToLoginAction)
}

function* locationChange(action) {
    const routeInfo = getRouteInfo(window.location.pathname)

    if (!routeInfo)
        return

    const accessPermitted = checkAccessible(routeInfo)
    if (accessPermitted)
        return

    const loginURL = getLoginURL()
    const redirectToLoginAction = push(loginURL)
    yield put(redirectToLoginAction)
}

export function* identitySagas() {
    yield takeEvery(FETCH_ERROR, unauthorizedHandler)
    yield takeEvery(LOCATION_CHANGE, locationChange)
}