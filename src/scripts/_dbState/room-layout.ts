import { BaseDbStateEntry, DbStateModel, APISet } from 'scripts/_core'
import { FileInfo } from './file-info'
import { Package } from './package'
import { API_PREFIX } from './base'

export interface RoomLayout extends BaseDbStateEntry {
    title?: string
    layoutImage?: FileInfo
    packages?: Array<Package>
}

export class RoomLayoutModel extends DbStateModel<RoomLayout> {
    static modelName: 'room-layouts'
    static apiBase = `${API_PREFIX}/room-layouts`
    static apiSet: APISet<RoomLayout> = {
        get: (value) => {
            const apiURL = new URL(`${RoomLayoutModel.apiBase}/${value.id}`)
            return {
                url: apiURL.toString()
            }
        }
    }
}