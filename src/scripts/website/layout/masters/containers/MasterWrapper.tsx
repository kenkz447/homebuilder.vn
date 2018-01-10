import * as React from 'react'
import { connect } from 'react-redux'

import { Layout } from 'scripts/_common/ui-kit'

import { WebsiteRootState } from '../../../Types'

interface StateProps {
    websiteSetting?: any
    children?: any
    className?: string
}

interface DispatchProps {
    getWebsiteSetting?: () => void
}

function MasterWrapper(props: StateProps & DispatchProps) {
    if (props.websiteSetting == null)
        props.getWebsiteSetting()

    return (
        <Layout className={props.className}>
            {props.children}
        </Layout>
    )
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        websiteSetting: state.fetch.getIn(['WEBSITE_SETTING', 'response'])
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        getWebsiteSetting: () => {

        }
    }
}

export const ConnectedMasterWrapper = connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(MasterWrapper)