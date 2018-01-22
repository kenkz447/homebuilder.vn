import * as React from 'react'
import * as classNames from 'classnames'

require('./style.scss')

interface OwnProps extends React.HTMLProps<any> {
    flexDirection?: 'column' | 'row'
    absolute?: boolean
    w100?: boolean,
    h100?: boolean

    component?: React.ReactType
    wrapper?: React.ReactType
}

export function Content(props: OwnProps) {

    const className = classNames(
        props.className,
        'easyspa-layout-content',
        { 'easyspa-layout-content-row': props.flexDirection === 'row' },
        { 'position-absolute': props.absolute === true },
        { 'w-100': props.w100 === true },
        { 'h-100': props.h100 === true }
    )

    const newProps = { ...props }
    newProps.flexDirection && delete newProps.flexDirection
    newProps.absolute && delete newProps.absolute
    newProps.w100 && delete newProps.w100
    newProps.h100 && delete newProps.h100

    const element = (
        <props.component {...newProps} className={className}/>
    )

    if (!props.wrapper)
        return element

    return (
        <props.wrapper>{element}</props.wrapper>
    )
}

const defaultProps: OwnProps = {
    component: 'div'
}

Content['defaultProps'] = defaultProps