import { ViewRoute } from '../../../_core'

import { Page } from './Page'
import { LayoutDetailPath } from '../../paths'

export const LayoutDetailRoute: ViewRoute = {
    ...LayoutDetailPath,
    component: Page
}