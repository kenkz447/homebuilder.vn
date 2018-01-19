import './product-detail.scss'
import * as React from 'react'
import { Row, Col, Img, Icon, ImgWrapper, SlickSlider, QueueAnim, Viewer } from 'scripts/_common/ui-kit'
import { MainMaster } from '../../layout'
import { AppNavLink, withDbStateEntry } from 'scripts/_core'
import { PrepectiveDetailPath } from '../../paths'
import { PackageModel, Package, HOST_ORIGIN } from 'scripts/_dbState'
import { withRouter, RouteComponentProps } from 'react-router'
import { DbStateEntry } from 'scripts/_core/db-state'
import { autobind } from 'core-decorators'

interface PageProps extends RouteComponentProps<{ package: string, product: string }> {
    package: DbStateEntry<Package>
}
@withDbStateEntry({
    modelName: PackageModel.modelName,
    toProp: nameof<PageProps>(o => o.package),
    identyKey: nameof<Package>(o => o.name),
    getId: (ownProps: PageProps) => {
        return ownProps.match.params.package
    }
})
export class Page extends React.Component<PageProps> {
    viewer: Viewer

    render() {
        const products = this.props.package.value.products

        if (!products.length)
            return null

        const currentPropduct = products.find(o => o.productViewModel.name === this.props.match.params.product)
        const otherProducts = products.filter(o => o.productViewModel.name != currentPropduct.productViewModel.name)

        const hasPictures = currentPropduct.productViewModel.pictures.length
        return (
            <MainMaster key={currentPropduct.productId}>
                <div className="product-detail">
                    {this.renderBackToProjectLink({ className: 'back-link top d-block d-lg-none' })}
                    <Row gutter={30} className="mb-5">
                        <Col span={24} lg={{ span: hasPictures ? 12 : 9 }} >
                            <Row gutter={6}>
                                {
                                    hasPictures &&
                                    <Col span={6}>
                                        {this.renderImages()}
                                    </Col>
                                }
                                <Col span={hasPictures ? 18 : 24} className="pb-2">
                                    <ImgWrapper className="product-detail-image" >
                                        <Img srcPrefix={HOST_ORIGIN} src={currentPropduct.productViewModel.avatar.src} />
                                    </ImgWrapper>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} lg={{ span: 12 }}>
                            <div>
                                {this.renderBackToProjectLink({ className: 'back-link d-none d-lg-block' })}
                                <h1 className="project-detail-title mb-1">{currentPropduct.productViewModel.title}</h1>
                                <small className="font-family-roboto-mono d-block mb-3">{currentPropduct.productViewModel.code}</small>
                                <p className="project-detail-properties">
                                    <span className="property-name">Size</span>: <strong className="property-value font-family-roboto-mono">{currentPropduct.productViewModel.dimension}</strong><br />
                                    <span className="property-name">Branch</span>: <strong className="property-value font-family-roboto-mono">{currentPropduct.productViewModel.brand.label}</strong><br />
                                    <span className="property-name">Type</span>: <strong className="property-value font-family-roboto-mono">{currentPropduct.productViewModel.type.label}</strong><br />
                                </p>
                                <p className="description">
                                    {currentPropduct.productViewModel.description}
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <label className="font-weight-bold text-black text-uppercase">Products in same package</label>
                    <QueueAnim delay={500} component={Row} componentProps={{ gutter: 15, className: 'mb-4' }}>
                        {
                            otherProducts.map(o => (
                                <Col key={o.productId} span={24} md={{ span: 12 }} xl={{ span: 8 }}>
                                    <AppNavLink className="product-link" to={`${o.productViewModel.name}`}>
                                        <div className="product-list-item clearfix mb-3">
                                            <ImgWrapper className="product-list-item-image">
                                                <Img srcPrefix={HOST_ORIGIN} src={o.productViewModel.avatar.src} />
                                            </ImgWrapper>
                                            <div className="product-list-item-info pt-3 pl-4">
                                                <p className="project-detail-properties">
                                                    <strong className="property-value font-family-roboto-mono">{o.productViewModel.title}</strong> <br />
                                                    <small className="property-name">{o.productViewModel.brand.label}</small> | <small className="property-name"> {o.productViewModel.type.label}</small><br />
                                                    <span className="property-name">Quantity</span>: <strong className="property-value font-family-roboto-mono">{o.quantity}</strong><br />
                                                </p>
                                            </div>
                                        </div>
                                    </AppNavLink>
                                </Col>
                            ))
                        }
                    </QueueAnim>
                </div>
            </MainMaster >
        )
    }

    renderImages() {
        const products = this.props.package.value.products

        const currentPropduct = products.find(o => o.productViewModel.name === this.props.match.params.product)
        const pictures = currentPropduct.productViewModel.pictures.map(o => ({
            ...o,
            src: `${HOST_ORIGIN}${o.src}`
        }))
        return (
            <>
            <SlickSlider pictures={pictures}
                slidesToShow={3}
                vertical
                responsive={[{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3
                    }
                }]}
                renderItem={(item, index) => {
                    return (
                        <div key={index}>
                            <ImgWrapper className="clickable" onClick={() => { this.onImageClick(index) }}>
                                <Img src={item.src} />
                            </ImgWrapper>
                        </div>
                    )
                }}
            />
            <Viewer
                ref={(element) => this.viewer = element}
                images={pictures} />
            </>
        )
    }

    renderBackToProjectLink({ className }) {
        return (
            <AppNavLink className={className} to={`${PrepectiveDetailPath.path.replace(':perspective', this.props.package.value.name)}`}>
                <Icon type="caret-left" />
                <span>Back to Perspective</span>
            </AppNavLink>
        )
    }

    @autobind
    onImageClick(index) {
        this.viewer.toggle({ activeIndex: index })
    }
}

export const PageWithRouter = withRouter(Page)