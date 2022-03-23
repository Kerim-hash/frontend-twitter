import { Action } from "redux";
import { LoadingState, TagsState } from "./contracts/state";

export enum TagsActionType  {
    SET_TAGS = "Tags/SET_TAGS",
    FETCH_TAGS = "Tags/FETCH_TAGS",
    SET_LOADING_STATE = "Tags/SET_LOADING_STATE",
}

export interface SetTagsActionInterface extends Action<TagsActionType>{
    type: TagsActionType.SET_TAGS,
    payload: TagsState["items"]
}  

export interface SetTagsLoadinfStateActionInterface extends Action<TagsActionType>{
    type: TagsActionType.SET_LOADING_STATE,
    payload: LoadingState
}  

export interface FetchctionInterface extends Action<TagsActionType>{
    type: TagsActionType.FETCH_TAGS,
}  


export const setTags=  (payload: TagsState['items']): SetTagsActionInterface =>({
    type: TagsActionType.SET_TAGS,
    payload
})


export const setTagsLoadingState = (payload: LoadingState): SetTagsLoadinfStateActionInterface =>({
    type: TagsActionType.SET_LOADING_STATE,
    payload

})

export const fetchTags= ():  FetchctionInterface =>({
    type: TagsActionType.FETCH_TAGS,
})


export type TagsActions = SetTagsActionInterface | SetTagsLoadinfStateActionInterface | FetchctionInterface