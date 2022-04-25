import produce, { Draft } from 'immer'
import { MessageActions, MessageActionType } from './actions'
import { LoadingState, Message } from './contracts/state'

export const initialstate: Message = {
    loadingState: LoadingState.NEVER,
    conversation: [],
    messages: [],
    currentConversation: undefined
}

export const MessageReducer = produce((draft: Draft<Message>, action: MessageActions) => {
    switch (action.type) {
        case MessageActionType.SET_ADD_CONVERSATION:
            draft.conversation = [...draft.conversation, ...action.payload]
            break
        case MessageActionType.SET_CONVERSATION:
            draft.conversation = [...action.payload]
            break
        case MessageActionType.SET_MESSAGE:
            draft.messages = action.payload;
            break
        case MessageActionType.FETCH_DELETE_CONVERSATION:
            draft.conversation = draft.conversation.filter(item => item._id !== action.payload.id)
            draft.currentConversation = undefined
            break
        case MessageActionType.SET_CONVERSATION_CURRENT:
            draft.currentConversation = action.payload
            break
        case MessageActionType.SET_ADD_MESSAGE:
            draft.messages = [...draft.messages, action.payload]
            break
    }
}, initialstate)
