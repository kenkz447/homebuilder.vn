import { ViewRoute } from '../../../_core'

import { Page } from './Page'
import { ProductDetailPath } from '../../paths'

export const ProductDetailRoute: ViewRoute = {
    ...ProductDetailPath,
    component: Page
}