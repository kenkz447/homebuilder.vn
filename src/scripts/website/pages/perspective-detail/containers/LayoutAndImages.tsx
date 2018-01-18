import * as React from 'react'
import { Viewer, SlickSlider, ImgWrapper, Img, Col, Row } from 'scripts/_common/ui-kit'

import { autobind } from 'core-decorators'
import * as classNames from 'classnames'
import { LayoutPoint, HOST_ORIGIN, FileInfo } from 'scripts/_dbState'

interface LayoutAndImagesProps {
    layoutImage?: FileInfo
    layoutPoints?: Array<LayoutPoint>
}

export class LayoutAndImages extends React.Component<LayoutAndImagesProps> {
    static defaultProps: LayoutAndImagesProps = {
        layoutPoints: []
    }

    viewer: Viewer

    render() {
        const pictures = this.props.layoutPoints.map(o => ({
            src: `${HOST_ORIGIN}/${o.image.src}`
        }))

        return (
            <>
            <Row className="mb-4">
                <Col span={24} className="mb-2">
                    <ImgWrapper ratioX={4} ratioY={3} >
                        <Img srcPrefix={HOST_ORIGIN} src={this.props.layoutImage.src} />
                        {this.renderArrows()}
                    </ImgWrapper>
                </Col>
                <Col span={24} className="mb-4">
                    {this.renderImages()}
                </Col>
            </Row>
            <Viewer
                ref={(element) => this.viewer = element}
                images={pictures} />
            </>
        )
    }
    renderArrows() {
        return (
            <div className="layout-arrow-list">
                {
                    this.props.layoutPoints.map((o, i) => {
                        return (
                            <div key={i} className={'layout-arrow-wrapper hint--html hint--bottom'}
                                style={{
                                    top: `${o.y}%`,
                                    left: `${o.x}%`
                                }}>
                                <div className={classNames('layout-arrow')}
                                    style={{
                                        transform: `rotate(${o.rotate}deg)`
                                    }}
                                    onClick={() => { this.onImageClick(i) }}
                                />
                                <div className="layout-arrow-image hint__content d-none d-xl-block">
                                    <ImgWrapper ratioX={4} ratioY={3}>
                                        <Img srcPrefix={HOST_ORIGIN} src={o.image.src} />
                                    </ImgWrapper>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    renderImages() {
        const pictures = this.props.layoutPoints.map(o => o.image)

        return (
            <SlickSlider pictures={pictures}
                slidesToShow={5}
                responsive={[{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2
                    }
                }, {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 4
                    }
                }]}
                renderItem={(item, index) => {
                    return (
                        <div key={index}>
                            <ImgWrapper className="clickable" ratioX={4} ratioY={3} onClick={() => { this.onImageClick(index) }}>
                                <Img srcPrefix={HOST_ORIGIN} src={item.src} />
                            </ImgWrapper>
                        </div>
                    )
                }}
            />
        )
    }

    @autobind
    onImageClick(index) {
        this.viewer.toggle({ activeIndex: index })
    }
}