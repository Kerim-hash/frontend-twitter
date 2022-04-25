import { Action } from "redux";
import { ConversationType, LoadingState } from "./contracts/state";


export enum MessageActionType {
    FETCH_GET_CONVERSATION = "User/FETCH_GET_CONVERSATION",
    FETCH_GET_CONVERSATION_BY_ID = "User/FETCH_GET_CONVERSATION_BY_ID",
    FETCH_ADD_CONVERSATION = "User/FETCH_ADD_CONVERSATION",
    FETCH_DELETE_CONVERSATION = "User/FETCH_DELETE_CONVERSATION",
    SET_ADD_CONVERSATION = "User/SET_ADD_CONVERSATION",
    SET_CONVERSATION = "User/SET_CONVERSATION",
    SET_CONVERSATION_CURRENT = "User/SET_CONVERSATION_CURRENT",
    DELETE_CONVERSATION = "User/DELETE_CONVERSATION",
    FETCH_GET_MESSAGE = "User/FETCH_GET_MESSAGE",
    SET_MESSAGE = "User/SET_MESSAGE",
    SET_ADD_MESSAGE = "User/SET_ADD_MESSAGE",
    SEND_MESSAGE = "User/SEND_MESSAGE",
    SET_LOADING_STATE = "User/SET_LOADING_STATE", 
}
export interface SetMessageLoadinfStateActionInterface extends Action<MessageActionType> {
    type: MessageActionType.SET_LOADING_STATE,
    payload: LoadingState
}

export const setMessageLoadingState = (payload: LoadingState): SetMessageLoadinfStateActionInterface => ({
    type: MessageActionType.SET_LOADING_STATE,
    payload

})

// Get Conversation // --------------------------------// Get Conversation
export interface FetchConversationActionInterface extends Action<MessageActionType> {
    type: MessageActionType.FETCH_GET_CONVERSATION,
    payload: string
}

export const FetchConversation = (payload: string): FetchConversationActionInterface => ({
    type: MessageActionType.FETCH_GET_CONVERSATION,
    payload
})
// // Get Conversation By Id // --------------------------------// Get Conversation By Id
export interface FetchConversationByIdActionInterface extends Action<MessageActionType> {
    type: MessageActionType.FETCH_GET_CONVERSATION_BY_ID,
    payload: string
}

export const FetchConversationById = (payload: string): FetchConversationByIdActionInterface => ({
    type: MessageActionType.FETCH_GET_CONVERSATION_BY_ID,
    payload
})
//  Set Conversation Current // --------------------------------// Set Conversation Current
// TO-DO types
export interface SetConversationCurrentActionInterface extends Action<MessageActionType> {
    type: MessageActionType.SET_CONVERSATION_CURRENT,
    payload: ConversationType
}

export const setConversationCurrent = (payload: ConversationType): SetConversationCurrentActionInterface => ({
    type: MessageActionType.SET_CONVERSATION_CURRENT,
    payload
})
// ADD Conversation // --------------------------------// ADD Conversation
export interface FetchAddConversationActionInterface extends Action<MessageActionType> {
    type: MessageActionType.FETCH_ADD_CONVERSATION,
    payload: { receiverId: string, senderId: string }
}

export const FetchAddConversation = (payload: { receiverId: string, senderId: string }): FetchAddConversationActionInterface => ({
    type: MessageActionType.FETCH_ADD_CONVERSATION,
    payload
})
// DELETE Conversation // --------------------------------// DELETE Conversation
export interface FetchDeleteConversationActionInterface extends Action<MessageActionType> {
    type: MessageActionType.FETCH_DELETE_CONVERSATION,
    payload: { id: string}
}

export const FetchDeleteConversation = (payload: { id: string}): FetchDeleteConversationActionInterface => ({
    type: MessageActionType.FETCH_DELETE_CONVERSATION,
    payload
})
// SET Conversation // --------------------------------// SET Conversation
export interface setConversationActionInterface extends Action<MessageActionType> {
    type: MessageActionType.SET_CONVERSATION,
    payload: any
}

export const setConversation = (payload: any): setConversationActionInterface => ({
    type: MessageActionType.SET_CONVERSATION,
    payload
})
// SET ADD Conversation // --------------------------------// SET ADD Conversation
export interface setAddConversationActionInterface extends Action<MessageActionType> {
    type: MessageActionType.SET_ADD_CONVERSATION,
    payload: any
}

export const setAddConversation = (payload: any): setAddConversationActionInterface => ({
    type: MessageActionType.SET_ADD_CONVERSATION,
    payload
})
// // DELETE Conversation // --------------------------------// DELETE Conversation
export interface deleteConversationActionInterface extends Action<MessageActionType> {
    type: MessageActionType.DELETE_CONVERSATION,
    payload: any
}

export const deleteConversation = (payload: any): deleteConversationActionInterface => ({
    type: MessageActionType.DELETE_CONVERSATION,
    payload
})
// // Get Message // --------------------------------/// // Get Message
export interface FetchMessageActionInterface extends Action<MessageActionType> {
    type: MessageActionType.FETCH_GET_MESSAGE,
    payload?: string
}

export const FetchMessage = (payload?: string): FetchMessageActionInterface => ({
    type: MessageActionType.FETCH_GET_MESSAGE,
    payload
})

// // SET Conversation // --------------------------------// SET Conversation
export interface setMessageActionInterface extends Action<MessageActionType> {
    type: MessageActionType.SET_MESSAGE,
    payload: any
}

export const setMessage = (payload: any): setMessageActionInterface => ({
    type: MessageActionType.SET_MESSAGE,
    payload
})
// // // SET Conversation // --------------------------------// SET Conversation
export interface setAddMessageActionInterface extends Action<MessageActionType> {
    type: MessageActionType.SET_ADD_MESSAGE,
    payload: any
}

export const setAddMessage = (payload: any): setAddMessageActionInterface => ({
    type: MessageActionType.SET_ADD_MESSAGE,
    payload
})
// // SET Conversation // --------------------------------// SET Conversation
export interface sendMessageActionInterface extends Action<MessageActionType> {
    type: MessageActionType.SEND_MESSAGE,
    payload: any
}

export const sendMessage = (payload: any): sendMessageActionInterface => ({
    type: MessageActionType.SEND_MESSAGE,
    payload
})


export type MessageActions = FetchConversationActionInterface
    | setConversationActionInterface |
    setMessageActionInterface |
    FetchMessageActionInterface |
    FetchAddConversationActionInterface |
    SetMessageLoadinfStateActionInterface | 
    FetchDeleteConversationActionInterface  | 
    deleteConversationActionInterface | 
    setAddConversationActionInterface | 
    FetchConversationByIdActionInterface | 
    SetConversationCurrentActionInterface | 
    setAddMessageActionInterface | 
    sendMessageActionInterface
