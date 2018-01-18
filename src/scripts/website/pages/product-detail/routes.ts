import { ViewRoute } from '../../../_core'

import { PageWithRouter } from './Page'
import { ProductDetailPath } from '../../paths'

export const ProductDetailRoute: ViewRoute = {
    ...ProductDetailPath,
    component: PageWithRouter
}