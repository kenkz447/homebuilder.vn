import * as React from 'react'
import * as classNames from 'classnames'

require('./style.scss')

export function Sider(props: React.HTMLProps<any>) {
    return (
        <div {...props} className={classNames(props.className, 'easyspa-layout-sider')}>
            {props.children}
        </div>
    )
}