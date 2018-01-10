import 'react-viewer/dist/index.css'
import './Viewer.scss'

import { autobind } from 'core-decorators'
import * as React from 'react'

import { ImageWithSrcProps } from '../generic'
import { default as ScrollLock } from 'react-scrolllock'
const ReactViewer = require('react-viewer')

interface ViewerProps {
    images: Array<ImageWithSrcProps>
}

export class Viewer extends React.Component<ViewerProps> {
    state = {
        visible: false
    }

    render() {
        return (
            <>
            <ReactViewer
                {...this.state}
                onClose={this.close}
                onMaskClick={this.close}
                images={this.props.images}
            />
            {this.state.visible && <ScrollLock />}
            </>
        )
    }

    @autobind
    toggle({ activeIndex }) {
        const nextVisible = !this.state.visible
        this.setState({
            visible: nextVisible,
            activeIndex: activeIndex
        }, () => {
            document.documentElement.style.paddingRight = '17px'
            document.body.style.marginRight = '-17px'
        })
    }

    @autobind
    close() {
        this.setState({ visible: false }, () => {
            document.documentElement.style.paddingRight = '0'
            document.body.style.marginRight = '0'
        })
    }
}