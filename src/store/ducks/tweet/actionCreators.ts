import { Tweet } from "../tweets/contracts/state";
import { SetTweetActionInterface, SetTweetLoadinfStateActionInterface, TweetActionType, FetchctionInterface } from "./contracts/actionTypes";
import { LoadingState, TweetState } from "./contracts/state";

export const setTweet = (payload: TweetState['data']): SetTweetActionInterface =>({
    type: TweetActionType.SET_TWEET,
    payload
})


export const setTweetLoadingState = (payload: LoadingState): SetTweetLoadinfStateActionInterface =>({
    type: TweetActionType.SET_LOADING_STATE,
    payload
})

export const fetchTweet = (payload: string):  FetchctionInterface =>({
    type: TweetActionType.FETCH_TWEET,
    payload
})



export type TweetsActions = SetTweetActionInterface | SetTweetLoadinfStateActionInterface | FetchctionInterface