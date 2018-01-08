import { autobind } from 'core-decorators'
import concat = require('lodash/concat')
import map = require('lodash/map')

import { createDbStateReducer } from '../../db-state'
import { CRModule, CRService, ResourceObject, Store, ViewRoute } from '../../types'
import { AppInit } from '../init'
import { createAppReducer, createAppStore } from '../state'
import { SettingObject } from './../../settings'

export interface IConfiguration {
    routes: Array<ViewRoute>
    reducers: any
    createStore: () => Store
    settings: SettingObject
    resources: ResourceObject
}

export class Configuration implements IConfiguration {
    routes: Array<ViewRoute> = []
    sagaMiddleWares = []
    reducers = {}
    settings: SettingObject = {}
    resources: ResourceObject = {}
    dbStateModels?: Array<any>

    constructor(settings: SettingObject) {
        this.settings = settings
    }

    registerDbStateModels(models) {
        const dbReducer = createDbStateReducer(models)
        this.reducers = Object.assign(this.reducers, dbReducer)
    }

    @autobind
    addService(crService: CRService) {
        if (crService.middlewares)
            this.sagaMiddleWares = concat(this.sagaMiddleWares, crService.middlewares.sagas)

        if (crService.resources)
            for (const { code } of this.settings.supportLanguages) {
                this.resources[code] = Object.assign(this.resources[code] || {}, crService.resources[code])
            }
    }

    @autobind
    useModule(crModule: CRModule) {
        if (crModule.routes)
            this.routes = concat(this.routes, crModule.routes)

        if (crModule.middlewares)
            this.sagaMiddleWares = concat(this.sagaMiddleWares, crModule.middlewares.sagas)

        if (crModule.resources)
            for (const { code } of this.settings.supportLanguages) {
                this.resources[code] = Object.assign(this.resources[code] || {}, crModule.resources[code])
            }

        this.reducers = Object.assign(this.reducers, crModule.reducers)
    }

    @autobind
    useModules(modules: Array<CRModule>) {
        map(modules, (module) => { this.useModule(module) })
    }

    @autobind
    createStore() {
        const reducer = createAppReducer(this.reducers)
        const store = createAppStore(this.sagaMiddleWares, reducer)
        return store
    }

    @autobind
    appInit() {
        AppInit(this)
    }
}