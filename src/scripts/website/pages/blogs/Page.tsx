import './blogs.scss'
import * as React from 'react'
import { ConnectedMasterWrapper, MasterHeader, MasterFooter } from '../../layout'
import { FullScreenCarousel, Content, Fade, Layout, ImgWrapper, Img } from 'scripts/_common/ui-kit'
import { AppNavLink } from 'scripts/_core'

const scrollToElement = require('scroll-to-element')

const blogBg01 = require('images/blog-background.jpg')
const blogBg02 = require('images/blog-background-2.jpg')
const blogBg03 = require('images/blog-background-3.jpg')

export class Page extends React.Component {
    render() {
        return (
            <div className="app">
                <Fade className="blog-header-wrapper">
                    <ConnectedMasterWrapper>
                        <div className="blogs-carousel-wrapper">
                            <FullScreenCarousel loop auto>
                                {
                                    [blogBg01, blogBg02, blogBg03].map((o, i) => {
                                        return (
                                            <div className="blogs-carousel-item-wrapper" style={{ backgroundImage: `url(${o})` }}>
                                                <div className="blogs-carousel-item">
                                                    <div className="blogs-carousel-item-content" style={{ zIndex: 1 }}>
                                                        <div className="title-block">
                                                            <label className="blogs-carousel-item-date">latest</label>
                                                            <h2>From Zero to Hero</h2>
                                                            <p>We love design, so much we breathe it. We make things for the better. We're specialized in both visual design and webdevelopment.</p>
                                                        </div>
                                                        <AppNavLink to="/blogs">Read more...</AppNavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </FullScreenCarousel>
                        </div>
                        <MasterHeader />
                        <div className="scrolldown">
                            <a onClick={() => scrollToElement('#oldBlogs')}><span /></a>
                        </div>
                    </ConnectedMasterWrapper>
                </Fade>
                <Layout id="oldBlogs">
                    <Content className="main">
                        <ul className="post-list mt-0 mt-md-5">
                            {
                                [1, 2, 3, 4, 5, 6].map(o => {
                                    return (
                                        <li key={o} className="post-item mb-4 mb-md-5">
                                            <label className="post-date">JAN {o}</label>
                                            <div className="post-item-preview d-md-none">
                                                <ImgWrapper ratioX={4} ratioY={3}>
                                                    <Img baseOn="height" src={blogBg02} />
                                                </ImgWrapper>
                                            </div>
                                            <AppNavLink to="/blogs/blog-detail" className="smooth">
                                                <h1 className="mb-0">This is some neat blog post</h1>
                                                <small>Passion, Design, webdevelopment</small>
                                                <p className="pt-2">We love design, so much we breathe it. We make things for the better. We're specialized in both visual design and webdevelopment.</p>
                                            </AppNavLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </Content>
                    <MasterFooter />
                </Layout>
            </div>
        )
    }
}