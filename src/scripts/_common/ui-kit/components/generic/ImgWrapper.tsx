import './ImgWrapper.scss'
import * as React from 'react'
import * as classNames from 'classnames'

export interface ImageWrapperProps extends React.HTMLAttributes<any> {
    circle?: boolean
    component?: React.ReactType
    ratioX?: number
    ratioY?: number
    hoverEffect?: 'scale-up'
}

class ImgWrapper extends React.Component<ImageWrapperProps> {
    static defaultProps: ImageWrapperProps = {
        component: 'div'
    }

    render() {
        const props = { ...this.props }
        props.className = classNames(
            'img-wrapper',
            this.props.className,
            this.props.hoverEffect,
            { 'circle': this.props.circle == true }
        )

        const Component = this.props.component

        const style: React.CSSProperties = {}

        if (props.ratioX) {
            const a = props.ratioX / props.ratioY
            const padY = 100 - (a * 100 - 100)
            style.paddingBottom = `${padY}%`
            props.className = classNames(props.className, 'use-ratio')
        }

        return (
            <Component {...props} style={style} />
        )
    }
}

export { ImgWrapper }