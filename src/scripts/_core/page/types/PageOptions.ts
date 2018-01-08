interface PageOnloadEvent {
    dispatch: (action) => void
}

export interface PageOption {
    name: string
    pageTitle?: string
    layoutType?: any
    onload?: (e: PageOnloadEvent) => void
}