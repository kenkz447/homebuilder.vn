import * as React from 'react'
import { Icon, QueueAnim, ScrollLocker } from 'scripts/_common/ui-kit'
import { autobind } from 'core-decorators'
import { MasterMenus } from './MasterMenu'

export class MasterOffCanvas extends React.Component {

    static turnHeaderFixedOn() {
        const doc = document.documentElement
        doc.classList.add('show-off-canvas')
        const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
        const fixedTitle = document.getElementById('header')
        fixedTitle.style['position'] = 'absolute'
        fixedTitle.style['top'] = `${top}px`
    }

    static turnHeaderFixedOff(callBack?) {
        const doc = document.documentElement
        if (!doc.classList.contains('show-off-canvas'))
            return
        doc.classList.remove('show-off-canvas')
        setTimeout(() => {
            const fixedTitle = document.getElementById('header')
            fixedTitle.style['position'] = 'fixed'
            fixedTitle.style['top'] = `0`
            callBack && callBack()
        }, 900)
    }

    state = {
        show: false
    }

    render() {
        return (
            <div className="off-canvas h-100 d-md-none">
                <button className="off-canvas-btn" onClick={this.toggleOffCanvas}>
                    <Icon size="larger" type="menu-fold" />
                </button>
                {
                    this.state.show && (<ScrollLocker />)
                }

                <div className="off-canvas-content">
                    <QueueAnim key={this.state.show.toString()} delay={800} component="ul">
                        {MasterMenus.map((menuElement, i) => <li key={i}>{menuElement}</li>)}
                    </QueueAnim>
                </div>
            </div>
        )
    }

    @autobind
    toggleOffCanvas() {
        const nextStatus = !this.state.show

        if (nextStatus)
            this.setState({ show: nextStatus }, MasterOffCanvas.turnHeaderFixedOn)
        else
            MasterOffCanvas.turnHeaderFixedOff(() =>
                this.setState({ show: nextStatus })
            )
    }
}