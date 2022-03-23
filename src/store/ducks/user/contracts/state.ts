
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
    tweets?: string[]
}



export enum LoadingState {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    LOADING = "LOADING",
    LOADED = "LOADED",
    NEVER = "NEVER"
}


export interface User {
    loadingState: LoadingState,
    data: UserType | undefined,
    profile: UserType | undefined,
    link: string
}

