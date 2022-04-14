import {  call, put, takeLatest } from 'redux-saga/effects'
import { setTweetLoadingState, setTweets, AddTweet, setAddFormLoadingState, deleteTweet, setAddFormCommnetTweet, setCommnetTweet, setTweet, setBookmarksState } from './actionCreators'
import { TweetsApi } from '../../../services/api/tweetApi'
import { AddCommentState, AddFormState, BookmarksState, LoadingState, Tweet, TweetsState } from './contracts/state'
import { FetchactionInterface, FetchAddCommentTweetsactionInterface, fetchAddTweetActionInterface, fetchBookmarksactionInterface, FetchctionInterface, FetchDeleteTweerInterface, FetchLikeTweetsactionInterface, TweetsActionType } from './contracts/actionTypes'

export function* TweetsRequest({payload}: FetchactionInterface) {
  try{
    const items: TweetsState['items'] = yield call(TweetsApi.fetchTweets, payload)
    yield put(setTweets(items))
  }catch(e){
    yield put(setTweetLoadingState(LoadingState.ERROR))
  }
}

export function* FetchAddTweetRequest({payload}: fetchAddTweetActionInterface) {
  try{
    const item: Tweet = yield call(TweetsApi.AddTweet, payload)
    yield put(AddTweet(item))
    yield put(setAddFormLoadingState(AddFormState.ADDED))
    yield put(setAddFormLoadingState(AddFormState.NEVER))
  }catch(e){
    yield put(setAddFormLoadingState(AddFormState.ERROR))
  }
}

export function* DeleteTweetRequest({payload: TweetId}: FetchDeleteTweerInterface ) {
  try{
    yield call(TweetsApi.deleteTweet, TweetId)
    yield put(deleteTweet(TweetId))
    yield put(setAddFormLoadingState(AddFormState.DELETED))
  }catch(e){
    yield put(setAddFormLoadingState(AddFormState.ERROR))
  }
}

export function* FetchAddCommentTweet({payload}: FetchAddCommentTweetsactionInterface ) {
  try{
    yield put(setAddFormCommnetTweet(AddCommentState.LOADING))
    const data = yield call(TweetsApi.AddCommnet, payload)
    yield put(setCommnetTweet(data))
  }catch(e){
    yield put(setAddFormCommnetTweet(AddCommentState.ERROR))
  }
}

export function* LikeToggleRequest({payload}: FetchLikeTweetsactionInterface ) {
     yield call(TweetsApi.likeToggleTweet, payload)
}

export function* TweetRequest({payload: TweetId}: FetchctionInterface ) {
  try{
    const data: Tweet = yield call(TweetsApi.fetchTweet, TweetId)
    yield put(setTweet(data))
    yield put(setTweetLoadingState(LoadingState.LOADED))
  }catch(e){
    yield put(setTweetLoadingState(LoadingState.ERROR))
  }
}

export function* TweetBookmarksRequest({payload}: fetchBookmarksactionInterface ) {
  try{
    const data = yield call(TweetsApi.bookmarksToggleTweet, payload)
    yield put(setBookmarksState(BookmarksState.BOOKMARKSED))
  }catch(e){
    yield put(setBookmarksState(BookmarksState.NEVER))
  }
}

export function* tweetsSaga() {
  yield takeLatest(TweetsActionType.FETCH_TWEETS , TweetsRequest);
  yield takeLatest(TweetsActionType.FETCH_ADD_TWEET , FetchAddTweetRequest)
  yield takeLatest(TweetsActionType.FETCH_DELETE_TWEET , DeleteTweetRequest)
  yield takeLatest(TweetsActionType.FETCH_LIKE_TOGGLE , LikeToggleRequest)
  yield takeLatest(TweetsActionType.FETCH_ADD_COMMENT_STATE , FetchAddCommentTweet)
  yield takeLatest(TweetsActionType.FETCH_TWEET , TweetRequest)
  yield takeLatest(TweetsActionType.FETCH_BOOKMARKS , TweetBookmarksRequest)
}  