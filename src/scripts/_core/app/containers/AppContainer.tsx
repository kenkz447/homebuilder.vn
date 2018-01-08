import * as React from 'react'
import { Provider } from 'react-redux'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import { ExtendedConnectedRouter } from '../../router'

const rootDOMNode = document.getElementById('root')

export function createAppContainer(store) {
    return function Main() {
        return (
            <Provider store={store}>
                <ExtendedConnectedRouter />
            </Provider>
        )
    }
}

export const renderAppContainer = (Container, callback?) => {
    ReactDOM.render(
        <AppContainer>
            <Container />
        </AppContainer>
        ,
        rootDOMNode,
        callback
    )
}