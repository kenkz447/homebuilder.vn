import './style.scss'

import * as React from 'react'

import { TransitionGroup, CSSTransition } from 'react-transition-group'

export function Fade(props) {
    if(!props.children)
        return null
    return (
        <TransitionGroup className={props.className}>
            <CSSTransition classNames="fade" appear enter exit timeout={{ enter: 700, exit: 700 }}>
                { props.children }
            </CSSTransition>
        </TransitionGroup> 
    )
}

export function SlideUp(props) {
    return (
        <TransitionGroup className={props.className}>
            <CSSTransition classNames="slideup" appear enter exit timeout={{ enter: 400, exit: 1000 }}>
                { props.children }
            </CSSTransition>
        </TransitionGroup>
    )
}

export function ContentTransition(props) {
    return (
        <TransitionGroup className={props.className}>
            <CSSTransition classNames="content" appear enter exit timeout={{ enter: 400, exit: 0 }}>
                {props.children}
            </CSSTransition>
        </TransitionGroup>
    )
}