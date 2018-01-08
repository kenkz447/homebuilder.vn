import './Modal.scss'

import * as React from 'react'
import * as classNames from 'classnames'
import { Layout, Header, Content, Footer, SlideUp } from 'scripts/_common/ui-kit';

interface ModalProps {
    visibled?: boolean
    title?: string
    bodyContent?: JSX.Element
    actions?: Array<JSX.Element>
}

export class Modal extends React.Component<ModalProps> {
    render() {
        return (
            <SlideUp>
                <div className={classNames('modal-wrapper', { open: this.props.visibled })}>
                    <div className="modal-overlay" />
                    <div className="modal">
                        <Layout className="modal-content">
                            <Header className="modal-header">
                                <label className="modal-title">{this.props.title}</label>
                            </Header>
                            <Content className="modal-body">
                                {this.props.bodyContent}
                            </Content>
                            <Footer className="modal-footer">
                                {this.props.actions}
                            </Footer>
                        </Layout>
                    </div>
                </div>
            </SlideUp>
        )
    }
}