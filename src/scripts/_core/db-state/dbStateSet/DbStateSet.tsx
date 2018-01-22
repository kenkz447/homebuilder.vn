import map = require('lodash/map')
import { ITableState, Model } from 'redux-orm'

import { fetchUti, FetchStartPayload } from '../../fetch'
import { DbStateEntry } from '../dbStateEntry'
import { getDbStateHistories } from '../DbStateHistory'
import { getORM } from '../orm'
import { BaseDbStateEntry, DbStateSetProps, APISet, CallActionParams } from '../Types'
import { theEntryId } from '../dbStateUtilities'

const uuidv4 = require('uuid/v4')

export class DbStateSet<T extends BaseDbStateEntry> {
    [Symbol.iterator]() { return this._value.values() }

    model: Model<T> & any

    // Object containt search key/value
    searchTerms

    hasMore = true
    loading = false
    totalItems = 0
    currentPage = 1
    pageSize = 20
    currentItemCount = 0
    appendNext = false
    // Auto generate id
    uuid = uuidv4()
    // To log all called actions
    actionHistories = []
    length = 0

    // Generate entry id, base on entity id
    private entries: { [key: number]: DbStateEntry<any> } = {}

    remove(id) {
        if (!id)
            throw Error('Cannot remove entry with no id!')

        const id_ = theEntryId(id)

        if (!this.entries[id_])
            throw Error('Entry missing!')

        this.entries[id_].status = 'DELETE'
    }

    entry(item: T) {
        const itemEntry = new DbStateEntry({
            modelName: this.model.modelName,
            value: item,
        })

        if (item.id) {
            itemEntry.status = 'MODIFIED'
            const id_ = theEntryId(item.id)

            if (!this.entries[id_])
                throw Error('Entry missing!')

            this.entries[id_] = itemEntry
        }
        else {
            const id_ = theEntryId()
            itemEntry.status = 'NEW'
            this.entries[id_] = itemEntry
        }
    }
    private _value: Array<T> = []
    get value() { return this._value }
    set value(value: Array<T>) {
        for (const entryRaw of value) {
            const entry: DbStateEntry<T> = new DbStateEntry({
                modelName: this.model.modelName,
                value: entryRaw
            })

            entry.status = 'NO_ACTION'
            const index = `_${(entryRaw as any).id}`
            this.entries[index] = entry
        }

        this.length = value.length
        this._value = value
    }

    private getHistories() {
        const histories = getDbStateHistories({
            uuid: this.uuid,
            modelName: this.model.modelName
        })
        return histories
    }

    getLastAction() {
        const histories = this.getHistories()
        const lastAction = histories[histories.length - 1]
        return lastAction
    }

    getLastActionName() {
        const lasAction = this.getLastAction()
        return lasAction.meta.action
    }

    private _table: ITableState = {} as any
    get table() { return this._table }
    set table(table: ITableState) {
        let allItems = map(table.itemsById, (o) => o).reverse()

        const lastAction = this.getLastAction()

        if (lastAction)
            switch (lastAction.status) {
                case 'start':
                    this.loading = true
                    break
                case 'success':
                    if (lastAction.meta.pagination) {
                        this.hasMore = !lastAction.meta.pagination.last
                        this.totalItems = lastAction.meta.pagination.totalItems
                        this.currentPage = lastAction.meta.pagination.currentPage
                        this.pageSize = lastAction.meta.pagination.pageSize
                        this.currentItemCount = lastAction.meta.pagination.currentItemCount
                    }

                    if (lastAction.meta.resultOnly)
                        allItems = allItems.filter(o => lastAction.spec.includes(o.id))
                    else if (!this.appendNext ||
                        lastAction.meta.action === 'create' || lastAction.meta.action === 'update' || lastAction.meta.action === 'delete')
                        allItems = allItems.filter((o, i) => i < this.pageSize)

                    else if (this.searchTerms)
                        for (const key in this.searchTerms) {
                            if (!this.searchTerms[key])
                                continue

                            allItems = allItems.filter(o => {
                                if (typeof o[key] === 'string')
                                    return String(o[key]).indexOf(this.searchTerms[key]) >= 0

                                return o[key] === this.searchTerms[key]
                            })
                        }
                    this.loading = false
                    this.entries = {}
                    this.value = allItems
                    this._table = table
                    break
                case 'error':
                    this.loading = false
                    break
            }
    }

    private callAction(params: CallActionParams) {
        if (!this.model)
            return

        // DO NOT REMOVE LINE BELOW
        const apiSet: APISet<T> = this.model.apiSet
        let apiPayload: FetchStartPayload = apiSet[params.actionName](params.value)
        if (!apiPayload)
            return

        // Meta gen
        if (!apiPayload.meta)
            apiPayload.meta = {}

        apiPayload.meta.history = true
        apiPayload.meta.setId = this.uuid
        apiPayload.meta.action = params.actionName
        apiPayload.meta.modelName = this.model.modelName

        if (params.meta)
            apiPayload.meta = { ...apiPayload.meta, ...params.meta }

        // Add callbacks
        if (params.callbacks)
            apiPayload = { ...apiPayload, ...params.callbacks }

        this.actionHistories.push(params.actionName)

        // Dispath fetch action
        fetchUti.FetchStartBind(apiPayload)
    }

    constructor(props: DbStateSetProps) {

        if (props.model)
            this.model = props.model
        if (props.modelName) {
            const orm = getORM()
            const models = orm.getModelClasses()
            this.model = models.find(o => o.modelName == props.modelName)
        }

        this.searchTerms = props.filter
        this.appendNext = props.appendNext

        if (props.table)
            this.table = props.table

        if (props.filter)
            this.callAction({
                actionName: nameof<APISet<T>>(o => o.search),
                value: props.filter
            })
    }

    commit() {
        return new Promise(
            async (resolve, reject) => {
                try {
                    await Promise.all(
                        Object.keys(this.entries).map(async (entryKey) => {
                            const entry = this.entries[entryKey]
                            if (!entry)
                                return

                            if (entry.status === 'MODIFIED') await entry.update()
                            else if (entry.status === 'NEW') await entry.create()
                            else if (entry.status === 'DELETE') await entry.delete()

                            entry.status = 'NO_ACTION'
                        })
                    )
                    resolve()
                }
                catch (error) {
                    // Set status for errored entry
                    for (const id_ in this.entries) {
                        if (this.entries[id_].status !== 'NO_ACTION') {
                            this.entries[id_].status = 'ERROR_IN_ACTION'
                            break
                        }
                    }
                    reject(error)
                }
            })
    }

    customAction({ actionName, value }) {
        return new Promise((success, error) => {
            this.callAction({
                actionName, value,
                meta: { resultOnly: true },
                callbacks: { success, error }
            })
        })
    }

    refresh() {
        this.callAction({
            actionName: nameof<APISet<T>>(o => o.search),
            value: this.searchTerms
        })
    }

    nextPage(options: { page?: number } = {}) {
        const lastAction = this.getLastAction()
        if (!lastAction.meta.pagination)
            return null

        const currentPage = lastAction.meta.pagination.currentPage
        const nextPage = typeof options.page === 'number' ? options.page : currentPage + 1

        return new Promise((success, error) => {
            this.callAction({
                actionName: nameof<APISet<T>>(o => o.search),
                value: { ...this.searchTerms, page: nextPage },
                callbacks: { success, error }
            })
        })
    }
}