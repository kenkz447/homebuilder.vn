import { BaseDbStateEntry, DbStateModel, APISet } from 'scripts/_core'
import { FileInfo } from './file-info'
import { API_PREFIX } from 'scripts/_dbState/base'

export interface Package extends BaseDbStateEntry {
    title?: string
    avatar?: FileInfo
}

export class PackageModel extends DbStateModel<Package> {
    static modelName = 'packages'
    static apiBase = `${API_PREFIX}/packages`
    static apiSet: APISet<Package> = {
        search: ({ roomLayoutId }) => {
            const apiURL = new URL(`${PackageModel.apiBase}/room-layouts/${roomLayoutId}`)
            return {
                url: apiURL.toString()
            }
        },
        get: (value) => {
            const apiURL = new URL(`${PackageModel.apiBase}/${value.id}`)
            return {
                url: apiURL.toString()
            }
        }
    }
}