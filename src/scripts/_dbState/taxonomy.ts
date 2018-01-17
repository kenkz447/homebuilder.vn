export interface Taxonomy {
    id: number
    name?: string
    label: string
    icon: string
    taxonomyTypeId: number
    parentId?: number
    children?: Array<Taxonomy>
}