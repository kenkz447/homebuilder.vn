import './blog-detail.scss'
import * as React from 'react'
import { ConnectedMasterWrapper, MasterHeader, MasterFooter } from '../../layout'
import { Content, Fade, Layout, Row, Col, Icon } from 'scripts/_common/ui-kit'
import { AppNavLink } from 'scripts/_core'

const blogBg02 = require('images/blog-background-2.jpg')

export class Page extends React.Component {
    render() {
        return (
            <div className="app">
                <Fade className="blog-detail-header-wrapper">
                    <ConnectedMasterWrapper>
                        <div className="blog-detail-header-bg" style={{ backgroundImage: `url(${blogBg02})` }}>
                            <div className="blog-detail-header app-container">
                                <div className="blog-detail-info">
                                    <h1 className="blog-detail-title">This is some neat blog post</h1>
                                    <small>Passion, Design, webdevelopment</small>
                                </div>
                            </div>
                        </div>
                        <MasterHeader />
                    </ConnectedMasterWrapper>
                </Fade>
                <Layout>
                    <Content className="main pt-5">
                        <div className="blog-detail-content mb-5">
                            <p>We love design, so much we breathe it. We make things for the better. Our team is specialized in both visual design and webdevelopment.</p>
                            <img alt="" src="http://bone.themanoid.com/images/01.jpg" />
                            <p>We love design, so much we breathe it. We make things for the better. Our team is specialized in both visual design and webdevelopment.</p>
                            <p>Sed <a href="#">tristique</a> bibendum varius. Vivamus dignissim ipsum quam, ut posuere elit lacinia id. Mauris volutpat volutpat tellus ut malesuada. Donec odio justo, facilisis non sem et, malesuada sollicitudin sem. Phasellus mollis faucibus mauris non ultrices. Praesent in ipsum nec dolor ornare bibendum ut sit amet ipsum. Donec commodo, leo in hendrerit vestibulum, mauris sapien eleifend felis, sed molestie dui erat quis eros.</p>
                            <p>Fusce nec erat lacus. Nam fringilla diam sit amet odio venenatis congue. Aenean ut iaculis nisl. Nam venenatis magna in sapien faucibus, varius congue libero finibus. Fusce vel magna quis tellus finibus egestas non eu erat. Donec id ornare orci, non feugiat ante. Mauris pretium lacus turpis, vel tincidunt est laoreet eu.</p>
                        </div>
                        <div className="blog-detail-navigation mb-5">
                            <Row gutter={10}>
                                <Col span={12}>
                                    <AppNavLink to="" className="previous-post">
                                        <div className="arrow">
                                            <Icon type="left" />
                                        </div>
                                        <div className="content">
                                            <div className="title">Previous</div>
                                            <div className="post-title d-none d-md-block">Lorem ipsum item</div>
                                        </div>
                                    </AppNavLink>
                                </Col>
                                <Col span={12}>
                                    <AppNavLink to="" className="next-post">
                                        <div className="content">
                                            <div className="title">
                                                Next
                                            </div>
                                            <div className="post-title d-none d-md-block">Lorem ipsum item</div>
                                        </div>
                                        <div className="arrow">
                                            <Icon type="right" />
                                        </div>
                                    </AppNavLink>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                    <MasterFooter />
                </Layout>
            </div>
        )
    }
}