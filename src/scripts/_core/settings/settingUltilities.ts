import { SettingObject, SettingKey } from './Types'

export let defaultAppSettings: SettingObject = {
    tokenKey: 'T_O_K_E_N',
    loginPath: '/login',
    defaultReturnUrl: '/dashboard',
    rootRole: 'admin',
    identityProfile: 'jwt-cookie',
    tokenExpKey: 'expried',
    tokenRoleKey: 'role'
}

export function importSettings(settings: SettingObject) {
    defaultAppSettings = Object.assign(defaultAppSettings, settings)
}

export function getSetting(settingKey: SettingKey) {
    return defaultAppSettings[settingKey]
}