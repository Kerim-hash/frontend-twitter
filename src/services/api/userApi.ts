import {istance} from '../../core/axios'
import { LoginFormProps } from '../../components/auth/Signin'
import {RegisterFormProps} from '../../components/auth/SignUp'
import { UserType } from '../../store/ducks/user/contracts/state'

export interface UserResponse {
    status: string;
    data?: UserType
}


export const UserApi = {
    async fetchLogin(payload: LoginFormProps): Promise<UserResponse> {
        const { data } = await istance.post('/auth/login', payload)
        return data
    },
    async fetchRegister(payload: RegisterFormProps): Promise<UserResponse> {
        const { data } = await istance.post('/auth/register', payload)
        return data
    },
    async fetchGetMe(): Promise<Response> {
        const { data } = await istance.get('/users/me')
        return data.data
    },
    async fetchProfile(id: string): Promise<Response> {
        const { data } = await istance.get(`/users/${id}`)
        return data.data
    }
}