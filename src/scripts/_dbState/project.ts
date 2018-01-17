import { Taxonomy } from './taxonomy'
import { GeographicaLocation } from './geographica-location'
import { FileInfo } from './file-info'
import { APISet, BaseDbStateEntry, DbStateModel } from 'scripts/_core'
import { API_PREFIX } from './base'
import { RoomType } from './room-type'

export interface Project extends BaseDbStateEntry {
    avatar?: FileInfo
    name?: string
    title?: string
    budgetMin?: number
    budgetMax?: number
    projectType?: Taxonomy
    investor?: string
    totalApartment?: number
    area?: number
    website?: number
    city?: GeographicaLocation
    Address?: GeographicaLocation
    locationImage?: FileInfo
    siteMapImage?: FileInfo
    projectBlocks?: Array<RoomType>
}

export class ProjectModel extends DbStateModel<Project> {
    static modelName = 'projects'
    static apiBase = `${API_PREFIX}/projects`
    static apiSet: APISet<Project> = {
        search: () => {
            const apiURL = new URL(`${ProjectModel.apiBase}`)
            return {
                url: apiURL.toString()
            }
        },
        get: ({ name }) => {
            const apiURL = new URL(`${ProjectModel.apiBase}/${name}`)
            return {
                url: apiURL.toString()
            }
        }
    }
}