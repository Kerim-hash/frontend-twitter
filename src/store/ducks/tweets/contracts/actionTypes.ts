import { Action } from "redux";
import { BookmarksState, Tweet } from "../../tweets/contracts/state";
import {LoadingState, AddCommentState, AddFormState, TweetsState,} from './state'

export enum TweetsActionType  {
    SET_TWEET = "tweet/SET_TWEET",
    FETCH_TWEET = "tweet/FETCH_TWEET",
    SET_LOADING_STATE = "tweet/SET_LOADING_STATE", 
    SET_TWEETS = "tweets/SET_TWEETS",
    FETCH_TWEETS = "tweets/FETCH_TWEETS",
    FETCH_ADD_TWEET = "tweets/FETCH_ADD_TWEET",
    ADD_TWEET = "tweets/ADD_TWEET",
    SET_ADD_FORM_STATE = "tweets/SET_ADD_FORM_STATE",
    SET_LIKE_STATE = "tweets/SET_LIKE_STATE",
    DELETE_TWEET = "tweet/DELETE_TWEET",
    FETCH_DELETE_TWEET = "tweet/FETCH_DELETE_TWEET",
    FETCH_LIKE_TOGGLE = "tweet/FETCH_LIKE_TOGGLE",
    FETCH_ADD_COMMENT_STATE = "tweet/FETCH_ADD_COMMENT_STATE",
    SET_ADD_COMMENT_FORM_STATE = "tweet/SET_ADD_COMMENT_FORM_STATE",
    SET_COMMENT_TWEET = "tweet/SET_COMMENT_TWEET",
    FETCH_BOOKMARKS = "tweet/FETCH_BOOKMARKS",
    SET_BOOKMARKS_STATE = "tweet/SET_BOOKMARKS_STATE",
}

export interface SetTweetActionInterface extends Action<TweetsActionType>{
    type: TweetsActionType.SET_TWEET,
    payload?: Tweet
}  

export interface SetTweetLoadinfStateActionInterface extends Action<TweetsActionType>{
    type: TweetsActionType.SET_LOADING_STATE,
    payload: LoadingState
}  

export interface FetchctionInterface extends Action<TweetsActionType>{
    type: TweetsActionType.FETCH_TWEET,
    payload: string
}  

export interface SetTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_TWEETS,
    payload: TweetsState["items"]
}

export interface fetchAddTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_ADD_TWEET,
    payload: { text: string, images: string[] }
}

export interface AddTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.ADD_TWEET,
    payload: Tweet
}

export interface SetTweetsLoadinfStateActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_LOADING_STATE,
    payload: LoadingState
}

export interface SetAddFormLoadinfStateActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_ADD_FORM_STATE,
    payload: AddFormState
}



export interface DeleteTweerInterface extends Action<TweetsActionType> {
    type: TweetsActionType.DELETE_TWEET,
    payload: string
}

export interface FetchDeleteTweerInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_DELETE_TWEET,
    payload: string
}


export interface FetchactionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS,
    payload?: string
}

export interface FetchLikeTweetsactionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_LIKE_TOGGLE,
    payload?: {id: string, userID: string, liked: boolean}
}

export interface FetchAddCommentTweetsactionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_ADD_COMMENT_STATE,
    payload?: {text: string, userID: string, images?: string[],tweetID: string, author: {username: string, fullname: string} }
}

export interface SetAddFormCommentTweetsactionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_ADD_COMMENT_FORM_STATE,
    payload: AddCommentState
}

export interface SetCommentTweetsactionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_COMMENT_TWEET,
    payload: any
}

export interface fetchBookmarksactionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_BOOKMARKS,
    payload: {userID: string, tweetID: string}
}
export interface SetBookmarksactionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_BOOKMARKS_STATE,
    payload: BookmarksState
}
