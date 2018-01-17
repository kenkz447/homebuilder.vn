import { BaseDbStateEntry, DbStateModel, APISet } from 'scripts/_core'
import { FileInfo } from './file-info'
import { API_PREFIX } from 'scripts/_dbState/base'

export interface Product extends BaseDbStateEntry {
    title?: string
    avatar?: FileInfo
}

export class ProductModel extends DbStateModel<Product> {
    static modelName = 'products'
    static apiBase = `${API_PREFIX}/products`
    static apiSet: APISet<Product> = {
        search: ({ name }) => {
            const apiURL = new URL(`${ProductModel.apiBase}/packages/${name}`)
            return {
                url: apiURL.toString()
            }
        },
        get: (value) => {
            const apiURL = new URL(`${ProductModel.apiBase}/${value.id}`)
            return {
                url: apiURL.toString()
            }
        }
    }
}