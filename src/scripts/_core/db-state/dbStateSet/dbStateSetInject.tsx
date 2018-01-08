
import * as React from 'react'

import { DbStateSetOptions } from '../Types'
import { getORM } from '../orm'
import { DbStateSet } from './DbStateSet'

export function dbStateSetInject(entryOptions: DbStateSetOptions, Component) {
    let dbStateSet: DbStateSet<any>

    return class extends React.Component<any> {
        componentWillMount() {
            this.updateDbStateSet(this.props)
        }

        componentWillReceiveProps(nextProps) {
            this.updateDbStateSet(nextProps)
        }

        componentWillUnmount() {
            // TODO: Release histories raise by the set
            dbStateSet = undefined
        }

        render() {
            return <Component { ...this.props} {...{ [entryOptions.toProp]: dbStateSet }} />
        }

        updateDbStateSet(props) {
            const orm = getORM()

            if (orm) {
                const models = orm.getModelClasses()
                const model = models.find(o => o.modelName == entryOptions.modelName)

                const nextFilterResult = entryOptions.filter && entryOptions.filter(props)

                if (dbStateSet) {
                    if (JSON.stringify(dbStateSet.searchTerms) !== JSON.stringify(nextFilterResult))
                        dbStateSet = undefined
                }

                if (!dbStateSet)
                    dbStateSet = new DbStateSet({
                        model,
                        filter: nextFilterResult,
                        table: props[entryOptions.toProp],
                        appendNext: entryOptions.appendNext
                    })
                else
                    dbStateSet.table = props[entryOptions.toProp]
            }
        }
    }
}