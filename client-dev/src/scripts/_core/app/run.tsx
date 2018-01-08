import { createAppContainer, renderAppContainer } from './containers/AppContainer'

/**
 * Call to start showing your application
 * @param store Main store
 */
export function run(store, callback?: () => void) {
    const AppContainer = createAppContainer(store)
    renderAppContainer(AppContainer, callback)
}