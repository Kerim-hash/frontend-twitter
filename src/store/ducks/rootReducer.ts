import {combineReducers} from 'redux'
import { userReducer } from './user/reducer'
import { ThemeReducer } from './theme/reducer'
import { tweetsReducer } from './tweets/reducer'
import { MessageReducer } from './Messages/reducer'

export const rootReducer = combineReducers({
    tweets: tweetsReducer,
    theme: ThemeReducer,
    user: userReducer,
    message: MessageReducer
})