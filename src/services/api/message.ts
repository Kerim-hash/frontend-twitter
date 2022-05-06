import {instance} from '../../core/axios'

export const MessageApi = {
    async fetchMessage(payload): Promise<Response>{
        const { data } = await instance.get(`/message/${payload}`)
        return data.data
    },
    async sendMessage(payload): Promise<Response>{
        const { data } = await instance.post(`/message/`, payload)
        return data.data
    }
}