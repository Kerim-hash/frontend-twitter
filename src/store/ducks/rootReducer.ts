import {combineReducers} from 'redux'
import { userReducer } from './user/reducer'
import { ThemeReducer } from './theme/reducer'
import { tweetsReducer } from './tweets/reducer'

export const rootReducer = combineReducers({
    tweets: tweetsReducer,
    theme: ThemeReducer,
    user: userReducer,
})