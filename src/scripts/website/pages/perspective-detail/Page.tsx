import './perspective-detail.scss'
import * as React from 'react'
import { Row, Col, Img, Icon, ImgWrapper } from 'scripts/_common/ui-kit'
import { MainMaster } from '../../layout'
import { AppNavLink, withDbStateEntry, DbStateEntry } from 'scripts/_core'
import { LayoutDetailPath } from '../../paths'
import { LayoutAndImages } from './containers'
import { ContactUsButton } from '../../containers'
import { PackageModel, Package, HOST_ORIGIN } from 'scripts/_dbState'
import { RouteComponentProps, withRouter } from 'react-router'

interface PageProps extends RouteComponentProps<{ perspective: any }> {
    package: DbStateEntry<Package>
}

@withDbStateEntry({
    modelName: PackageModel.modelName,
    toProp: nameof<PageProps>(o => o.package),
    identyKey: nameof<Package>(o => o.name),
    getId: (ownProps: PageProps) => {
        return ownProps.match.params.perspective
    }
})
export class Page extends React.Component<PageProps> {
    render() {
        const thePackage = this.props.package.value
        const packageIncludedItems = thePackage.packageIncludedItems || []
        const packageFurnitureIncludedItems = thePackage.packageFurnitureIncludedItems || []
        const products = thePackage.products || []

        return (
            <MainMaster>
                <div className="perspective-detail">
                    <div className="mb-3">
                        {this.renderBackToProjectLink({ className: 'back-link text-black' })}
                    </div>
                    <LayoutAndImages layoutImage={thePackage.layout.layoutImage} layoutPoints={thePackage.perspective.layoutPoints} />
                    <Row className="mb-4">
                        <Col span={24} className="mb-4">
                            <div className="perspective-detail-info">
                                <h1 className="project-detail-title">{thePackage.title}</h1>
                                <p className="project-detail-properties">
                                    <span className="property-name">Diện tích</span>: <strong className="property-value font-family-roboto-mono">{thePackage.area}m<sup>2</sup></strong><br />
                                    <span className="property-name">Giá</span>: <strong className="property-value font-family-roboto-mono">{thePackage.price}</strong><br />
                                    <span className="property-name">Loại căn hộ</span>: <strong className="property-value font-family-roboto-mono">{thePackage.houseTypeLabel}</strong><br />
                                    <span className="property-name">Chủ đề</span>: <strong className="property-value font-family-roboto-mono">{thePackage.designThemeLabel}</strong><br />
                                </p>
                                <p className="project-detail-description">
                                    {thePackage.sortText}
                                </p>
                                <ContactUsButton />
                            </div>
                        </Col>
                    </Row>
                    <label className="font-weight-bold text-black text-uppercase">Nội dung bao gồm trong gói này</label>
                    <Row gutter={15} className="white-section mb-4" type="flex">
                        {
                            packageIncludedItems.map(o => (
                                <Col key={o.id} span={8} md={{ span: 4 }} lg={{ span: 3 }}>
                                    <div className="include-item text-center mb-3">
                                        <ImgWrapper className="mb-2 p-4" circle>
                                            <Img srcPrefix={HOST_ORIGIN} src={o.icon} />
                                        </ImgWrapper>
                                        <label className="include-item-label">{o.label}</label>
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                    <label className="font-weight-bold text-black text-uppercase">Nội thất</label>
                    <Row gutter={15} className="white-section mb-4" type="flex">
                        {
                            packageFurnitureIncludedItems.map(o => (
                                <Col key={o.id} span={8} md={{ span: 4 }} lg={{ span: 3 }}>
                                    <div className="include-item text-center mb-3">
                                        <ImgWrapper className="mb-2 p-4" circle>
                                            <Img srcPrefix={HOST_ORIGIN} src={o.icon} />
                                        </ImgWrapper>
                                        <label className="include-item-label">{o.label}</label>
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                    <label className="font-weight-bold text-black text-uppercase">Sản phẩm</label>
                    <Row gutter={15} type="flex" className="mb-4">
                        {
                            products.map(o => (
                                <Col key={o.productId} span={24} md={{ span: 12 }} xl={{ span: 8 }}>
                                    <AppNavLink className="product-link" to={`${location.pathname}/${o.productViewModel.name}`}>
                                        <div className="product-list-item clearfix mb-3">
                                            <ImgWrapper className="product-list-item-image">
                                                <Img srcPrefix={HOST_ORIGIN} src={o.productViewModel.avatar.src} />
                                            </ImgWrapper>
                                            <div className="product-list-item-info pt-3 pl-4">
                                                <p className="project-detail-properties">
                                                    <strong className="property-value font-family-roboto-mono">{o.productViewModel.title}</strong> <br />
                                                    <small className="property-name">Curator9102</small> | <small className="property-name">{o.productViewModel.brand.label}</small><br />
                                                    <span className="property-name">Quantity</span>: <strong className="property-value font-family-roboto-mono">{o.quantity}</strong><br />
                                                </p>
                                            </div>
                                        </div>
                                    </AppNavLink>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            </MainMaster >
        )
    }

    renderBackToProjectLink({ className }) {
        const thePackage = this.props.package.value

        return (
            <AppNavLink className={className} to={`${LayoutDetailPath.path.replace(':layout', `${thePackage.layout.label}-${thePackage.layout.id}`)}`}>
                <Icon type="caret-left" />
                <span>Back to Layout</span>
            </AppNavLink>
        )
    }
}

export const PageWithRouter = withRouter(Page)