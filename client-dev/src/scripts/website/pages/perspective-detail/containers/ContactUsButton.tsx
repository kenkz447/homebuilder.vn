import * as React from 'react'
import { Modal } from 'scripts/_common/ui-kit'

export class ContactUsButton extends React.Component {
    render() {
        return (
            <>
            <button className="contact-button">Contact us</button>
            <Modal title="Send message"
                actions={[
                    <button>Close</button>,
                    <button>Send</button>
                ]}
                visibled />
            </>
        )
    }
}