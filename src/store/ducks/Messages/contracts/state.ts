
export enum LoadingState {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    LOADING = "LOADING",
    LOADED = "LOADED",
    NEVER = "NEVER"
}

export interface ConversationType{
    _id: string,
    members: string[],
    createdAt: string,
    updatedAt: string,
}
export interface MessageType{
    _id: string,
    conversationId: string,
    sender: string,
    text: string,
    createdAt: string,
    updatedAt: string,
}

export interface Message {
    loadingState: LoadingState,
    conversation: ConversationType[],
    messages: MessageType[]
}

