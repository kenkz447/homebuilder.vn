import * as React from 'react'
import * as classNames from 'classnames'

require('./style.scss')

interface LayoutProps {
    Component?: React.ReactType
    Wrapper?: React.ReactType
}

export function Layout(props: LayoutProps & React.HTMLProps<any>) {
    const element = (
        <props.Component {...props} className={classNames(props.className, 'easyspa-layout')}>
            {props.children}
        </props.Component>
    )
    if (!props.Wrapper)
        return element

    return (
        <props.Wrapper>{element}</props.Wrapper>
    )
}

Layout['defaultProps'] = {
    Component: 'div'
} as LayoutProps

export function LayoutHasSider(props: React.HTMLProps<any>) {
    return (
        <div {...props} className={classNames(props.className, 'easyspa-layout', 'easyspa-layout-has-sider')}>
            {props.children}
        </div>
    )
}