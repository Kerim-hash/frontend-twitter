import { Tweet } from "../../tweets/contracts/state";

export enum LoadingState {
    LOADED = "LOADED",
    ERROR = "ERROR",
    LOADING = "LOADING",
    NEVER = "NEVER",
    SUCCESS = "SUCCESS",
}

export interface TweetState {
    data?: Tweet ,
    loadingState: LoadingState
}