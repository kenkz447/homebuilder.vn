import { BaseDbStateEntry, DbStateModel, APISet } from 'scripts/_core'
import { FileInfo } from './file-info'
import { Package } from './package'
import { API_PREFIX } from './base'
import { Project } from 'scripts/_dbState/project'

export interface LayoutPoint {
    image?: FileInfo
    rotate?: number
    x?: number
    y?: number
}

export interface RoomPerspective extends BaseDbStateEntry {
    layoutPoints: Array<LayoutPoint>
}

export interface RoomLayout extends BaseDbStateEntry {
    area?: number
    label?: string
    bedRoomCount?: string
    toiletCount?: string
    totalRoomOfLayout?: number
    package?: Package
    layoutImage?: FileInfo
    children?: Array<RoomLayout>
    project?: Project
}

export class RoomLayoutModel extends DbStateModel<RoomLayout> {
    static modelName = 'room-layouts'
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