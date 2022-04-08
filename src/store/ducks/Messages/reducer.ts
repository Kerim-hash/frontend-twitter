import produce, { Draft } from 'immer'
import { MessageActions, MessageActionType } from './actions'
import { LoadingState, Message } from './contracts/state'

export const initialstate: Message = {
    loadingState: LoadingState.NEVER,
    conversation: undefined,
    messages: []
}

export const MessageReducer = produce((draft: Draft<Message>, action: MessageActions) => {
    switch (action.type) {
        case MessageActionType.SET_CONVERSATION:
            draft.conversation = action.payload;
            break
        case MessageActionType.SET_MESSAGE:
            draft.messages = action.payload;
            break
        case MessageActionType.SET_ADD_CONVERSATION:
            draft.conversation = action.payload;
            break
    }
}, initialstate)
