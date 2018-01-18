import { ViewRoute } from '../../../_core'

import { PageWithRouter } from './Page'
import { PrepectiveDetailPath } from '../../paths'

export const PrepectiveDetailRoute: ViewRoute = {
    ...PrepectiveDetailPath,
    component: PageWithRouter
}