import * as React from 'react'
import { AppNavLink, DbStateEntry } from 'scripts/_core'
import { Icon } from 'scripts/_common/ui-kit'
import { withDbStateEntry } from 'scripts/_core/db-state'
import { BlogModel, Blog } from 'scripts/_dbState'

interface NextBlogProps {
    blogId?: number
    nextBlog?: DbStateEntry<Blog>
}

@withDbStateEntry({
    modelName: BlogModel.modelName,
    toProp: nameof<NextBlogProps>(o => o.nextBlog),
    customAction: nameof(BlogModel.apiSet.getNextBlog),
    getId: (ownProps: any) => {
        return ownProps.blogId
    },
})
export class NextBlog extends React.Component<NextBlogProps> {
    render() {
        const nextBlog = this.props.nextBlog.value
        return (
            <AppNavLink to={nextBlog.name} className="next-post">
                <div className="content">
                    <div className="title">Next</div>
                    <div className="post-title d-none d-md-block">{nextBlog.title}</div>
                </div>
                <div className="arrow">
                    <Icon type="right" />
                </div>
            </AppNavLink>
        )
    }
}