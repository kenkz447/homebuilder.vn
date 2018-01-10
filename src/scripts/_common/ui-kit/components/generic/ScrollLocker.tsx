import * as React from 'react'
import ScrollLock from 'react-scrolllock'

export class ScrollLocker extends React.Component {
    componentWillMount() {
        // document.documentElement.style.paddingRight = '17px'
        // document.body.style.marginRight = '17px'
    }

    componentWillUnmount() {
        // document.documentElement.style.paddingRight = '0'
        // document.body.style.marginRight = '0'
    }

    render() {
        return <ScrollLock />
    }
}