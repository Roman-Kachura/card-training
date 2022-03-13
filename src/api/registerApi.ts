import {instance} from "./authAPI";

export const registerApi = {
    register(data: RegisterRequestType) {
        return instance.post('auth/register', data)
    }
}

export type RegisterRequestType = {
    email: string
    password: string
}