import { Action } from "redux";
import { AddFormState, LoadingState, Tweet, TweetsState, } from "./contracts/state";

export enum TweetsActionType {
    SET_TWEETS = "tweets/SET_TWEETS",
    FETCH_TWEETS = "tweets/FETCH_TWEETS",
    SET_LOADING_STATE = "tweets/SET_LOADING_STATE",
    FETCH_ADD_TWEET = "tweets/FETCH_ADD_TWEET",
    ADD_TWEET = "tweets/ADD_TWEET",
    SET_ADD_FORM_STATE = "tweets/SET_ADD_FORM_STATE",
    SET_LIKE_STATE = "tweets/SET_LIKE_STATE",
    DELETE_TWEET = "tweet/DELETE_TWEET",
    FETCH_DELETE_TWEET = "tweet/FETCH_DELETE_TWEET",
    FETCH_LIKE_TOGGLE = "tweet/FETCH_LIKE_TOGGLE",
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

export interface SetLikeStateActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_LIKE_STATE,
    payload: any
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
    payload?: {id: string, userID: string}
}



export const setTweets = (payload: TweetsState['items']): SetTweetsActionInterface => ({
    type: TweetsActionType.SET_TWEETS,
    payload

})

export const fetchAddTweet = (payload: { text: string, images: string[] }): fetchAddTweetActionInterface => ({
    type: TweetsActionType.FETCH_ADD_TWEET,
    payload
})

export const AddTweet = (payload: Tweet): AddTweetActionInterface => ({
    type: TweetsActionType.ADD_TWEET,
    payload
})


export const setTweetLoadingState = (payload: LoadingState): SetTweetsLoadinfStateActionInterface => ({
    type: TweetsActionType.SET_LOADING_STATE,
    payload

})
export const setAddFormLoadingState = (payload: AddFormState): SetAddFormLoadinfStateActionInterface => ({
    type: TweetsActionType.SET_ADD_FORM_STATE,
    payload

})

export const setLikeState = (payload: any): SetLikeStateActionInterface => ({
    type: TweetsActionType.SET_LIKE_STATE,
    payload
})

export const fetchTweets = (payload?: string): FetchactionInterface => ({
    type: TweetsActionType.FETCH_TWEETS,
    payload
})

export const deleteTweet = (payload: string): DeleteTweerInterface => ({
    type: TweetsActionType.DELETE_TWEET,
    payload
})
export const fetchDeleteTweet = (payload: string): FetchDeleteTweerInterface => ({
    type: TweetsActionType.FETCH_DELETE_TWEET,
    payload
})

export const fetchLikeToggleTweet = (payload: {id: string, userID: string}): FetchLikeTweetsactionInterface => ({
    type: TweetsActionType.FETCH_LIKE_TOGGLE,
    payload
})


export type TweetsActions = DeleteTweerInterface |
    SetTweetsActionInterface |
    SetTweetsLoadinfStateActionInterface |
    FetchactionInterface |
    fetchAddTweetActionInterface |
    AddTweetActionInterface |
    SetAddFormLoadinfStateActionInterface |
    FetchLikeTweetsactionInterface | 
    SetLikeStateActionInterface