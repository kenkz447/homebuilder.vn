export interface Token {
    exp: number
    sub: string
    auth: Array<string>
}

export type Permission = 'deny' | 'readonly' | 'full-control'