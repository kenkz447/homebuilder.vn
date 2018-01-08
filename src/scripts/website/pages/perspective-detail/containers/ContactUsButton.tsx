import * as React from 'react'
import { Modal } from 'scripts/_common/ui-kit'
import { autobind } from 'core-decorators'

export class ContactUsButton extends React.Component {
    modal: Modal
    render() {
        return (
            <>
            <button className="contact-button" onClick={this.toggleModal}>Contact us</button>
            <Modal ref={(element) => this.modal = element}
                size="small"
                title="Send message"
                actions={[
                    <button onClick={this.toggleModal}>Close</button>,
                    <button>Send</button>
                ]}
                visibled />
            </>
        )
    }

    @autobind
    toggleModal() {
        this.modal.toggle()
    }
}