import {combineReducers} from 'redux'
import { userReducer } from './user/reducer'
import { tagsReducer } from './tags/reducer'
import { tweetReducer } from './tweet/reducer'
import { tweetsReducer } from './tweets/reducer'


export const rootReducer = combineReducers({
    tweets: tweetsReducer,
    tweet: tweetReducer,
    tags: tagsReducer,
    user: userReducer
})