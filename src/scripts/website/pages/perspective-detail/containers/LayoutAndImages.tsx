import * as React from 'react'
import { Viewer, ImageWithSrcProps, defaultImage, SlickSlider, ImgWrapper, Img, Col, Row } from 'scripts/_common/ui-kit'

import { autobind } from 'core-decorators'

const sampleLayout = require('images/sample-layout.jpg')

interface LayoutAndImagesProps {
    pictures?: Array<ImageWithSrcProps>
}

export class LayoutAndImages extends React.Component<LayoutAndImagesProps> {
    static defaultProps: LayoutAndImagesProps = {
        pictures: [
            { src: defaultImage },
            { src: defaultImage },
            { src: defaultImage },
            { src: defaultImage },
            { src: defaultImage },
            { src: defaultImage },
            { src: defaultImage }
        ]
    }

    viewer: Viewer

    render() {
        return (
            <>
            <Row className="mb-4">
                <Col span={24} className="mb-4">
                    <ImgWrapper ratioX={4} ratioY={3} >
                        <Img src={sampleLayout} />
                    </ImgWrapper>
                </Col>
                <Col span={24} className="mb-4">
                    {this.renderImages()}
                </Col>
            </Row>
            <Viewer ref={(element) => this.viewer = element} images={this.props.pictures} />
            </>
        )
    }

    renderImages() {
        return (
            <SlickSlider pictures={this.props.pictures}
                slidesToShow={6}
                responsive={[{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4
                    }
                }, {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 5
                    }
                }]}
                renderItem={(item, index) => {
                    return (
                        <div key={index}>
                            <ImgWrapper className="clickable" ratioX={1} ratioY={1}>
                                <Img onClick={() => { this.onImageClick(index) }} src={item.src} />
                            </ImgWrapper>
                        </div>
                    )
                }}
            />
        )
    }

    @autobind
    onImageClick(index) {
        this.viewer.toggle({ activeIndex: 0 })
    }
}