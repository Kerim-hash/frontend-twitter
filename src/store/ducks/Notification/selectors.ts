import { RootState } from "../../store";
import { Notification } from "./contracts/state";


export const selectNotification = (state: RootState): Notification  => state.notification



export const selectNotifications = (state: RootState) => selectNotification(state).NotificationData