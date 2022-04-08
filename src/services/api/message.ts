import {istance} from '../../core/axios'

export const MessageApi = {
    fetchMessage(payload): Promise<Response>{
        return istance.get(`/message/${payload}` ).then(({data}) => data.data)
    },
    sendMessage(payload): Promise<Response>{
        return istance.post(`/message/`, payload ).then(({data}) => data.data)
    }
}