import 'slick-carousel/slick/slick.css'

import * as React from 'react'
import { default as Slider, Settings } from 'react-slick'
import { ImgWrapper, Img } from 'scripts/_common/ui-kit'

const Button = require('antd/lib/button')

interface OwnProps extends Settings {
    pictures: Array<any>
    renderItem?(item, index): JSX.Element
}

export class Carousel extends React.Component<OwnProps> {

    static renderNextArrow = (props) => (
        <div className="slick-prev">
            <Button className="border-0" icon="caret-left" onClick={props.onClick} ghost />
        </div>
    )

    static renderPrevArrow = (props) => {
        return (
            <div className="slick-next">
                <Button className="border-0" icon="caret-right" onClick={props.onClick} ghost />
            </div>
        )
    }

    static defaultProps: OwnProps = {
        slidesToShow: 1,
        pictures: [],
        nextArrow: <Carousel.renderPrevArrow />,
        prevArrow: <Carousel.renderNextArrow />,
        arrows: true,
        lazyLoad: true, 
        infinite: false,
        renderItem: (item, index) => {
            return (
                <ImgWrapper key={index} ratioX={1} ratioY={1}>
                    <Img src={item.src} />
                </ImgWrapper>
            )
        }
    }

    render() {
        return (
            <Slider {...this.props}>
                {this.props.pictures.map(this.props.renderItem)}
            </Slider >
        )
    }
}