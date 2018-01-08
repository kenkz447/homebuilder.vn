import { EntryInject } from './EntryInject'
import { connect } from 'react-redux'

import { DbStateEntryOptions } from '../Types'

export function withDbStateEntry(options: DbStateEntryOptions) {
    const mapStateToProps = (state) => {
        const modelName = options.modelName
        
        return {
            [modelName]: state.dbState[modelName],
            router: options.withRouter && state.router
        }
    }

    return (Element) => <any>connect(mapStateToProps)(EntryInject(options, Element))
}