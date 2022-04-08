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

export enum LoadingStateTweet {
    LOADED = "LOADED",
    ERROR = "ERROR",
    LOADING = "LOADING",
    NEVER = "NEVER",
    SUCCESS = "SUCCESS",
}
export enum AddCommentState {
    ERROR = "ERROR",
    LOADING = "LOADING",
    NEVER = "NEVER",

}
export enum BookmarksState {
    BOOKMARKSED = "BOOKMARKSED",
    UNBOOKMARKSED = "UNBOOKMARKSED",
    NEVER = "NEVER",

}

export interface Comment {
    text: string,
    images?: string[],
    _id: string,
    user?: string,
    createdAt: string,
    updatedAt: string,
}

export interface Tweet {
    text: string,
    createdAt: string,
    user: {
        username: string,
        fullname: string,
        avatarUrl: string,
        _id: string,
        bookmarks: string[]
    },
    _id: string,
    images?: string[],
    likes?: string[],
    bookmarks?: string[],
    comment: Comment[] | string[],
    author?: { fullname: string, username: string }
}

export interface TweetsState {
    items: Tweet[],
    data?: Tweet,
    loadingState: LoadingState,
    addFormState: AddFormState,
    addCommentState: AddCommentState,
    bookmarksState: BookmarksState
}