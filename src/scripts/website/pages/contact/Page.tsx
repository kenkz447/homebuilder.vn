import './contact.scss'
import * as React from 'react'
import { MasterHeader } from '../../layout'
import { Row, Col, Fade, Layout, Content, Icon } from 'scripts/_common/ui-kit'
import { ContactUsPageForm } from '../../containers'
import { ContactMap } from './containers'
import { autobind } from 'core-decorators';

export class Page extends React.Component {
    render() {
        return (
            <div className="app">
                <Fade className="contact-header-wrapper">
                    <Layout className="contact-header">
                        <ContactMap />
                        <MasterHeader />
                        <Layout className="position-relative">
                            <Content id="contactWrapper" className="contact-wrapper">
                                {this.renderScrollhelper()}
                                <div className="contact" ref={(element) => this.contactContent = element}>
                                    <Row gutter={30}>
                                        <Col span={24} lg={{ span: 12 }}>
                                            <h3>Ways to contact us</h3>
                                            <small className="sub-heading">Forgive us if we don’t pick up. We are often heads down jamming on something that we can’t wait to share. We'll talk real soon. In the meantime, peep our social wall to see what we're up to.</small>
                                            <h3 className="pt-5 mb-4">Contact info</h3>
                                            <Row gutter={15}>
                                                <Col span={12}>
                                                    <div className="input-wrapper">
                                                        <label>Local Address:</label><p className="input-data">House no 33</p>
                                                    </div>
                                                </Col>
                                                <Col span={12}>
                                                    <div className="input-wrapper">
                                                        <label>City:</label>
                                                        <p className="input-data">Ho Chi Minh</p>
                                                    </div>
                                                </Col>
                                                <Col span={12}>
                                                    <div className="input-wrapper">
                                                        <label>Emal:</label><p className="input-data">homebuilder@</p>
                                                    </div>
                                                </Col>
                                                <Col span={12}>
                                                    <div className="input-wrapper">
                                                        <label>Phone no:</label>
                                                        <p className="input-data">000 000 0000</p>

                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={24} lg={{ span: 12 }}>
                                            <h3>Send Message</h3>
                                            <div className="contact-form">
                                                <ContactUsPageForm />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div id="foot" />
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </Fade>
            </div>
        )
    }
    contactPadHead: HTMLDivElement
    contactContent: HTMLDivElement
    renderScrollhelper() {
        return (
            <>
            <div ref={(element) => this.contactPadHead = element} />
            <div className="contact-padtop" />
            <div className="contact-scroll-helper" onClick={this.onSrollHelperClick}>
                <Icon type="up" />
            </div>
            </>
        )
    }

    @autobind
    onSrollHelperClick() {
        if (document.getElementById('contactWrapper').scrollTop)
            this.contactPadHead.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' })
        else
            this.contactContent.scrollIntoView({ block: 'end', inline: 'nearest', behavior: 'smooth' })
    }
}