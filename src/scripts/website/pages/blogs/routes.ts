import { ViewRoute } from '../../../_core'

import { Page } from './Page'

import { BlogsPath } from '../../paths'

export const BlogsRoute: ViewRoute = {
    ...BlogsPath,
    component: Page
}