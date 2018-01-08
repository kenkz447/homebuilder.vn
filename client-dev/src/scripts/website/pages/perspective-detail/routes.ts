import { ViewRoute } from '../../../_core'

import { Page } from './Page'
import { PrepectiveDetailPath } from '../../paths'

export const PrepectiveDetailRoute: ViewRoute = {
    ...PrepectiveDetailPath,
    component: Page
}