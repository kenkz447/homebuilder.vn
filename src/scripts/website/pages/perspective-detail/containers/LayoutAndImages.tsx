import * as React from 'react'
import { Viewer, ImageWithSrcProps, SlickSlider, ImgWrapper, Img, Col, Row } from 'scripts/_common/ui-kit'

import { autobind } from 'core-decorators'
import * as classNames from 'classnames'

const sampleLayout = require('images/sample-layout.jpg')
const samplePerspective = require('images/sample-room-image.jpg')

interface LayoutAndImagesProps {
    pictures?: Array<ImageWithSrcProps>
}

export class LayoutAndImages extends React.Component<LayoutAndImagesProps> {
    static defaultProps: LayoutAndImagesProps = {
        pictures: [
            { src: samplePerspective },
            { src: samplePerspective },
            { src: samplePerspective },
            { src: samplePerspective },
            { src: samplePerspective },
            { src: samplePerspective },
            { src: samplePerspective }
        ]
    }

    viewer: Viewer

    render() {
        return (
            <>
            <Row className="mb-4">
                <Col span={24} className="mb-2">
                    <ImgWrapper ratioX={4} ratioY={3} >
                        <Img src={sampleLayout} />
                        {this.renderArrows()}
                    </ImgWrapper>
                </Col>
                <Col span={24} className="mb-4">
                    {this.renderImages()}
                </Col>
            </Row>
            <Viewer
                ref={(element) => this.viewer = element}
                images={this.props.pictures} />
            </>
        )
    }
    renderArrows() {
        const layoutPoints = [{
            y: 60.8681,
            x: 30,
            rotate: 80,
            image: {
                src: samplePerspective
            }
        }, {
            y: 40.7552,
            x: 75.8681,
            rotate: 230,
            image: {
                src: samplePerspective
            }
        }, {
            y: 60.7552,
            x: 60.8681,
            rotate: 316,
            image: {
                src: samplePerspective
            }
        }]

        return (
            <div className="layout-arrow-list">
                {
                    layoutPoints.map((o, i) => {
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
                                        <Img src={o.image.src} />
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
        return (
            <SlickSlider pictures={this.props.pictures}
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
                                <Img src={item.src} />
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