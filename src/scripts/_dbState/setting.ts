import { DbStateModel, APISet, BaseDbStateEntry } from 'scripts/_core'
import { API_PREFIX } from './base'

export interface Setting extends BaseDbStateEntry  {
    name?: string
    value?: any
}

export class SettingModel extends DbStateModel<Setting> {
    static modelName = 'settings'
    static apiBase = `${API_PREFIX}/settings`
    static apiSet: APISet<Setting> = {
        get: ({name}) => {
            const apiURL = new URL(`${SettingModel.apiBase}/${name}`)
            return {
                url: apiURL.toString()
            }
        }
    }
}