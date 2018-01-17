
import * as React from 'react'

import { DbStateSetOptions } from '../Types'
import { getORM } from '../orm'
import { DbStateSet } from './DbStateSet'

export function dbStateSetInject(entryOptions: DbStateSetOptions, Component) {

    return class extends React.Component<any> {
        dbStateSet: DbStateSet<any>
        componentWillMount() {
            this.updateDbStateSet(this.props)
        }

        componentWillReceiveProps(nextProps) {
            this.updateDbStateSet(nextProps)
        }

        componentWillUnmount() {
            // TODO: Release histories raise by the set
            this.dbStateSet = undefined
        }

        render() {
            return <Component { ...this.props} {...{ [entryOptions.toProp]: this.dbStateSet }} />
        }

        updateDbStateSet(props) {
            const orm = getORM()

            if (orm) {
                const models = orm.getModelClasses()
                const model = models.find(o => o.modelName == entryOptions.modelName)

                const nextFilterResult = entryOptions.searchValues && entryOptions.searchValues(props)

                if (this.dbStateSet) {
                    if (JSON.stringify(this.dbStateSet.searchTerms) !== JSON.stringify(nextFilterResult))
                        this.dbStateSet = undefined
                }

                if (!this.dbStateSet)
                    this.dbStateSet = new DbStateSet({
                        model,
                        filter: nextFilterResult,
                        table: props[entryOptions.toProp],
                        appendNext: entryOptions.appendNext
                    })
                else
                    this.dbStateSet.table = props[entryOptions.toProp]
            }
        }
    }
}