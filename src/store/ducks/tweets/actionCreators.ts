import { AddTweetActionInterface, DeleteTweetInterface, FetchAddCommentTweetsActionInterface, fetchAddTweetActionInterface, fetchBookmarksActionInterface, FetchDeleteTweetInterface, FetchLikeTweetsActionInterface, FetchTweetActionInterface, FetchTweetsActionInterface, SetAddFormCommentTweetsActionInterface, SetAddFormLoadingStateActionInterface, SetBookmarksActionInterface,  SetCommentTweetsActionInterface,  SetTweetActionInterface, SetTweetsActionInterface, SetTweetsLoadingStateActionInterface, TweetsActionType } from "./contracts/actionTypes";
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

export const setTweetLoadingState = (payload: LoadingState): SetTweetsLoadingStateActionInterface => ({
    type: TweetsActionType.SET_LOADING_STATE,
    payload

})

export const setAddFormLoadingState = (payload: AddFormState): SetAddFormLoadingStateActionInterface => ({
    type: TweetsActionType.SET_ADD_FORM_STATE,
    payload
})

export const fetchTweets = (payload?: string): FetchTweetsActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS,
    payload
})

export const deleteTweet = (payload: string): DeleteTweetInterface => ({
    type: TweetsActionType.DELETE_TWEET,
    payload
})

export const fetchDeleteTweet = (payload: string): FetchDeleteTweetInterface => ({
    type: TweetsActionType.FETCH_DELETE_TWEET,
    payload
})

export const fetchLikeToggleTweet = (payload: { id: string, userID: string, liked: boolean }): FetchLikeTweetsActionInterface => ({
    type: TweetsActionType.FETCH_LIKE_TOGGLE,
    payload
})

export const fetchAddCommentTweet = (payload: { text: string, userID: string, images?: string[], tweetID: string, author: { username: string, fullname: string, avatar: string} }): FetchAddCommentTweetsActionInterface => ({
    type: TweetsActionType.FETCH_ADD_COMMENT_STATE,
    payload
})

export const setAddFormCommentTweet = (payload: AddCommentState): SetAddFormCommentTweetsActionInterface => ({
    type: TweetsActionType.SET_ADD_COMMENT_FORM_STATE,
    payload
})

export const setCommentTweet = (payload): SetCommentTweetsActionInterface => ({
    type: TweetsActionType.SET_COMMENT_TWEET,
    payload
})

export const setTweet = (payload: TweetsState['data']): SetTweetActionInterface => ({
    type: TweetsActionType.SET_TWEET,
    payload
})

export const fetchTweet = (payload: string): FetchTweetActionInterface => ({
    type: TweetsActionType.FETCH_TWEET,
    payload
})

export const fetchBookmarks = (payload: { userID: string, tweetID: string }): fetchBookmarksActionInterface => ({
    type: TweetsActionType.FETCH_BOOKMARKS,
    payload
})
export const setBookmarksState = (payload:  BookmarksState ): SetBookmarksActionInterface => ({
    type: TweetsActionType.SET_BOOKMARKS_STATE,
    payload
})

export type TweetsActions = DeleteTweetInterface |
    SetTweetsActionInterface |
    SetTweetsLoadingStateActionInterface |
    fetchAddTweetActionInterface |
    AddTweetActionInterface |
    SetAddFormLoadingStateActionInterface |
    FetchLikeTweetsActionInterface |
    SetAddFormCommentTweetsActionInterface |
    SetAddFormCommentTweetsActionInterface |
    SetCommentTweetsActionInterface |
    SetTweetActionInterface |
     SetTweetsLoadingStateActionInterface |
     FetchTweetsActionInterface |
     FetchTweetActionInterface