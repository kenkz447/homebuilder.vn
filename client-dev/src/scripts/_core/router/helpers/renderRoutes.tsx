import * as React from 'react'
import { Route } from 'react-router'

import { ViewRoute } from '../../types'
import { CreatePageWrap } from '../../page'

/**
 * Render route components
 * @param rootRoute
 */
export const renderRoutes = (routes: Array<ViewRoute>) => {
    return routes.filter((o) => o.component != undefined).map(({ name, path, component, exact }) => {
        const componentWithWrapper = CreatePageWrap({
            name
        })(component)
        return (
            <Route key={name} exact={exact} path={path} component={componentWithWrapper} />
        )
    })
}