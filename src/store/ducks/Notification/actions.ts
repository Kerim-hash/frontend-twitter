import { Action } from "redux";
import { NotificationType } from "./contracts/state";



export enum NotificationActionType {
    SET_NOTIFICATION = "Notification/SET_NOTIFICATION",
    RESET_NOTIFICATION = "Notification/RESET_NOTIFICATION",
  
}
// TO-DO
export interface SetNotificationStateActionInterface extends Action<NotificationActionType> {
    type: NotificationActionType.SET_NOTIFICATION,
    payload: NotificationType
}

export const setNotification = (payload: NotificationType): SetNotificationStateActionInterface => ({
    type: NotificationActionType.SET_NOTIFICATION,
    payload
})

export interface ResetNotificationStateActionInterface extends Action<NotificationActionType> {
    type: NotificationActionType.RESET_NOTIFICATION,
}

export const ResetNotification = (): ResetNotificationStateActionInterface => ({
    type: NotificationActionType.RESET_NOTIFICATION,
})

export type NotificationActions = SetNotificationStateActionInterface | ResetNotificationStateActionInterface
