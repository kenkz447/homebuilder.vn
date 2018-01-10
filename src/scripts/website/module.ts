import './website.scss'

import { CRModule } from '../_core'
import { routes } from './pages'
import { reducer, sagas } from './state'

export const Module: CRModule = {
    routes,
    middlewares: {
        sagas
    },
    reducers: { 'website': reducer }
}