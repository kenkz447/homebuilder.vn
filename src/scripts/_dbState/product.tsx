import { BaseDbStateEntry, DbStateModel, APISet } from 'scripts/_core'
import { FileInfo } from './file-info'
import { API_PREFIX } from './base'
import { Taxonomy } from './taxonomy'

export interface Product extends BaseDbStateEntry {
    name?: string
    title?: string
    avatar?: FileInfo
    brand?: Taxonomy
    type?: Taxonomy
    description?: string
    dimension?: string
    code?: string
    pictures?: Array<FileInfo>
}

export class ProductModel extends DbStateModel<Product> {
    static modelName = 'products'
    static apiBase = `${API_PREFIX}/products`
    static apiSet: APISet<Product> = {
        search: ({ packageName }) => {
            const apiURL = new URL(`${ProductModel.apiBase}/packages/${packageName}`)
            return {
                url: apiURL.toString()
            }
        },
        get: ({name}) => {
            const apiURL = new URL(`${ProductModel.apiBase}/${name}`)
            return {
                url: apiURL.toString()
            }
        }
    }
}