import {istance} from '../../core/axios'

export const ConversationApi = {
    fetchConvertsation(payload): Promise<Response>{
        return istance.get(`/conversation/${payload}` ).then(({data}) => data.data)
    },
    fetchAddConvertsation(payload): Promise<Response>{
        return istance.post(`/conversation/`, payload).then(({data}) => data.data)
    }
}