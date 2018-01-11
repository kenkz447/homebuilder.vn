import { ViewRoute } from '../../../_core'

import { Page } from './Page'

import { ContactPath } from '../../paths'

export const ContactRoute: ViewRoute = {
    ...ContactPath,
    component: Page
}