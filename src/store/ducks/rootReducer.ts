import {combineReducers} from 'redux'
import { userReducer } from './user/reducer'
import { tagsReducer } from './tags/reducer'
import { tweetsReducer } from './tweets/reducer'

export const rootReducer = combineReducers({
    tweets: tweetsReducer,
    tags: tagsReducer,
    user: userReducer,
})