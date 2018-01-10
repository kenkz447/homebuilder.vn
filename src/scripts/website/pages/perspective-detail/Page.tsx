import './perspective-detail.scss'
import * as React from 'react'
import { Row, Col, Img, Icon, ImgWrapper } from 'scripts/_common/ui-kit'
import { MainMaster } from '../../layout'
import { AppNavLink } from 'scripts/_core'
import { LayoutDetailPath } from '../../paths'
import { LayoutAndImages, ContactUsButton } from './containers'

const packageCarpentry = require('images/package-carpentry.png')
const livingRoom = require('images/living-room.png')
const sampleProduct = require('images/sample-product.jpg')

export class Page extends React.Component {
    render() {
        return (
            <MainMaster>
                <div className="perspective-detail">
                    <div className="mb-3">
                        {this.renderBackToProjectLink({ className: 'back-link text-black' })}
                    </div>
                    <LayoutAndImages />
                    <Row className="mb-4">
                        <Col span={24} className="mb-4">
                            <div className="perspective-detail-info">
                                <h1 className="project-detail-title">RG 109-S.04</h1>
                                <p className="project-detail-properties">
                                    <span className="property-name">Area</span>: <strong className="property-value font-family-roboto-mono">40m<sup>2</sup></strong><br />
                                    <span className="property-name">House Type</span>: <strong className="property-value font-family-roboto-mono">Chung cư</strong><br />
                                    <span className="property-name">Design Theme</span>: <strong className="property-value font-family-roboto-mono">Cổ điển</strong><br />
                                </p>
                                <p className="project-detail-description">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea nulla modi, odit explicabo hic doloremque commodi ab molestiae. Iure voluptatem labore et aliquid soluta inventore expedita quam vel a earum!
                                </p>
                                <ContactUsButton />
                            </div>
                        </Col>
                    </Row>
                    <label className="font-weight-bold text-black text-uppercase">What's include in this Package</label>
                    <Row gutter={15} className="white-section mb-4">
                        {
                            [0, 1, 2, 3, 4].map(o => (
                                <Col key={o} span={8} md={{ span: 4 }} lg={{ span: 3 }}>
                                    <div className="include-item text-center mb-3">
                                        <ImgWrapper className="mb-2 p-4" circle>
                                            <Img src={packageCarpentry} />
                                        </ImgWrapper>
                                        <label className="include-item-label">Carpentry</label>
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                    <label className="font-weight-bold text-black text-uppercase">Funitures Included</label>
                    <Row gutter={15} className="white-section mb-4">
                        {
                            [0, 1, 2, 3].map(o => (
                                <Col key={o} span={8} md={{ span: 4 }} lg={{ span: 3 }}>
                                    <div className="include-item text-center mb-3">
                                        <ImgWrapper className="mb-2 p-4" circle>
                                            <Img src={livingRoom} />
                                        </ImgWrapper>
                                        <label className="include-item-label">Living room</label>
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                    <label className="font-weight-bold text-black text-uppercase">Products in this package</label>
                    <Row gutter={15} className="mb-4">
                        {
                            [0, 1, 2, 3, 4, 5].map(o => (
                                <Col key={o} span={24} md={{ span: 12 }} xl={{ span: 8 }}>
                                    <AppNavLink className="product-link" to={`${location.pathname}/${o}`}>
                                        <div className="product-list-item clearfix mb-3">
                                            <ImgWrapper className="product-list-item-image">
                                                <Img src={sampleProduct} />
                                            </ImgWrapper>
                                            <div className="product-list-item-info pt-3 pl-4">
                                                <p className="project-detail-properties">
                                                    <strong className="property-value font-family-roboto-mono">Dressing Table OP2</strong> <br />
                                                    <small className="property-name">Curator9102</small> | <small className="property-name"> Table</small><br />
                                                    <span className="property-name">Quantity</span>: <strong className="property-value font-family-roboto-mono">{o + 1}</strong><br />
                                                </p>
                                            </div>
                                        </div>
                                    </AppNavLink>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            </MainMaster >
        )
    }

    renderBackToProjectLink({ className }) {
        return (
            <AppNavLink className={className} to={`${LayoutDetailPath.path.replace(':layout', 'sample-layout')}`}>
                <Icon type="caret-left" />
                <span>Back to Layout</span>
            </AppNavLink>
        )
    }
}