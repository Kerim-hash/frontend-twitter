import { createSelector } from "reselect";
import { RootState } from "../../store";
import { LoadingState, TagsState } from "./contracts/state";

export const selectTags = (state: RootState): TagsState => state.tags  

export const selectLoading = (state: RootState) => selectTags(state).loadingState

export const selectIsTagsLoading = (state: RootState) => selectLoading(state) === LoadingState.LOADING

export const selectIsTagsLoaded = (state: RootState) => selectLoading(state) === LoadingState.LOADED


export const selectTagsItems = createSelector(selectTags, (Tags) => Tags.items)


 