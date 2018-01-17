import { BaseDbStateEntry } from 'scripts/_core'
import { RoomLayout } from './room-layout'

export interface RoomType extends BaseDbStateEntry {
    label?: string
    children?: Array<RoomLayout>
}