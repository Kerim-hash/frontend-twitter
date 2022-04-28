import {combineReducers} from 'redux'
import { userReducer } from './user/reducer'
import { ThemeReducer } from './theme/reducer'
import { tweetsReducer } from './tweets/reducer'
import { MessageReducer } from './Messages/reducer'
import { NotificationReducer } from './Notification/reducer'

export const rootReducer = combineReducers({
    tweets: tweetsReducer,
    theme: ThemeReducer,
    user: userReducer,
    message: MessageReducer,
    notification: NotificationReducer
})