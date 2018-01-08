// Import main
import initStartup from './startup'
initStartup()

if (module.hot) {
    module.hot.accept(['./startup'], () => {
        const nextStartup = require('./startup')['default']
        nextStartup()
    })
}