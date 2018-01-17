import './project-detail.scss'
import * as React from 'react'
import { Row, Col, Img, Icon, QueueAnim, ImgWrapper } from 'scripts/_common/ui-kit'
import { MainMaster } from '../../layout'
import { AppNavLink, formatCurrency, DbStateEntry } from 'scripts/_core'
import { LayoutDetailPath } from '../../paths'
import { LocationAndSitemap } from './containers'
import { withDbStateEntry } from 'scripts/_core/db-state'
import { ProjectModel, HOST_ORIGIN, Project } from 'scripts/_dbState'
import { withRouter, RouteComponentProps } from 'react-router'
import { RoomType } from 'scripts/_dbState/room-type'

interface PageProps extends RouteComponentProps<{ project: any }> {
    project: DbStateEntry<Project>
}

const sampleLayout = require('images/sample-layout.jpg')

@withDbStateEntry({
    modelName: ProjectModel.modelName,
    toProp: nameof<PageProps>(o => o.project),
    identyKey: nameof<Project>(o => o.name),
    getId: (ownProps: PageProps) => {
        return ownProps.match.params.project
    }
})
export class Page extends React.Component<PageProps> {
    state: {
        selectedRoomType: RoomType
    }

    constructor(props: PageProps) {
        super(props)

        this.state = {
            selectedRoomType: props.project.value.projectBlocks[0]
        }
    }

    render() {
        const project = this.props.project.value
        return (
            <MainMaster>
                <div className="project-detail">
                    {this.renderToAllProjectLink({ className: 'back-link top d-block d-lg-none' })}
                    <Row gutter={30} className="mb-5">
                        <Col span={24} md={{ span: 12 }} lg={{ span: 10 }} xl={{ span: 8 }}>
                            <ImgWrapper ratioX={1} ratioY={1}>
                                <Img srcPrefix={HOST_ORIGIN} src={project.avatar.src} />
                            </ImgWrapper>
                        </Col>
                        <Col span={24} md={{ span: 24 }} lg={{ span: 14 }} xl={{ span: 16 }}>
                            {this.renderToAllProjectLink({ className: 'back-link d-none d-lg-block' })}
                            <h1 className="project-detail-title">{project.title}</h1>
                            <p className="project-detail-properties">
                                <span className="property-name">Area</span>: <strong className="property-value font-family-roboto-mono">{project.area}m<sup>2</sup></strong><br />
                                <span className="property-name">Total apartments</span>: <strong className="property-value font-family-roboto-mono">{project.totalApartment}</strong>
                            </p>
                            <span>Budget:</span>
                            <p className="project-detail-budget font-family-roboto-mono">
                                {formatCurrency(project.budgetMin)} - {formatCurrency(project.budgetMax)} VNĐ
                            </p>
                            <p className="description">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea nulla modi, odit explicabo hic doloremque commodi ab molestiae. Iure voluptatem labore et aliquid soluta inventore expedita quam vel a earum!
                            </p>
                            <LocationAndSitemap
                                location={{ src: `${HOST_ORIGIN}${project.locationImage.src}` }}
                                sitemap={{ src: `${HOST_ORIGIN}${project.siteMapImage.src}` }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="mb-3">
                            <ul className="list-horizontal room-type-list">
                                {
                                    project.projectBlocks.map((roomType, index) => (
                                        <li key={index}>
                                            <a className={roomType.id === this.state.selectedRoomType.id && 'active'}
                                                onClick={() => this.setState({ selectedRoomType: project.projectBlocks[index] })}>{roomType.label}
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Col>
                        <Col span={24}>
                            <QueueAnim delay={500} component={Row} componentProps={{ gutter: 20 }}>
                                {
                                    this.state.selectedRoomType && this.state.selectedRoomType.children.map(roomLayout => (
                                        <Col key={roomLayout.id} span={24} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                                            {this.renderLayouts(roomLayout)}
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

    renderLayouts(layout) {
        return (
            <AppNavLink to={LayoutDetailPath.path.replace(':layout', String(layout))}>
                <div className="room-type-item mb-4">
                    <ImgWrapper hoverEffect="scale-up" ratioX={4} ratioY={3}>
                        <Img src={sampleLayout} />
                    </ImgWrapper>
                    <label className="room-type-item-label">109-S.04</label>
                </div>
            </AppNavLink>
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

export const PageWithRouter = withRouter(Page)