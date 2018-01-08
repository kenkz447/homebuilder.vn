import './Card.scss'

import * as React from 'react'
import { ImageProps, Img } from '../generic'

interface CardProps {
    image?: ImageProps
    title?: JSX.Element
    extra?: JSX.Element
    metaTags?: JSX.Element
    footer?: JSX.Element
}

export function Card(props: CardProps) {
    return (
        <div className="card">
            <div className="card-content">
                <div className="card-image">
                    <Img {...props.image} />
                </div>
                <div className="card-info">
                    {props.title}
                    {props.extra}
                </div>
                <div className="card-footer">
                    <div className="metas">
                        {props.metaTags}
                    </div>
                    <div className="actions">
                        {props.footer}
                    </div>
                </div>
            </div>
        </div>
    )
}

Card['defaultProps'] = {
    title: <label>Card title</label>,
    extra: <span>More text</span>,
    metaTags: <span>tag, car, footer</span>,
    footer: <span>View more...</span>
}