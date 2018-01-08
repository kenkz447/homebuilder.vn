import { createStore, Store as ReduxStore } from 'redux'
import { fork } from 'redux-saga/effects'

import concat = require('lodash/concat')

import middlewares, { sagaMiddleware } from './middleware'
import { fetchSagas } from '../../fetch'

function getCoreSaga() {
    const { routesSagas } = require('../../router')
    const { localizationSagas } = require('../../localization')
    const { identitySagas } = require('../../identity')
    const { pageSagas } = require('../../page')

    return [fetchSagas, localizationSagas, identitySagas, pageSagas, routesSagas]
}

function startSagas(sagas) {
    return function* rootSaga() {
        yield sagas.map((saga) => fork(saga))
    }
}

let _store: ReduxStore<any>

export function createAppStore(sagaMiddlewares: Array<any> = [], reducers) {
    // Get current state if reload by hrm
    const currentState = _store && _store.getState()

    const store: ReduxStore<any> = createStore(reducers, currentState || {}, middlewares)

    // Combine app Sagas and additional Sagas
    // Then create root saga and run it
    const coreSagas = getCoreSaga()
    const sagas = concat(coreSagas, sagaMiddlewares)
    const rootSaga = startSagas(sagas)
    sagaMiddleware.run(rootSaga)

    return _store = store
} 

export const getStore = (): ReduxStore<any> => _store