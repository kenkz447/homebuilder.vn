import { Permission } from './../../identity/Types'
import { getSetting } from '../../settings'
import { ViewRoute } from './../../types/ViewRoute'

// Nếu một route không được gán giá trị 'parent' thì sẽ được gán mặc định là Home
const completeRouteParent = (routes: Array<ViewRoute>) => {
    const homeRoute = routes.find((o) => o.path === '/')
    for (var i = 0; i < routes.length; i++) {
        if (routes[i].name != homeRoute.name && !routes[i].parent)
            routes[i].parent = homeRoute.name
    }

    return routes
}

const pathDictonay: { [name: string]: string } = {}

/**
 * Add the parent's path to the front of the current path to complete it
 * @param routes 
 * @param currentRoute 
 */
const completeRoutePath = (routes: Array<ViewRoute>, currentRoute: ViewRoute) => {
    if (currentRoute.path == '/')
        return currentRoute.path

    if (pathDictonay[currentRoute.name])
        return pathDictonay[currentRoute.name]

    if (currentRoute.parent) {
        const parent = routes.find((o) => o.name == currentRoute.parent)
        if (parent.path != '/')
            pathDictonay[currentRoute.name] = completeRoutePath(routes, parent) + (currentRoute.path || '')
        else
            pathDictonay[currentRoute.name] = currentRoute.path
    }

    return pathDictonay[currentRoute.name] || currentRoute.path
}

export const completeRouteData = (routes: Array<ViewRoute>) => {
    const rootRole = getSetting('rootRole')
    const fullControll: Permission = 'full-control'

    completeRouteParent(routes)

    for (var i = 0; i < routes.length; i++) {
        const route = routes[i]
        if (!route.name)
            route.name = route.path.toUpperCase()
        
        route.permissions = Object.assign(route.permissions || {}, { [rootRole]: fullControll })
        route.menus && route.menus.forEach((e) => {
            if (e.exact === undefined)
                e.exact = route.exact
        })
        route.path = completeRoutePath(routes, route)
    }

    return routes
}