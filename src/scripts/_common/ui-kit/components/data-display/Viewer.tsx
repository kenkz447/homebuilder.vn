import 'react-viewer/dist/index.css'
import './Viewer.scss'

import { autobind } from 'core-decorators'
import * as React from 'react'

import { ImageWithSrcProps, ScrollLocker } from '../generic'

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
            {this.state.visible && <ScrollLocker />}
            </>
        )
    }

    @autobind
    toggle({ activeIndex }) {
        const nextVisible = !this.state.visible
        this.setState({
            visible: nextVisible,
            activeIndex: activeIndex
        })
    }

    @autobind
    close() {
        this.setState({ visible: false })
    }
}