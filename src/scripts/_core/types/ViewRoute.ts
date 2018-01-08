import * as React from 'react'

import { Permission } from '../identity'
import { RouteMenuItem } from './RouteMenu'

export interface ViewRoute {
    /**
     * When true, will only match if the path matches the location.pathname exactly.
     * TODO: exact should set to true when the route has children
     */
    exact?: boolean

    /**
     * Any valid URL path that path-to-regexp understands.
     */
    path?: string

    /**
     * A React component to render only when the location matches.
     * It will be rendered with route props.
     */
    component?: React.ComponentType

    /**
     * Name is unique
     */
    name?: string

    /**
     * Parent Route's name
     */
    parent?: string

    menus?: Array<RouteMenuItem>

    /** 
     * Check current user's role before access
     */
    permissions?: {
        [role: string] : Permission
    }

    /**
     * Skip premission check, wellcome anybody
     */
    allowAnonymous?: boolean

    /** Page title, use 'appName' setting if not set */
    title?: string
}