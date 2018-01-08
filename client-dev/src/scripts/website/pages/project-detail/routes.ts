import { ViewRoute } from '../../../_core'

import { Page } from './Page'
import { ProjectDetailPath } from '../../paths'

export const ProjectDetailRoute: ViewRoute = {
    ...ProjectDetailPath,
    component: Page
}