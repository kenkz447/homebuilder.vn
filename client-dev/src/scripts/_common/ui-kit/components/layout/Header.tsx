import * as React from 'react'
import * as classNames from 'classnames'

require('./style.scss')

export function HeaderItem(props: React.HTMLProps<any>) {
    return (
        <div {...props} className={classNames('easyspa-layout-header-item', props.className)}/>
    )
}

export function Header(props: React.HTMLProps<any>) {
    return (
        <div {...props} className={classNames(props.className, 'easyspa-layout-header')}>
            {props.children}
        </div>
    )
}

export function HeaderBlank(props: React.HTMLProps<any>) {
    return (
        <div {...props} className={classNames(props.className, 'easyspa-layout-header easyspa-layout-header-blank')}>
            {props.children}
        </div>
    )
}