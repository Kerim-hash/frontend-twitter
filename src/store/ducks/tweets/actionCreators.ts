import { Action } from "redux";
import { AddTweetActionInterface, DeleteTweerInterface, FetchactionInterface, FetchAddCommentTweetsactionInterface, fetchAddTweetActionInterface, fetchBookmarksactionInterface, FetchctionInterface, FetchDeleteTweerInterface, FetchLikeTweetsactionInterface, SetAddFormCommentTweetsactionInterface, SetAddFormLoadinfStateActionInterface, SetBookmarksactionInterface, SetCommentTweetsactionInterface, SetTweetActionInterface, SetTweetLoadinfStateActionInterface, SetTweetsActionInterface, SetTweetsLoadinfStateActionInterface, TweetsActionType } from "./contracts/actionTypes";
import { AddCommentState, AddFormState, BookmarksState, LoadingState, Tweet, TweetsState } from "./contracts/state";

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

export const fetchLikeToggleTweet = (payload: { id: string, userID: string, liked: boolean }): FetchLikeTweetsactionInterface => ({
    type: TweetsActionType.FETCH_LIKE_TOGGLE,
    payload
})

export const fetchAddCommnetTweet = (payload: { text: string, userID: string, images?: string[], tweetID: string, author: { username: string, fullname: string, avatar: string} }): FetchAddCommentTweetsactionInterface => ({
    type: TweetsActionType.FETCH_ADD_COMMENT_STATE,
    payload
})

export const setAddFormCommnetTweet = (payload: AddCommentState): SetAddFormCommentTweetsactionInterface => ({
    type: TweetsActionType.SET_ADD_COMMENT_FORM_STATE,
    payload
})

export const setCommnetTweet = (payload): SetCommentTweetsactionInterface => ({
    type: TweetsActionType.SET_COMMENT_TWEET,
    payload
})

export const setTweet = (payload: TweetsState['data']): SetTweetActionInterface => ({
    type: TweetsActionType.SET_TWEET,
    payload
})

export const fetchTweet = (payload: string): FetchctionInterface => ({
    type: TweetsActionType.FETCH_TWEET,
    payload
})

export const fetchBookmarks = (payload: { userID: string, tweetID: string }): fetchBookmarksactionInterface => ({
    type: TweetsActionType.FETCH_BOOKMARKS,
    payload
})
export const setBookmarksState = (payload:  BookmarksState ): SetBookmarksactionInterface => ({
    type: TweetsActionType.SET_BOOKMARKS_STATE,
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
    FetchAddCommentTweetsactionInterface |
    SetAddFormCommentTweetsactionInterface |
    SetCommentTweetsactionInterface |
    SetTweetActionInterface | SetTweetLoadinfStateActionInterface |
    FetchctionInterface |
    fetchBookmarksactionInterface |
    SetBookmarksactionInterface