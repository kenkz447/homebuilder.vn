import { ViewRoute } from '../../../_core'

import { PageWithRouter } from './Page'
import { LayoutDetailPath } from '../../paths'

export const LayoutDetailRoute: ViewRoute = {
    ...LayoutDetailPath,
    component: PageWithRouter
}