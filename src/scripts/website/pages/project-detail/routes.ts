import { ViewRoute } from '../../../_core'

import { PageWithRouter } from './Page'
import { ProjectDetailPath } from '../../paths'

export const ProjectDetailRoute: ViewRoute = {
    ...ProjectDetailPath,
    component: PageWithRouter
}