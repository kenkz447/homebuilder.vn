import * as React from 'react'

import { Wrapper } from './Wrapper'

export const LayoutWrapper: React.StatelessComponent<any> = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>)
}