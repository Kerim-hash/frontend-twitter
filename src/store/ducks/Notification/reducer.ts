import produce, { Draft } from 'immer'
import {Notification} from './contracts/state'
import {NotificationActions, NotificationActionType} from './actions'
export const initialstate: Notification = {
    NotificationData: []
}

export const NotificationReducer = produce((draft: Draft<Notification>, action: NotificationActions) => {
    switch (action.type) {
        case NotificationActionType.SET_NOTIFICATION:
            draft.NotificationData = [...draft.NotificationData, action.payload]
            break
        case NotificationActionType.RESET_NOTIFICATION:
            draft.NotificationData.length = 0
            break
        
    }
}, initialstate)
