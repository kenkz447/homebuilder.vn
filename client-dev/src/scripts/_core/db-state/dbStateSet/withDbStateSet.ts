 
import { DbStateSetOptions } from '../Types'
import { connect } from 'react-redux'
import { dbStateSetInject } from './dbStateSetInject'
 
export function withDbStateSet(options: DbStateSetOptions) {
    const mapStateToProps = (state, ownProps) => {

        return {
            [options.toProp]: state.dbState[options.modelName],
            histories: state.dbState[`${options.modelName}_history`],
            router: options.withRouter && state.router
        }
    }
    return (Component) => {
        const injector = dbStateSetInject(options, Component)

        return <any>connect(mapStateToProps)(injector)
    }
}