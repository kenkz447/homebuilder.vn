import './home.scss'
import * as React from 'react'
import { MainMaster } from '../../layout'
import { Row, Col, Card, ImgWrapper, Img } from 'scripts/_common/ui-kit'
import { AppNavLink, DbStateSet, formatCurrency } from 'scripts/_core'
import { withDbStateSet } from 'scripts/_core/db-state/dbStateSet'
import { ProjectModel, Project, HOST_ORIGIN } from 'scripts/_dbState'

interface HomeProps {
    projects: DbStateSet<Project>
}

@withDbStateSet({
    modelName: ProjectModel.modelName,
    toProp: nameof<HomeProps>(o => o.projects),
    searchValues: () => ({

    })
})
export class Page extends React.Component<HomeProps> {
    render() {
        return (
            <MainMaster>
                <div>
                    <div className="mb-4 text-center text-xl-left">
                        <h1>What’s on our mind?</h1>
                        <label>Collection of articles, videos, and resources made by designers at Home Builder.</label>
                    </div>
                    <div className="">
                        <Row gutter={40} type="flex">
                            {
                                this.props.projects.value.map(project => (
                                    <Col key={project.id} span={24} md={{ span: 12 }} xl={{ span: 8 }}>
                                        {this.renderProjectItem(project)}
                                    </Col>
                                ))
                            }
                        </Row>
                    </div>
                </div>
            </MainMaster>
        )
    }

    renderProjectItem(project: Project) {
        return (
            <AppNavLink to={project.name}>
                <Card
                    image={<ImgWrapper ratioX={1} ratioY={1}><Img srcPrefix={HOST_ORIGIN} src={project.avatar.src} /></ImgWrapper>}
                    title={<label>{project.title}</label>}
                    extra={<span className="font-family-roboto-mono">{formatCurrency(project.budgetMin)} - {formatCurrency(project.budgetMax)} VNĐ</span>}
                    metaTags={<small>{project.projectType.label}</small>}
                />
            </AppNavLink>
        )
    }
}