import { InitResourece, setLanguages } from '../localization'
import { extractMenuFormRoutes, initMenu } from '../menu'
import { initRoutes } from '../router'
import { completeRouteData } from '../router/helpers'
import { importSettings } from '../settings'
import { run } from './run'
import { APP_RUN } from './state'
import { IConfiguration } from './types/Configuration'

export const AppInit = (configuration: IConfiguration) => {
    const { createStore, routes, resources, settings } = configuration

    setLanguages(settings.supportLanguages)
    importSettings(configuration.settings)

    // Complementary routes data
    const baseRoutes = completeRouteData(routes)
    const languageRoutes = []

    for (const languageInfo of settings.supportLanguages) {
        if (languageInfo.isPrimary)
            continue
        for (const route of baseRoutes) {
            const langRoute = Object.assign({}, route)
            langRoute.path = langRoute.path.replace('/', `/${languageInfo.code}/`)
            langRoute.name = `${languageInfo.code.toUpperCase()}:${langRoute.name}`
            if (langRoute.parent)
                langRoute.parent = `${languageInfo.code.toUpperCase()}:${langRoute.parent}`
            languageRoutes.push(langRoute)
        }
    }

    const store = createStore()

    // Initial resources
    const initResourceAction = InitResourece({ resources })
    store.dispatch(initResourceAction)

    // Initial routes
    const appRoutes = baseRoutes.concat(languageRoutes)
    const initRoutesAction = initRoutes(appRoutes)
    store.dispatch(initRoutesAction)

    // Initial menu
    const menuCollection = extractMenuFormRoutes(routes)
    const initMenuAction = initMenu(menuCollection)
    store.dispatch(initMenuAction)

    const appRuncallback = () => {
        store.dispatch({type: APP_RUN}) 
    }

    // Render your app when all done
    run(store, appRuncallback)
}