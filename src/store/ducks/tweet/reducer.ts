import produce, { Draft } from 'immer'
import { TweetsActions } from './actionCreators'
import { TweetActionType } from './contracts/actionTypes'
import { LoadingState, TweetState } from './contracts/state'

export const initialTweetState: TweetState = {
    data: undefined ,
    loadingState: LoadingState.NEVER,
}

export const tweetReducer = produce((draft: Draft<TweetState>, action: TweetsActions) => {
    switch (action.type) {
        case TweetActionType.SET_TWEET:
            draft.data = action.payload
            draft.loadingState = LoadingState.LOADED
            break
        case TweetActionType.FETCH_TWEET:
            draft.loadingState = LoadingState.LOADING
            break
        case TweetActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload
            break
    }
}, initialTweetState)
