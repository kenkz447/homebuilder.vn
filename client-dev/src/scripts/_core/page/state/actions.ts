import { Action } from 'redux'
import { PageOption } from '../types'

export const PAGE_CHANGE = 'CORE@PAGE_CHANGE'
export const CURRENT_PAGE_TITLE = 'currentPageTitle'

export interface PageChangeAction extends Action {
    pageOptions: PageOption
}