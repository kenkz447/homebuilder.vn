import { LOCATION_CHANGE } from 'react-router-redux'

import { takeEvery } from 'redux-saga/effects'
import { getSetting } from '../../settings'
import { getRouteInfo } from '../routeUtilities'

function* routeChangeHander(action) {
    const routeInfo = getRouteInfo(action.payload.pathname)
    if (!routeInfo)
        return
    const pageTitle = routeInfo.title || getSetting('appName')
    document.title = pageTitle
}

export function* routesSagas() {
    yield takeEvery(LOCATION_CHANGE, routeChangeHander) 
}