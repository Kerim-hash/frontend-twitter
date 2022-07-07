import {instance} from '../../core/axios'

export const ConversationApi = {
    async fetchConversation(payload: any): Promise<Response>{
        const { data } = await instance.get(`/conversation/${payload}`)
        return data.data
    },
    async fetchConversationById(payload: any): Promise<Response>{
        const { data } = await instance.get(`/conversation/detail/${payload}`)
        return data.data
    },
    async fetchAddConversation(payload: any): Promise<Response>{
        const { data } = await instance.post(`/conversation/`, payload)
        return data.data
    },
    async fetchdeleteConversation(payload: { id: string }): Promise<Response>{
        const { data } = await instance.delete(`/conversation/${payload.id}`)
        return data.data
    }
}