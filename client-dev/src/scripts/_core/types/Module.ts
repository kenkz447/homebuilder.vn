import { ReducersMapObject, Reducer } from 'redux'
import { ViewRoute } from './ViewRoute'

export interface ModuleMiddlewares {
    sagas?: () => void
    epic?: any
    thunk?: any
}

export interface ResourceObject {
    [langCode: string]: {
        [resourceKey: string]: string
    }
}

export interface CRModule {
    routes?: Array<ViewRoute>
    middlewares?: ModuleMiddlewares
    reducers?: ReducersMapObject
    resources?: ResourceObject
}

export interface CRService {
    middlewares?: ModuleMiddlewares
    reducer?: Reducer<any>
    resources?: ResourceObject
}