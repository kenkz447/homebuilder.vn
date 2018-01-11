import * as React from 'react'
import { autobind } from 'core-decorators'
import { reduxForm, submit } from 'redux-form'
import { getStore } from 'scripts/_core/app/state'
import { Col, Row, VerticalInputWrapper, Input } from 'scripts/_common/ui-kit'

function ContactUsForm(props) {
    return (
        <form>
            <Row gutter={15}>
                <Col span={24} md={{ span: 12 }}>
                    <VerticalInputWrapper label="Name">
                        <Input placeholder="About you"/>
                    </VerticalInputWrapper>
                </Col>
                <Col span={24} md={{ span: 12 }}>
                    <VerticalInputWrapper label="Your email">
                        <Input placeholder="Email or phone"/>
                    </VerticalInputWrapper>
                </Col>
                <Col span={24} md={{ span: 24 }}>
                    <VerticalInputWrapper label="Subject">
                        <Input placeholder="What are you asking for?"/>
                    </VerticalInputWrapper>
                </Col>
                <Col span={24} md={{ span: 24 }}>
                    <VerticalInputWrapper label="Message">
                        <Input component="textarea" placeholder="Enter message" rows={7}/>
                    </VerticalInputWrapper>
                </Col>
            </Row>
        </form>
    )
}

const ContactUsFormRedux = reduxForm({
    form: nameof(ContactUsForm)
})(ContactUsForm)

export class ContactUsFormWrapper extends React.Component {
    render() {
        return (
            <ContactUsFormRedux />
        )
    }

    @autobind
    orderSubmit() {
        const action = submit(nameof(ContactUsForm))
        const store = getStore()
        store.dispatch(action)
    }
}