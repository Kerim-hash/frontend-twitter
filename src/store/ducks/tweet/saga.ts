import {  call, put, takeLatest } from 'redux-saga/effects'
import { setTweetLoadingState, setTweet } from './actionCreators'
import { TweetsApi } from '../../../services/api/tweetApi'
import { LoadingState, TweetState } from './contracts/state'
import { TweetActionType } from './contracts/actionTypes'
import { Tweet } from '../tweets/contracts/state'
import { FetchctionInterface } from '../tweet/contracts/actionTypes'


export function* TweetRequest({payload: TweetId}: FetchctionInterface ) {
  try{
    // yield put(setTweetLoadingState(LoadingState.ERROR))
    const data: Tweet = yield call(TweetsApi.fetchTweet, TweetId)
    yield put(setTweet(data))
    yield put(setTweetLoadingState(LoadingState.LOADED))
  }catch(e){
    yield put(setTweetLoadingState(LoadingState.ERROR))
  }
}


export function* tweetSaga() {
  yield takeLatest(TweetActionType.FETCH_TWEET , TweetRequest)
 
}    