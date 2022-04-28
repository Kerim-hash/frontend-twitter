
export enum LoadingState {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    LOADING = "LOADING",
    LOADED = "LOADED",
    NEVER = "NEVER"
}


export interface NotificationType{
    senderName: string, 
    type: number,
    avatar: string,
    tweetId: string

}

export interface Notification {
    NotificationData: NotificationType[],
}

