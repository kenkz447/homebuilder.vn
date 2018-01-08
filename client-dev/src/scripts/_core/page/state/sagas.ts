import { takeEvery } from 'redux-saga/effects'

import { PAGE_CHANGE, PageChangeAction } from './actions'

function* pageChangeHander(action: PageChangeAction) {

}

export function* pageSagas() {
    yield takeEvery(PAGE_CHANGE, pageChangeHander)
}