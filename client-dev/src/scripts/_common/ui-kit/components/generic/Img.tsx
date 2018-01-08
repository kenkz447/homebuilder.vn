import * as React from 'react'
import * as classNames from 'classnames'

export interface ImageWithSrcProps extends React.ImgHTMLAttributes<any> {
    src: string
}

export interface ImageProps extends React.ImgHTMLAttributes<any> {
    baseOn?: 'width' | 'height' | 'none'
}

const emptyImage = require('images/image-empty.png')

class Img extends React.Component<ImageProps> {
    static defaultProps: ImageProps = {
        src: emptyImage,
        baseOn: 'width'
    }

    img = new Image()

    componentDidMount() {
        if (this.props.onLoad) {
            this.img.onload = this.props.onLoad as any
            this.img.src = this.props.src
        }
    }

    render() {
        const imgProps = { ...this.props }
        imgProps.className = classNames(
            { 'w-100': this.props.baseOn === 'width' },
            { 'h-100': this.props.baseOn === 'height' }
        )

        return (
            <img {...imgProps} />
        )
    }
}

export { Img }