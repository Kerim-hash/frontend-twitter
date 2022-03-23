import { RootState } from "../../store";
import { LoadingState, TweetState } from "./contracts/state";

export const selectTweet = (state: RootState): TweetState => state.tweet

export const selectLoading = (state: RootState) => selectTweet(state).loadingState

export const selectIsTweetLoading = (state: RootState) => selectLoading(state) === LoadingState.LOADING

export const selectIsTweetLoaded = (state: RootState) => selectLoading(state) === LoadingState.LOADED

export const selectTweetData = (state: RootState): TweetState['data'] => selectTweet(state).data


