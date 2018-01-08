import * as React from 'react'
import * as classNames from 'classnames'

require('./style.scss')

export function Footer(props: React.HTMLProps<any>) {
    return (
        <div {...props} className={classNames(props.className, 'easyspa-layout-footer')}>
            {props.children}
        </div>
    )
}