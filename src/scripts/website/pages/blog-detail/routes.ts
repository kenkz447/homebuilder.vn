import { ViewRoute } from '../../../_core'

import { Page } from './Page'

import { BlogDetailPath } from '../../paths'

export const BlogDetailRoute: ViewRoute = {
    ...BlogDetailPath,
    component: Page
}