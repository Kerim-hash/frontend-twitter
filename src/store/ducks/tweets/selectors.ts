import { RootState } from "../../store";
import { LoadingState, TweetsState, AddFormState, } from "./contracts/state";

export const selectTweetsState = (state: RootState): TweetsState => state.tweets

export const selectLoading = (state: RootState) => selectTweetsState(state).loadingState

export const selectAddFormState = (state: RootState): AddFormState => selectTweetsState(state).addFormState

export const selectIsTweetLoading = (state: RootState) => selectLoading(state) === LoadingState.LOADING

export const selectIsTweetLoaded = (state: RootState) => selectLoading(state) === LoadingState.LOADED

export const selectIsTweetDeleted = (state: RootState) => selectAddFormState(state) === AddFormState.SUCCESS

export const selectTweetsItems = (state: RootState) => selectTweetsState(state).items


