import './style.scss'

import * as React from 'react'

import { TransitionGroup, CSSTransition } from 'react-transition-group'

export function Fade(props) {
    if(!props.children)
        return null
    return (
        <TransitionGroup className={props.className}>
            <CSSTransition {...props}  classNames="fade" appear enter exit timeout={{ enter: 700, exit: 700 }}>
            </CSSTransition>
        </TransitionGroup> 
    )
}

export function SlideUp(props) {
    return (
        <TransitionGroup className={props.className}>
            <CSSTransition {...props} classNames="slideup" appear enter exit timeout={{ appear: 400, enter: 400, exit: 1000 }} />
        </TransitionGroup>
    )
}

export function ContentTransition(props) {
    return (
        <TransitionGroup className={props.className}>
            <CSSTransition {...props} classNames="content" appear enter exit timeout={{ enter: 400, exit: 0 }} />
        </TransitionGroup>
    )
}