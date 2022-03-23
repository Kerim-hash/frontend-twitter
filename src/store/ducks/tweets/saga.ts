import {  call, put, takeLatest } from 'redux-saga/effects'
import { TweetsActionType, setTweetLoadingState, setTweets, AddTweet, fetchAddTweetActionInterface, setAddFormLoadingState, FetchactionInterface, FetchDeleteTweerInterface, deleteTweet, FetchLikeTweetsactionInterface } from './actionCreators'
import { TweetsApi } from '../../../services/api/tweetApi'
import { AddFormState, LoadingState, Tweet, TweetsState } from './contracts/state'

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
    // yield put(setAddFormLoadingState(AddFormState.LOADING))
    const item: Tweet = yield call(TweetsApi.AddTweet, payload)
    yield put(AddTweet(item))
    yield put(setAddFormLoadingState(AddFormState.NEVER))
  }catch(e){
    yield put(setAddFormLoadingState(AddFormState.ERROR))
  }
}

export function* DeleteTweetRequest({payload: TweetId}: FetchDeleteTweerInterface ) {
  try{
    yield call(TweetsApi.deleteTweet, TweetId)
    yield put(deleteTweet(TweetId))
    yield put(setAddFormLoadingState(AddFormState.SUCCESS))
  }catch(e){
    yield put(setAddFormLoadingState(AddFormState.ERROR))
  }
}

export function* LikeToggleRequest({payload: TweetId}: FetchLikeTweetsactionInterface ) {
  try{
    const data = yield call(TweetsApi.likeToggleTweet, TweetId)
    alert('ura')
    // yield put(deleteTweet(TweetId))
    // yield put(setAddFormLoadingState(AddFormState.SUCCESS))
  }catch(e){
    alert('ne ura')
    // yield put(setAddFormLoadingState(AddFormState.ERROR))
  }
}

export function* tweetsSaga() {
  yield takeLatest(TweetsActionType.FETCH_TWEETS , TweetsRequest);
  yield takeLatest(TweetsActionType.FETCH_ADD_TWEET , FetchAddTweetRequest)
  yield takeLatest(TweetsActionType.FETCH_DELETE_TWEET , DeleteTweetRequest)
  yield takeLatest(TweetsActionType.FETCH_LIKE_TOGGLE , LikeToggleRequest)
}  