import { DbStateEntry } from './DbStateEntry'
import * as React from 'react'

import { getORM } from '../orm'

import { DbStateEntryOptions } from '../Types'
import { ITableState } from 'redux-orm'

export function EntryInject(entryOptions: DbStateEntryOptions, ElementType) {
    let entry: DbStateEntry<any>
    return class extends React.Component<any> {
        componentWillMount() {
            this.updateEntry(this.props)
        }

        componentWillReceiveProps(nextProps) {
            this.updateEntry(nextProps)
        }
 
        render() {
            if (!entry.value)
                return null

            return React.createElement(ElementType, { ...this.props, [entryOptions.toProp]: entry })
        }

        updateEntry(props) {
            const orm = getORM()

            if (orm) {
                const models = orm.getModelClasses()
                const model = models.find(o => o.modelName == entryOptions.modelName)
                const table: ITableState = props[entryOptions.modelName]

                // Nếu không có id thì lấy id cuối table
                const currentId = (entryOptions.getId && entryOptions.getId(props)) ||
                    table.items[table.items.indexOf(Math.max.apply(Math, table.items))]

                let item = table.itemsById[currentId]

                // Khi function getId được gọi nhưng không trả về giá trị
                // set item = null ngăn Entry gọi lại API
                if (entryOptions.getId && !currentId)
                    item = null

                if (entry && (entry.id != undefined) && (entry.id != currentId))
                    entry = undefined

                if (!entry)
                    entry = new DbStateEntry({
                        ...entryOptions, id: currentId,
                        value: item || null,
                        model
                    })
                else
                    entry.value = item
            }
        }
    }
}