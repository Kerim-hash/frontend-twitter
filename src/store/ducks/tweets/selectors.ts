import { RootState } from "../../store";
import { LoadingState, TweetsState, AddFormState, AddCommentState, } from "./contracts/state";

export const selectTweetsState = (state: RootState): TweetsState => state.tweets

export const selectLoading = (state: RootState) => selectTweetsState(state).loadingState

export const selectAddFormState = (state: RootState): AddFormState => selectTweetsState(state).addFormState

export const selectAddCommentState = (state: RootState): AddCommentState => selectTweetsState(state).addCommentState

export const selectIsTweetLoading = (state: RootState) => selectLoading(state) === LoadingState.LOADING

export const selectIsTweetLoaded = (state: RootState) => selectLoading(state) === LoadingState.LOADED

export const selectIsTweetDeleted = (state: RootState) => selectAddFormState(state) === AddFormState.DELETED
export const selectIsTweetAdded = (state: RootState) => selectAddFormState(state) === AddFormState.ADDED

export const selectTweetsItems = (state: RootState) => selectTweetsState(state).items

export const selectBookmarksState = (state: RootState) => selectTweetsState(state).bookmarksState

export const selectTweetData = (state: RootState): TweetsState['data'] => selectTweetsState(state).data