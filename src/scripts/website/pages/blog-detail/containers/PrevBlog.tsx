import * as React from 'react'
import { AppNavLink, DbStateEntry } from 'scripts/_core'
import { Icon } from 'scripts/_common/ui-kit'
import { withDbStateEntry } from 'scripts/_core/db-state'
import { BlogModel, Blog } from 'scripts/_dbState'

interface PrevBlogProps {
    blogId?: number
    prevBlog?: DbStateEntry<Blog>
}

@withDbStateEntry({ 
    modelName: BlogModel.modelName,
    toProp: nameof<PrevBlogProps>(o => o.prevBlog),
    customAction: nameof(BlogModel.apiSet.getPrevBlog),
    getId: (ownProps: any) => {
        return ownProps.blogId
    },
})
export class PrevBlog extends React.Component<PrevBlogProps> {
    render() {
        const prevBlog = this.props.prevBlog.value
        return (
            <AppNavLink to={prevBlog.name} className="previous-post">
                <div className="content">
                    <div className="title">Previous</div>
                    <div className="post-title d-none d-md-block">{prevBlog.title}</div>
                </div>
                <div className="arrow">
                    <Icon type="left" />
                </div>
            </AppNavLink>
        )
    }
}