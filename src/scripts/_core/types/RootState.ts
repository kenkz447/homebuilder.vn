import { List, Map } from 'immutable'

export interface ReducerRootState {
    form
    router
    routes
    menus
    layout
    page
    fetch
    temp
    localization
}

export interface RootState extends ReducerRootState {
    form: any
    router: {
        location: any
    }
    routes: List<Map<any, any>>
    menus: List<Map<any, any>>
    layout: Map<string, any>
    page: Map<string, any>
    fetch: Map<string, any>
    temp: Map<string, any>
    localization: Map<string, any>
}