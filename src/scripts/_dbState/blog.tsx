import { BaseDbStateEntry, DbStateModel, APISet } from 'scripts/_core'
import { FileInfo } from './file-info'
import { API_PREFIX } from 'scripts/_dbState/base'

export interface Blog extends BaseDbStateEntry {
    name?: string
    title?: string
    avatar?: FileInfo
    description?: string
    content?: string
    publicDate?: string
}

export class BlogModel extends DbStateModel<Blog> {
    static modelName = 'blog'
    static apiBase = `${API_PREFIX}/blogs`
    static apiSet: APISet<Blog> = {
        search: () => {
            const apiURL = new URL(`${BlogModel.apiBase}`)
            return {
                url: apiURL.toString()
            }
        },
        get: ({ id, name}) => {
            const apiURL = new URL(`${BlogModel.apiBase}/${name}`)
            return {
                url: apiURL.toString()
            }
        },
        getPrevBlog: ({ id }) => {
            const apiURL = new URL(`${BlogModel.apiBase}/prev/${id}`)
            return {
                url: apiURL.toString()
            }
        },
        getNextBlog: ({ id }) => {
            const apiURL = new URL(`${BlogModel.apiBase}/next/${id}`)
            return {
                url: apiURL.toString()
            }
        }
    }
}