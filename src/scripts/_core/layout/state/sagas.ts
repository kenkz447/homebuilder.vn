import { takeEvery } from 'redux-saga/effects'

import { WINDOW_CHANGE_WIDTH } from './keys'
import { windowWidthChange } from './saga-middlewares'

export function* layoutSagas() {
    yield takeEvery(WINDOW_CHANGE_WIDTH, windowWidthChange)
}