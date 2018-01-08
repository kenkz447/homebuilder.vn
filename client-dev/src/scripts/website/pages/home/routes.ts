import { ViewRoute } from '../../../_core'

import { Page } from './Page'

import { HomePath } from '../../paths'
export const HomeRoute: ViewRoute = {
    ...HomePath,
    component: Page
}