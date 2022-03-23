export enum LoadingState {
    LOADED = "LOADED",
    ERROR = "ERROR",
    LOADING = "LOADING",
    NEVER = "NEVER",
   
}
export enum AddFormState {
    ERROR = "ERROR",
    LOADING = "LOADING",
    NEVER = "NEVER",
    SUCCESS = "SUCCESS",
}

export enum LikedState {
    LIKED = "LIKED",
    DISLAKED = "DISLAKED",
    NEVER = "NEVER"
}

export interface Tweet {
    text: string,
    createdAt: string,
    user: {
        username: string,
        fullname: string,
        avatarUrl: string,
        _id: string
    },
    _id: string,
    images?: string[],
    likes?: string[],
}

export interface TweetsState {
    items: Tweet[],
    loadingState: LoadingState,
    addFormState: AddFormState,
}