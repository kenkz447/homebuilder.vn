import './Modal.scss'

import * as React from 'react'
import { Layout, Header, Content, Footer } from 'scripts/_common/ui-kit'
import { autobind } from 'core-decorators'

interface ModalProps {
    visibled?: boolean
    title?: string
    bodyContent?: JSX.Element
    actions?: Array<JSX.Element>
    size?: 'default' | 'small'
}

export class Modal extends React.Component<ModalProps> {
    state = {
        visibled: false
    }

    modalWrapper

    render() {
        return (
            <div className="modal-wrapper" ref={element => { this.modalWrapper = element }}>
                {this.state.visibled && this.renderModal()}
            </div>
        )
    }

    renderModal() {
        return (
            <>
            <div className="modal-overlay" onClick={this.close} />
            <div className={`modal ${this.props.size}`}>
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
            </>
        )
    }

    @autobind
    close() {
        this.modalWrapper.classList.remove('open')
        setTimeout(() => {
            this.setState({ visibled: false })
        }, 850)
    }

    @autobind
    open() {
        this.setState({ visibled: true })
        setTimeout(() => {
            this.modalWrapper.classList.add('open')
        }, 50)
    }

    @autobind
    toggle() {
        this.state.visibled ? this.close() : this.open()
    }
}