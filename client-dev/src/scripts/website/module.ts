import './website.scss'

import { CRModule } from '../_core'
import { routes } from './pages'
import { reducer } from './state'

export const Module: CRModule = {
    routes,
    reducers: { 'website': reducer }
}