import { takeEvery } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { MasterOffCanvas } from 'scripts/website/layout'

function* onLocationChange(action) {
    MasterOffCanvas.turnHeaderFixedOff()
}

export function* sagas() {
    yield takeEvery(LOCATION_CHANGE, onLocationChange)
}