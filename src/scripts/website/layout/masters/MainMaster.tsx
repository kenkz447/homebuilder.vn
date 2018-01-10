import './MainMaster.scss'
import * as React from 'react'

import { MasterHeader } from './containers/MasterHeader'
import { MasterFooter } from './containers/MasterFooter'
import { ConnectedMasterWrapper } from './containers/MasterWrapper'
import { Content, ContentTransition } from 'scripts/_common/ui-kit'
export class MainMaster extends React.Component {
    render() {
        return (
            <ConnectedMasterWrapper className="app">
                <MasterHeader />
                <Content className="main">
                    <ContentTransition>
                        {this.props.children}
                    </ContentTransition>
                </Content>
                <MasterFooter />
            </ConnectedMasterWrapper >
        )
    }
} 