import { ApiInfo, ApiCallbacks } from '../fetch/state/actions'
import { ITableState } from 'redux-orm'

export interface BaseDbStateEntry {
    id?: number
}
interface ApiActions { [action: string]: (value) => ApiInfo }

export interface APISet<T extends BaseDbStateEntry = {}> extends ApiActions {
    search?(value): ApiInfo
    get?(value: T): ApiInfo
    create?(value: T): ApiInfo
    update?(value: T): ApiInfo
    delete?(value: T): ApiInfo
}

export interface EntryProps extends DbStateEntryOptions {
    id?: any
    value?: any
    model?: any
    dispatch?: any
}

export interface Entry<T> {
    value: T,
    create(value: T): void
    delete(id: T): void
    update(value: T): void
}

export interface DbStateEntryOptions {
    modelName: string
    toProp?: string
    getId?(ownProps: {}): any
    identyKey?: string
    withRouter?: boolean
}

export interface DbStateSetProps {
    value?: any
    model?: any
    filter?: {}
    modelName?: string
    includes?: Array<string>
    orm?: any
    table?: ITableState
    appendNext?: boolean
}

export interface DbStateSetOptions {
    modelName: string
    toProp?: string
    includes?: Array<string>
    searchValues?: (ownProps) => {}
    withRouter?: boolean
    appendNext?: true
}

export interface CallActionParams {
    actionName: string
    value?: any
    meta?: any
    callbacks?: ApiCallbacks
}

export interface Meta {
    pagination?: Pagination
    action?: string
    resultOnly?: boolean
}

export interface Pagination {
    first: boolean
    last: boolean
    currentPage: number
    currentItemCount?: number
    pageSize: number
    sort: string
    totalItems: number
    totalPages: number
}