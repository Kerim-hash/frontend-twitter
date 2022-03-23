export enum LoadingState {
    LOADED = "LOADED",
    ERROR = "ERROR",
    LOADING = "LOADING",
    NEVER = "NEVER",
}

export interface Tag {
    name: string;
    count: number
    _id: string
}

export interface TagsState  {
    items: Tag[],
    loadingState: LoadingState
}