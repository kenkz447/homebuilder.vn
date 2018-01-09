import './layout-detail.scss'
import * as React from 'react'
import { Row, Col, Img, Icon, QueueAnim, ImgWrapper } from 'scripts/_common/ui-kit'
import { MainMaster } from '../../layout'
import { AppNavLink } from 'scripts/_core'
import { PrepectiveDetailPath } from '../../paths'

const sampleLayout = require('images/sample-layout.jpg')
const samplePerspective = require('images/sample-perspective.jpg')

export class Page extends React.Component {
    render() {
        return (
            <MainMaster>
                <div className="layout-detail">
                    {this.renderBackToProjectLink({ className: 'back-link text-black' })}
                    <Row gutter={30}>
                        <Col span={24} lg={{ span: 12 }}>
                            <Row type="flex">
                                <Col span={10} lg={{ span: 24 }}>
                                    <div className="layout-detail-info-wrapper">
                                        <div className="layout-detail-info">
                                            <h1 className="project-detail-title">109-S.04</h1>
                                            <p className="project-detail-properties">
                                                <span className="property-name">Area</span>: <strong className="property-value font-family-roboto-mono">40m<sup>2</sup></strong><br />
                                                <span className="property-name">Bed room</span>: <strong className="property-value font-family-roboto-mono">1</strong><br />
                                                <span className="property-name">Toilet</span>: <strong className="property-value font-family-roboto-mono">1</strong><br />
                                                <span className="property-name">Total apartment</span>: <strong className="property-value font-family-roboto-mono">315</strong>
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 24 }}>
                                    <div className="mb-3">
                                        <ImgWrapper ratioX={4} ratioY={3}>
                                            <Img src={sampleLayout} />
                                        </ImgWrapper>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} lg={{ span: 12 }}>
                            <QueueAnim type="bottom" component={Row} componentProps={{ gutter: 15 }}>
                                <Col key={999} span={24}>
                                    <label className="perspective-title">Perspectives </label>
                                </Col>
                                {
                                    [0, 1, 2, 3, 4, 5, 6, 7, 8].map(o => (
                                        <Col key={o} span={12} md={{ span: 8 }}>
                                            <AppNavLink to={PrepectiveDetailPath.path.replace(':perspective', String(o))}>
                                                <div className="perspective-item mb-3">
                                                    <ImgWrapper ratioX={1} ratioY={1}>    
                                                        <Img src={samplePerspective} />
                                                    </ImgWrapper>    
                                                    <label className="perspective-item-label">RG 109-S.04</label>
                                                </div>
                                            </AppNavLink>
                                        </Col>
                                    ))
                                }
                            </QueueAnim>
                        </Col>
                    </Row>
                </div>
            </MainMaster >
        )
    }

    renderBackToProjectLink({ className }) {
        return (
            <AppNavLink className={className} to="/sample-project">
                <Icon type="caret-left" />
                <span>Back to Project</span>
            </AppNavLink>
        )
    }
}