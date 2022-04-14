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
    async fetchUsers(): Promise<Response> {
        const { data } = await istance.get(`/users/`)
        return data.data
    },
    async fetchProfile(id: string): Promise<Response> {
        const { data } = await istance.get(`/users/${id}`)
        return data.data
    },
    async fetchFollow(payload): Promise<Response> {
        const { data } = await istance.put(`/users/follow/${payload.id}`, {userID: payload.userID})
        return data
    },
    async fetchSearchUser(payload): Promise<Response> {
        const { data } = await istance.get(`/users/search/${payload}`)
        return data.data
    },
    async fetchUserUpdate(payload): Promise<Response> {
        const { data } = await istance.put(`/users/update`, payload)
        return data.data
    },
   
}