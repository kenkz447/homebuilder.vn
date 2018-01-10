import './product-detail.scss'
import * as React from 'react'
import { Row, Col, Img, Icon, ImgWrapper, SlickSlider, QueueAnim } from 'scripts/_common/ui-kit'
import { MainMaster } from '../../layout'
import { AppNavLink } from 'scripts/_core'
import { PrepectiveDetailPath } from '../../paths'

export class Page extends React.Component {
    render() {
        return (
            <MainMaster>
                <div className="product-detail">
                    {this.renderBackToProjectLink({ className: 'back-link top d-block d-lg-none' })}
                    <Row gutter={30} className="mb-5">
                        <Col span={24} lg={{ span: 12 }} >
                            <Row gutter={6}>
                                <Col span={6}>
                                    {this.renderImages()}
                                </Col>
                                <Col span={18} className="pb-2">
                                    <ImgWrapper className="product-detail-image">
                                        <Img />
                                    </ImgWrapper>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} lg={{ span: 12 }}>
                            <div>
                                {this.renderBackToProjectLink({ className: 'back-link d-none d-lg-block' })}
                                <h1 className="project-detail-title mb-1">Dressing Table OP2</h1>
                                <small className="font-family-roboto-mono d-block mb-3">Cabinet Tivi</small>
                                <p className="project-detail-properties">
                                    <span className="property-name">Size</span>: <strong className="property-value font-family-roboto-mono">W1200 - D285 - H250</strong><br />
                                    <span className="property-name">Branch</span>: <strong className="property-value font-family-roboto-mono">Home Builder</strong><br />
                                </p>
                                <p className="description">
                                    Ván MFC, mã An cường MS 620 WN, trừ cánh tủ lùa và hộc tủ kéo dùng ván MFC sơn trắng mờ.
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <label className="font-weight-bold text-black text-uppercase">Products in same package</label>
                    <QueueAnim delay={500} component={Row} componentProps={{ gutter: 15, className: 'mb-4' }}>
                        {
                            [0, 1, 2, 3, 4, 5].map(o => (
                                <Col key={o} span={24} md={{ span: 12 }} xl={{ span: 8 }}>
                                    <AppNavLink className="product-link" to={`${o}`}>
                                        <div className="product-list-item clearfix mb-3">
                                            <ImgWrapper className="product-list-item-image">
                                                <Img />
                                            </ImgWrapper>
                                            <div className="product-list-item-info pt-3 pl-4">
                                                <p className="project-detail-properties">
                                                    <strong className="property-value font-family-roboto-mono">Dressing Table OP2</strong> <br />
                                                    <small className="property-name">Curator9102</small> | <small className="property-name"> Table</small><br />
                                                    <span className="property-name">Quantity</span>: <strong className="property-value font-family-roboto-mono">1</strong><br />
                                                </p>
                                            </div>
                                        </div>
                                    </AppNavLink>
                                </Col>
                            ))
                        }
                    </QueueAnim>
                </div>
            </MainMaster >
        )
    }

    renderImages() {
        return (
            <SlickSlider pictures={[{}, {}, {}, {}, {}, {}, {}]}
                slidesToShow={3}
                vertical
                responsive={[{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3
                    }
                }]}
            />
        )
    }

    renderBackToProjectLink({ className }) {
        return (
            <AppNavLink className={className} to={`${PrepectiveDetailPath.path.replace(':prepective', 'sample-perspective')}`}>
                <Icon type="caret-left" />
                <span>Back to Perspective</span>
            </AppNavLink>
        )
    }
}