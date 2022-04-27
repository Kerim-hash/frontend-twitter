import { Tweet } from "../../tweets/contracts/state";

export interface UserType {
    _id?: string;
    email: string;
    fullname: string;
    username: string;
    password: string;
    confirm_hash: string;
    confirmed?: boolean;
    location?: string;
    website?: string;
    about?: string;
    tweets?: string[],
    createdAt: string,
    avatar?: string,
    bgImage?: string,
    followers?:  {
        fullname: string,
        username: string,
        desk?: string,
        followers: string[],
        followings: string[],
        _id: string
    }[] , 
    followings?:  {
        fullname: string,
        username: string,
        desk?: string,
        followers: string[],
        followings: string[],
        _id: string
    }[],
    desc?: string,
    city?: string,
    liked: Tweet[],
    bookmarks: Tweet[],
}



export enum LoadingState {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    LOADING = "LOADING",
    LOADED = "LOADED",
    NEVER = "NEVER"
}

export enum FollowState {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    LOADING = "LOADING",
    NEVER = "NEVER"
}


export interface User {
    loadingState: LoadingState,
    data: UserType | undefined,
    profile: UserType | undefined,
    searchUser: UserType[] | undefined,
    link: string,
    users: UserType[] | undefined,
    followState: FollowState
}

