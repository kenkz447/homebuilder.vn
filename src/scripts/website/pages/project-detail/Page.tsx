import './project-detail.scss'
import * as React from 'react'
import { Row, Col, Img, Icon, QueueAnim, ImgWrapper } from 'scripts/_common/ui-kit'
import { MainMaster } from '../../layout'
import { AppNavLink } from 'scripts/_core'
import { LayoutDetailPath } from '../../paths'
import { LocationAndSitemap } from './containers'

interface PageProps {
    project: {
        locationImage?: any
        sitemapImage?: any
    }
}

const sampleLayout = require('images/sample-layout.jpg')
const sampleProject = require('images/sample-project.jpg')

export class Page extends React.Component<PageProps> {
    static defaultProps: PageProps = {
        project: {}
    }

    render() {
        return (
            <MainMaster>
                <div className="project-detail">
                    {this.renderToAllProjectLink({ className: 'back-link top d-block d-lg-none' })}
                    <Row gutter={30} className="mb-5">
                        <Col span={24} md={{ span: 12 }} lg={{ span: 10 }} xl={{ span: 8 }}>
                            <ImgWrapper ratioX={1} ratioY={1}>
                                <Img src={sampleProject} />
                            </ImgWrapper>
                        </Col>
                        <Col span={24} md={{ span: 24 }} lg={{ span: 14 }} xl={{ span: 16 }}>
                            {this.renderToAllProjectLink({ className: 'back-link d-none d-lg-block' })}
                            <h1 className="project-detail-title">Eloquent Javascript</h1>
                            <p className="project-detail-properties">
                                <span className="property-name">Area</span>: <strong className="property-value font-family-roboto-mono">3000m<sup>2</sup></strong><br />
                                <span className="property-name">Total apartments</span>: <strong className="property-value font-family-roboto-mono">315</strong>
                            </p>
                            <span>Budget:</span>
                            <p className="project-detail-budget font-family-roboto-mono">
                                50.000.000 - 200.000.000 VNĐ
                            </p>
                            <p className="description">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea nulla modi, odit explicabo hic doloremque commodi ab molestiae. Iure voluptatem labore et aliquid soluta inventore expedita quam vel a earum!
                            </p>
                            <LocationAndSitemap
                                location={this.props.project.locationImage}
                                sitemap={this.props.project.sitemapImage}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="mb-3">
                            <ul className="list-horizontal room-type-list">
                                <li>
                                    <AppNavLink to="/">Studio</AppNavLink>
                                </li>
                                <li>
                                    <AppNavLink to="/a">1 Bed Room</AppNavLink>
                                </li>
                                <li>
                                    <AppNavLink to="/b">2 Bed Room</AppNavLink>
                                </li>
                                <li>
                                    <AppNavLink to="/c">3 Bed Room</AppNavLink>
                                </li>
                            </ul>
                        </Col>
                        <Col span={24}>
                            <QueueAnim delay={500} component={Row} componentProps={{ gutter: 20 }}>
                                {
                                    [0, 1, 2, 3, 4, 5, 6, 7].map(o => (
                                        <Col key={o} span={24} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                                            <AppNavLink to={LayoutDetailPath.path.replace(':layout', String(o))}>
                                                <div className="room-type-item mb-4">
                                                    <ImgWrapper hoverEffect="scale-up" ratioX={4} ratioY={3}>
                                                        <Img src={sampleLayout} />
                                                    </ImgWrapper>
                                                    <label className="room-type-item-label">109-S.04</label>
                                                </div>
                                            </AppNavLink>
                                        </Col>
                                    ))
                                }
                            </QueueAnim>
                        </Col>
                    </Row>
                </div>
            </MainMaster>
        )
    }

    renderToAllProjectLink({ className }) {
        return (
            <AppNavLink className={className} to="/">
                <Icon type="caret-left" />
                <span>All Project</span>
            </AppNavLink>
        )
    }
}