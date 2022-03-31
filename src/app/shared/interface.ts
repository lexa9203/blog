export interface IAdmin {
    email: string
    password: string
    returnSecureToken: boolean
}

export interface IEnvironment {
    production: boolean
    apiKey: string
}

export interface IFbAuth {
    idToken: string
    expiresIn: string
}