import { Action } from "redux";
import { Tweet } from "../../tweets/contracts/state";
import {LoadingState} from './state'

export enum TweetActionType  {
    SET_TWEET = "tweet/SET_TWEET",
    FETCH_TWEET = "tweet/FETCH_TWEET",
    SET_LOADING_STATE = "tweet/SET_LOADING_STATE",
   
}

export interface SetTweetActionInterface extends Action<TweetActionType>{
    type: TweetActionType.SET_TWEET,
    payload?: Tweet
}  

export interface SetTweetLoadinfStateActionInterface extends Action<TweetActionType>{
    type: TweetActionType.SET_LOADING_STATE,
    payload: LoadingState
}  

export interface FetchctionInterface extends Action<TweetActionType>{
    type: TweetActionType.FETCH_TWEET,
    payload: string
}  

