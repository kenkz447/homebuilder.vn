
interface MapMarker {
    Long?: string
    Lat?: string
    Zoom?: number
}

export interface GeographicaLocation {
    id?: number
    name?: string
    label?: string
    marker?: MapMarker
}