import * as React from 'react'
import { Modal } from 'scripts/_common/ui-kit'
import { autobind } from 'core-decorators'
import { ContactUsFormWrapper } from './presentations'
export class ContactUsPageForm extends React.Component {
    render() {
        return (
            <>
            <ContactUsFormWrapper />
            <button className="contact-button" onClick={this.onSubmit}>Send</button>
            <Modal />
            </>
        )
    }

    @autobind
    onSubmit() {

    }
}