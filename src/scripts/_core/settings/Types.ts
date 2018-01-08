import { LanguageInfo } from '../types'

export type SettingKey =
    'tokenKey' | 'tokenRoleKey' | 'tokenExpKey' |
    'loginPath' | 'defaultReturnUrl' | 'rootRole' | 'identityProfile' |
    'appName' | 'appLogo' | 'appCopyRight'
    
export type IdentityProfile = 'jwt-cookie' | 'jwt-storage' | 'cookie'

export interface SettingObject {
    appName?: string
    appLogo?: string
    appCopyRight?: string
    tokenKey?: string
    tokenRoleKey?: string
    tokenExpKey?: string
    loginPath?: string
    defaultReturnUrl?: string
    rootRole?: string
    identityProfile?: IdentityProfile
    supportLanguages?: Array<LanguageInfo>
}