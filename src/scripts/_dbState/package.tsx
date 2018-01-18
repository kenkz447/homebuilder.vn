import { BaseDbStateEntry, DbStateModel, APISet } from 'scripts/_core'
import { FileInfo } from './file-info'
import { API_PREFIX } from 'scripts/_dbState/base'
import { Taxonomy } from './taxonomy'
import { Product } from './product'
import { RoomLayout, RoomPerspective } from './room-layout'

export interface Package extends BaseDbStateEntry {
    area?: number
    name?: string
    title?: string
    avatar?: FileInfo
    houseTypeLabel?: string
    designThemeLabel?: string
    sortText?: string
    packageIncludedItems?: Array<Taxonomy>
    packageFurnitureIncludedItems?: Array<Taxonomy>
    products?: Array<{
        productId: number
        productViewModel: Product
        quantity: number
    }>
    layout: RoomLayout
    perspective: RoomPerspective
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
        get: ({ id, name }) => {
            const apiURL = new URL(`${PackageModel.apiBase}/${name}`)
            return {
                url: apiURL.toString()
            }
        }
    }
}