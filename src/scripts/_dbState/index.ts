export * from './base'
import { Project, ProjectModel } from './project'
import { RoomLayout, RoomLayoutModel } from './room-layout'
import { Package, PackageModel } from './package'
import { Product, ProductModel } from './product'

export {
    Project, ProjectModel,
    RoomLayout, RoomLayoutModel,
    Package, PackageModel,
    Product, ProductModel
}

export const models = [
    ProjectModel,
    RoomLayoutModel,
    PackageModel,
    ProductModel
]