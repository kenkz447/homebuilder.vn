import './blogs.scss'
import * as React from 'react'
import { ConnectedMasterWrapper, MasterHeader, MasterFooter } from '../../layout'
import { FullScreenCarousel, Content, Fade, Layout, ImgWrapper, Img } from 'scripts/_common/ui-kit'
import { AppNavLink } from 'scripts/_core'
import { withDbStateSet, DbStateSet } from 'scripts/_core/db-state/dbStateSet'
import { BlogModel, Blog, HOST_ORIGIN } from 'scripts/_dbState'
import { BlogDetailPath } from '../../paths'
const scrollToElement = require('scroll-to-element')

interface PageProps {
    blogs: DbStateSet<Blog>
}

@withDbStateSet({
    modelName: BlogModel.modelName,
    toProp: nameof<PageProps>(o => o.blogs),
    searchValues: () => {
        return ({

        })
    }
})
export class Page extends React.Component<PageProps> {
    render() {
        const blogs = this.props.blogs.value
        const latestPost = blogs.slice(0, 2)
        const oldPost = blogs.slice(3, blogs.length - 3)

        return (
            <div className="app">
                <Fade className="blog-header-wrapper">
                    <ConnectedMasterWrapper>
                        <div className="blogs-carousel-wrapper">
                            {
                                latestPost.length &&
                                <FullScreenCarousel loop auto>
                                    {
                                        latestPost.map((post) => {
                                            const backgroundImage = `url(${HOST_ORIGIN}${post.avatar.src})`
                                            return (
                                                <div key={post.id} className="blogs-carousel-item-wrapper" style={{ backgroundImage }}>
                                                    <div className="blogs-carousel-item">
                                                        <div className="blogs-carousel-item-content" style={{ zIndex: 1 }}>
                                                            <div className="title-block">
                                                                <label className="blogs-carousel-item-date">latest</label>
                                                                <h2>{post.title}</h2>
                                                                <p>{post.description}</p>
                                                            </div>
                                                            <AppNavLink to={BlogDetailPath.path.replace(':blog', post.name)}>Read more...</AppNavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </FullScreenCarousel>
                            }

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
                                oldPost.map(blog => {
                                    return (
                                        <li key={blog.id} className="post-item mb-4 mb-md-5">
                                            <label className="post-date d-none">JAN {blog}</label>
                                            <div className="post-item-preview d-md-none">
                                                <ImgWrapper ratioX={4} ratioY={3}>
                                                    <Img baseOn="height" srcPrefix={HOST_ORIGIN} src={blog.avatar.src} />
                                                </ImgWrapper>
                                            </div>
                                            <AppNavLink to={BlogDetailPath.path.replace(':blog', blog.name)} className="smooth">
                                                <h1 className="mb-0">{blog.title}</h1>
                                                {
                                                    blog.tagTaxonomies && <small className="text-capitalize">{blog.tagTaxonomies.map((o, i) => `${o.label}${i !== blog.tagTaxonomies.length - 1 ? ', ' : ''}`)}</small>
                                                }
                                                <p className="pt-2">{blog.description}</p>
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