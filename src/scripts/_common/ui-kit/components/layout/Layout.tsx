import * as React from 'react'
import * as classNames from 'classnames'

require('./style.scss')

interface LayoutProps {
    component?: React.ReactType
    wrapper?: React.ReactType
}

export function Layout(props: LayoutProps & React.HTMLProps<any>) {
    const element = (
        <props.component {...props} className={classNames(props.className, 'easyspa-layout')}>
            {props.children}
        </props.component>
    )
    if (!props.wrapper)
        return element

    return (
        <props.wrapper>{element}</props.wrapper>
    )
}

Layout['defaultProps'] = {
    component: 'div'
} as LayoutProps

export function LayoutHasSider(props: React.HTMLProps<any>) {
    return (
        <div {...props} className={classNames(props.className, 'easyspa-layout', 'easyspa-layout-has-sider')}>
            {props.children}
        </div>
    )
}