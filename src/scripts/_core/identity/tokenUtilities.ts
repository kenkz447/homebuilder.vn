import { getSetting, IdentityProfile } from '../settings'
import * as jwtDecode from 'jwt-decode'
import { Token } from './Types'
import { setCookie, getCookie } from '../utilities'

export function getDecodedToken(token?: string): Token {
    // Try to get token
    if (!token)
        token = getToken()

    if (!token)
        return

    const decodedToken = jwtDecode(token) as Token
    return decodedToken
}

export function getToken() {
    const identityProfile = getSetting('identityProfile') as IdentityProfile

    const tokenKey = getSetting('tokenKey')
    let token = window.sessionStorage.getItem(tokenKey)
    
    if (!token) {
        if (identityProfile === 'jwt-cookie')
            token = getCookie(tokenKey)
        else
            token = window.localStorage.getItem(tokenKey)
    }

    return token
}

export function setToken(token: string, onlySession?: boolean) {
    const tokenKey = getSetting('tokenKey')

    if (onlySession) {
        const identityProfile = getSetting('identityProfile') as IdentityProfile
        const decodedToken: Token = getDecodedToken(token)

        if (identityProfile === 'jwt-cookie') {
            const expKey = getSetting('tokenExpKey')
            const exp = decodedToken[expKey]
            setCookie(tokenKey, token, exp)
        }
        else
            window.localStorage.setItem(tokenKey, token)
    }
    else
        window.sessionStorage.setItem(tokenKey, token)
} 