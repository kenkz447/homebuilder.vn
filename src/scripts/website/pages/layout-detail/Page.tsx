import './layout-detail.scss'
import * as React from 'react'
import { Row, Col, Img, Icon, QueueAnim, ImgWrapper } from 'scripts/_common/ui-kit'
import { MainMaster } from '../../layout'
import { AppNavLink, DbStateEntry, withDbStateEntry } from 'scripts/_core'
import { PrepectiveDetailPath } from '../../paths'
import { RouteComponentProps, withRouter } from 'react-router'
import { RoomLayout, RoomLayoutModel, HOST_ORIGIN } from 'scripts/_dbState'

interface PageProps extends RouteComponentProps<{ layout: string }> {
    layout: DbStateEntry<RoomLayout>
}

@withDbStateEntry({
    modelName: RoomLayoutModel.modelName,
    toProp: nameof<PageProps>(o => o.layout),
    identyKey: nameof<RoomLayout>(o => o.id),
    getId: (ownProps: PageProps) => {
        const paramSplited = ownProps.match.params.layout.split('-')
        const id = paramSplited[paramSplited.length - 1]
        return +id
    }
})
export class Page extends React.Component<PageProps> {
    render() {
        const layout = this.props.layout.value
        const perspectives = layout.children || []
        return (
            <MainMaster>
                <div className="layout-detail">
                    {this.renderBackToProjectLink({ className: 'back-link text-black' })}
                    <Row gutter={30}>
                        <Col span={24} lg={{ span: 12 }}>
                            <Row type="flex">
                                <Col span={24} md={{ span: 12 }} lg={{ span: 24 }}>
                                    <div className="layout-detail-info-wrapper">
                                        <div className="layout-detail-info">
                                            <h1 className="project-detail-title">{layout.label}</h1>
                                            <p className="project-detail-properties">
                                                <span className="property-name">Area</span>: <strong className="property-value font-family-roboto-mono">{layout.area}m<sup>2</sup></strong><br />
                                                <span className="property-name">Bed room</span>: <strong className="property-value font-family-roboto-mono">{layout.bedroomCount}</strong><br />
                                                <span className="property-name">Toilet</span>: <strong className="property-value font-family-roboto-mono">{layout.toiletCount}</strong><br />
                                                <span className="property-name">Total apartment</span>: <strong className="property-value font-family-roboto-mono">{layout.totalRoomOfLayout}</strong>
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={24} md={{ span: 12 }} lg={{ span: 24 }}>
                                    <div className="mb-3">
                                        <ImgWrapper ratioX={4} ratioY={3}>
                                            <Img srcPrefix={HOST_ORIGIN} src={layout.layoutImage.src} />
                                        </ImgWrapper>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} lg={{ span: 12 }}>
                            <QueueAnim type="bottom" component={Row} componentProps={{ gutter: 15 }}>
                                <Col key={999} span={24}>
                                    <label className="perspective-title">Packages </label>
                                </Col>
                                {
                                    perspectives.map(perspective => (
                                        <Col key={perspective.id} span={12} md={{ span: 12 }}>
                                            <AppNavLink to={PrepectiveDetailPath.path.replace(':perspective', perspective.package.name)}>
                                                <div className="perspective-item mb-3">
                                                    <ImgWrapper ratioX={4} ratioY={3}>
                                                        <Img srcPrefix={HOST_ORIGIN} src={perspective.package.avatar.src} />
                                                    </ImgWrapper>
                                                    <label className="perspective-item-label">{perspective.label}</label>
                                                </div>
                                            </AppNavLink>
                                        </Col>
                                    ))
                                }
                            </QueueAnim>
                        </Col>
                    </Row>
                </div>
            </MainMaster >
        )
    }

    renderBackToProjectLink({ className }) {
        return (
            <AppNavLink className={className} to={`/${this.props.layout.value.project.name}`}>
                <Icon type="caret-left" />
                <span>Back to Project</span>
            </AppNavLink>
        )
    }
}

export const PageWithRouter = withRouter(Page)