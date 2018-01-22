import { ViewRoute } from '../../../_core'

import { PageWithRouter } from './Page'

import { BlogDetailPath } from '../../paths'

export const BlogDetailRoute: ViewRoute = {
    ...BlogDetailPath,
    component: PageWithRouter
}