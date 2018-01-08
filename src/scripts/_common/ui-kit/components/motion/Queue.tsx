import * as React from 'react'

import { default as RCQueueAnim } from 'rc-queue-anim'

export class QueueAnim extends React.Component<any> {
    onEnd() {
    }

    render() {
        return (
            <RCQueueAnim {...this.props} onEnd={this.onEnd}/>
        )
    }
}