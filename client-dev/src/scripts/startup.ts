import 'style/app.scss'

import { Configuration } from './_core/app'

// Import services
import { Service as AntdFetchCatcherService } from './_services/antd-fetch-catcher'
import { Service as AntdNotificationService } from './_services/antd-notification'
import { Service as AntdPopupService } from './_services/antd-popup'
import { Service as LoadingBarServices } from './_services/loading-bar'
import { Service as SrollToTop } from './_services/scroll-to-top'

import './_services/unhandled-error-catcher'

import { Module as Website } from './website'

const supportedLanguages = [
    { code: 'vi', title: 'vietnamese', isPrimary: true },
    { code: 'en', title: 'english' }
]

function startup() {
    const configuration = new Configuration({
        // General
        appName: 'Easyspa 2017',
        appLogo: require('images/logo.png'),
        appCopyRight: 'Copyright 2017, CTNET DIGITAL',
        // Authentication
        tokenKey: '_token',
        tokenExpKey: 'exp',
        tokenRoleKey: 'sub',
        loginPath: '/login',
        defaultReturnUrl: '/settings/spa',
        supportLanguages: supportedLanguages
    })

    // Add modules
    configuration.useModule(Website)

    // Add services
    configuration.addService(AntdPopupService)
    configuration.addService(AntdNotificationService)
    configuration.addService(AntdFetchCatcherService)
    configuration.addService(LoadingBarServices)
    configuration.addService(SrollToTop)
  
    // Start app when your configuration done
    configuration.appInit()
}

export default startup