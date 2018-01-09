import './Input.scss'

import * as React from 'react'

export function Input(props) {
    const Component = props.component

    return (
        <Component {...props}/>
    )
}

Input['defaultProps'] = {
    component: 'input'
}

export function VerticalInputWrapper(props) {
    return (
        <div className="input-wrapper vertical">
            <label htmlFor={props.name}>{props.label}:</label>
            {props.children}
        </div>
    )
}