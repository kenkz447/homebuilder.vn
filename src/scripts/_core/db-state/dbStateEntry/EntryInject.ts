import { DbStateEntry } from './DbStateEntry'
import * as React from 'react'

import { getORM } from '../orm'

import { DbStateEntryOptions } from '../Types'
import { ITableState } from 'redux-orm'

const filter = require('lodash/filter')

export function EntryInject(entryOptions: DbStateEntryOptions, ElementType) {
    return class extends React.Component<any> {
        entry: DbStateEntry<any>

        componentWillMount() {
            this.updateEntry(this.props)
        }

        componentWillReceiveProps(nextProps) {
            this.updateEntry(nextProps)
        }

        render() {
            if (!this.entry.value)
                return null

            return React.createElement(ElementType, { ...this.props, [entryOptions.toProp]: this.entry })
        }

        updateEntry(props) {
            const orm = getORM()
            const identyKey = entryOptions.identyKey || 'id'

            if (orm) {
                const models = orm.getModelClasses()
                const model = models.find(o => o.modelName == entryOptions.modelName)
                const table: ITableState = props[entryOptions.modelName]

                // Nếu không có id thì lấy id cuối table
                const currentId = (entryOptions.getId && entryOptions.getId(props)) ||
                    table.items[table.items.indexOf(Math.max.apply(Math, table.items))]

                let item
                if (identyKey === 'id')
                    item = table.itemsById[currentId]
                else {
                    item = filter(table.itemsById, item => item[identyKey] === currentId)[0]
                }

                // Khi function getId được gọi nhưng không trả về giá trị
                // set item = null ngăn Entry gọi lại API
                if (entryOptions.getId && !currentId)
                    item = null

                if (this.entry && (this.entry[identyKey] != undefined) && (this.entry[identyKey] != currentId))
                    this.entry = undefined

                if (!this.entry)
                    this.entry = new DbStateEntry({
                        ...entryOptions,
                        identyKey: identyKey,
                        [identyKey]: currentId,
                        value: item || null,
                        model
                    })
                else
                    this.entry.value = item
            }
        }
    }
}