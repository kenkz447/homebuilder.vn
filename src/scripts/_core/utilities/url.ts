import { push } from 'react-router-redux'
import { getStore } from '../app'
export const getUrlParam = (key: string) => {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get(key)
}

export const getUrlParams = (key: string) => {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.getAll(key)
}

export const redirectTo = (pathname: string, params?: {}) => {
    const store = getStore()
    const action = push(pathname, params)
    store.dispatch(action)
}

export const toSearchString = (value: object, equalSign?) => {
    const searchParams = new URLSearchParams()
    for (const key in value) {
        const keyVal = value[key]
        if (Array.isArray(keyVal))
            for (const keyValItem of keyVal)
                searchParams.append(key, keyValItem)
        else
            searchParams.set(key, keyVal)
    }

    return searchParams.toString()
}