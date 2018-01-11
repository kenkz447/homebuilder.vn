import * as React from 'react'
import { Modal } from 'scripts/_common/ui-kit'
import { autobind } from 'core-decorators'
import { ContactUsFormWrapper } from './presentations'
export class ContactUsPageForm extends React.Component {
    modal: Modal
    render() {
        return (
            <>
            <ContactUsFormWrapper />
            <button className="contact-button" onClick={this.onSubmit}>Send</button>
            <Modal ref={(element) => this.modal = element}
                size="small"
                title="Thanks you!"
                actions={[
                    <button onClick={this.toggleModal}>Close</button>,
                ]}
                bodyContent={
                    <div>
                        <p className="mb-3 text-black text-justify">We have received your message and would like to thank you for writing to us. If your inquiry is urgent, please use the telephone number listed below to talk to one of our staff members. Otherwise, we will reply by email as soon as possible.</p>
                        <span>Talk to you soon,</span><br />
                        <strong  className="font-family-roboto-mono">Home Builder</strong>     
                    </div>
                }
                visibled
            />
            </>
        )
    }

    @autobind
    toggleModal() {
        this.modal.toggle()
    }

    @autobind
    onSubmit() {
        this.toggleModal()
    }
}