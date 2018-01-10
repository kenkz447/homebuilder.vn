import { takeEvery } from 'redux-saga/effects'
import { CRService, FetchErrorAction } from 'scripts/_core'
import { LOCATION_CHANGE } from 'react-router-redux'

function* onLocationChange(action: FetchErrorAction) {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera 
}

export function* sagas() {
    yield takeEvery(LOCATION_CHANGE, onLocationChange)
}

export const Service: CRService = {
    middlewares: { sagas }
}