import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import { reducer as reduxFormReducer } from 'redux-form'

import { ReducerRootState } from '../../types'
import { reducer as menus } from '../../menu/state'
import { reducer as layout } from '../../layout/state'
import { reducer as page } from '../../page/state'
import { reducer as temp } from '../../tempValue/state'
import { reducer as localization } from '../../localization/state'
import { reducer as routes } from '../../router/state'

const appReducer = {
    form: reduxFormReducer,
    router: routerReducer,
    routes,
    menus,
    layout,
    page,
    temp,
    localization
}

function getAppCoreReducer() {
    const fetch = require('../../fetch').reducer

    return {...appReducer, fetch} as ReducerRootState
}

export function createAppReducer(reducers) {
    const coreReducer = getAppCoreReducer()

    return combineReducers({
        ...coreReducer,
        ...reducers,
        loadingBar: loadingBarReducer
    })
}