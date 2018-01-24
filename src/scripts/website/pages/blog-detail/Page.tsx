import './blog-detail.scss'
import * as React from 'react'
import { ConnectedMasterWrapper, MasterHeader, MasterFooter } from '../../layout'
import { Content, Fade, Layout, Row, Col } from 'scripts/_common/ui-kit'
import { withDbStateEntry, DbStateEntry } from 'scripts/_core'
import { BlogModel, Blog, HOST_ORIGIN } from 'scripts/_dbState'
import { RouteComponentProps, withRouter } from 'react-router'
import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'

import { PrevBlog } from './containers'

interface PageProps extends RouteComponentProps<{ blog: string }> {
    blog: DbStateEntry<Blog>
}

@withDbStateEntry({
    modelName: BlogModel.modelName,
    toProp: nameof<PageProps>(o => o.blog),
    identyKey: nameof<Blog>(o => o.name),
    withRouter: true,
    getId: (ownProps: PageProps) => {
        return ownProps.match.params.blog
    }
})
export class Page extends React.Component<PageProps> {
    render() {
        const blog = this.props.blog.value
        const contentStateRaw = JSON.parse(blog.content)
        const contentState = convertFromRaw(contentStateRaw)
        const htmlContent = blog.content && stateToHTML(contentState)
        return (
            <div key={blog.id} className="app">
                <Fade className="blog-detail-header-wrapper">
                    <ConnectedMasterWrapper>
                        <div className="blog-detail-header-bg" style={{ backgroundImage: `url(${HOST_ORIGIN}${blog.avatar.src})` }}>
                            <div className="blog-detail-header app-container">
                                <div className="blog-detail-info">
                                    <h1 className="blog-detail-title">{blog.title}</h1>
                                    {
                                        blog.tagTaxonomies && <small className="text-capitalize">{blog.tagTaxonomies.map((o, i) => `${o.label}${i !== blog.tagTaxonomies.length - 1 ? ', ' : ''}`)}</small>
                                    }
                                </div>
                            </div>
                        </div>
                        <MasterHeader />
                    </ConnectedMasterWrapper>
                </Fade>
                <Layout>
                    <Content className="main pt-5">
                        <div className="blog-detail-content mb-5" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        <div className="blog-detail-navigation mb-5">
                            <Row gutter={10}>
                                <Col span={12}><PrevBlog blogId={blog.id} /></Col>
                            </Row>
                        </div>
                    </Content>
                    <MasterFooter />
                </Layout>
            </div>
        )
    }
}

export const PageWithRouter = withRouter(Page)