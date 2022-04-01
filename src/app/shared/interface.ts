export interface IAdmin {
    email: string
    password: string
    returnSecureToken: boolean
}

export interface IFbAuth {
    idToken: string
    expiresIn: string
}

export interface IPost {
    id?: string
    title: string
    author: string
    text: string
    date: Date
}

export interface fbResponse {
    name: string
}