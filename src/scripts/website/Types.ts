import { Map } from 'immutable'
import { RootState } from '../_core'

export interface WebsiteRootState extends RootState {
    website: Map<any, any>
}

export interface PostViewModel {
    id?: number
}