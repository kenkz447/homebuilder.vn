import { LanguageInfo, ResourceObject } from '../../types'

export const CHANGE_CURRENT_LANGUAGE = 'LOCALIZATION@CHANGE_CURRENT_LANGUAGE'
export const INIT_RESOURCES = 'LOCALIZATION@INIT_RESOURCES'

export interface ChangeCurrentLanguageAction {
    language: LanguageInfo
}

export const ChangeCurrentLanguage = (payload: ChangeCurrentLanguageAction) => ({
    type: CHANGE_CURRENT_LANGUAGE,
    ...payload
})

export interface InitResources {
    resources: ResourceObject
}

export const InitResourece = (payload: InitResources) => ({
    type: INIT_RESOURCES,
    ...payload
})