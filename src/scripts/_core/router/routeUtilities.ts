import { getStore } from '../app/state'
import { ViewRoute, RootState } from '../types'
import { getDecodedToken } from '../identity'
import { getSetting } from '../settings'

export function getRouteInfo(pathName: string): ViewRoute {
    const store = getStore()
    const rootState = store.getState() as RootState
    const routeImu = rootState.routes.find(o => o.get(nameof<ViewRoute>(o => o.path)) === pathName)
    if (routeImu)
        return routeImu.toJS() as any
}

export function checkAccessible(route: ViewRoute): boolean {
    if (route.allowAnonymous)
        return true

    const decodedToken = getDecodedToken()
    if (!decodedToken)
        return

    const roleKey = getSetting('tokenRoleKey')
    const role = decodedToken[roleKey]
    const permission = route.permissions[role]

    return permission != 'deny'
}