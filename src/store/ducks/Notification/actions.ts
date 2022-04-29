import { Action } from "redux";
import { NotificationType } from "./contracts/state";



export enum NotificationActionType {
    SET_NOTIFICATION = "Notification/SET_NOTIFICATION",
    RESET_NOTIFICATION = "Notification/RESET_NOTIFICATION",
    DELETE_NOTIFICATION_BY_TYPE = "Notification/DELETE_NOTIFICATION_BY_TYPE",
  
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
export interface DeleteNotificationByTypeStateActionInterface extends Action<NotificationActionType> {
    type: NotificationActionType.DELETE_NOTIFICATION_BY_TYPE,
    payload: number
}

export const deleteNotificationByType = (payload: number): DeleteNotificationByTypeStateActionInterface => ({
    type: NotificationActionType.DELETE_NOTIFICATION_BY_TYPE,
    payload
})

export type NotificationActions = SetNotificationStateActionInterface | ResetNotificationStateActionInterface | DeleteNotificationByTypeStateActionInterface
