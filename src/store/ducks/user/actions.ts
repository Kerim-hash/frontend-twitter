import { Action } from "redux";
import { LoginFormProps } from "../../../components/auth/Signin";
import { RegisterFormProps } from "../../../components/auth/SignUp";
import { LoadingState, UserType } from "./contracts/state";

export enum UserActionType {
    FETCH_GET_ME = "User/FETCH_GET_ME",
    FETCH_SIGN_UP = "User/FETCH_SIGN_UP",
    FETCH_SIGN_IN = "User/FETCH_SIGN_IN",
    FETCH_USERS = "User/FETCH_USERS",
    SET_USERS = "User/SET_USERS",
    FETCH_USER_UPDATE = "User/FETCH_USER_UPDATE",
    FETCH_FOLLOW = "User/FETCH_FOLLOW",
    SET_FOLLOW_STATE = "User/SET_FOLLOW_STATE",
    FETCH_UNFOLLOW = "User/FETCH_UNFOLLOW",
    SET_USER_DATA = "User/SET_USER_DATA",
    SET_PROFILE = "User/SET_PROFILE",
    FETCH_PROFILE = "User/FETCH_PROFILE",
    SET_LOADING_STATE = "User/SET_LOADING_STATE",
    SIGN_OUT = "User/SIGN_OUT",
    SET_LINK = "User/SET_LINK",
    FETCH_SEARCH_USER_BY_NAME = "User/FETCH_SEARCH_USER_BY_NAME",
    SET_SEARCH_USER_BY_NAME = "User/SET_SEARCH_USER_BY_NAME"
}

// SIGN IN // --------------------------------` SIGN IN
export interface FetchSignInActionInterface extends Action<UserActionType> {
    type: UserActionType.FETCH_SIGN_IN,
    payload: LoginFormProps
}
export const FetchSignIn = (payload: LoginFormProps): FetchSignInActionInterface => ({
    type: UserActionType.FETCH_SIGN_IN,
    payload
})

// SIGN UP // --------------------------------` SIGN UP
export interface FetchSignUpActionInterface extends Action<UserActionType> {
    type: UserActionType.FETCH_SIGN_UP,
    payload: RegisterFormProps
}
export const FetchSignUp = (payload: RegisterFormProps): FetchSignUpActionInterface => ({
    type: UserActionType.FETCH_SIGN_UP,
    payload
})

// SIGN_OUT // --------------------------------` SIGN_OUT
export interface SignOutActionInterface extends Action<UserActionType> {
    type: UserActionType.SIGN_OUT,
}

export const signOut = (): SignOutActionInterface => ({
    type: UserActionType.SIGN_OUT,
})

// GET ME // --------------------------------  // GET ME
export interface FetchGetMeActionInterface extends Action<UserActionType> {
    type: UserActionType.FETCH_GET_ME,
    payload?: any
}
export const FetchGetMe = (payload?: any): FetchGetMeActionInterface => ({
    type: UserActionType.FETCH_GET_ME,
    payload
})

// SET DATA // --------------------------------`// SET DATA
export interface SetUserDataActionInterface extends Action<UserActionType> {
    type: UserActionType.SET_USER_DATA,
    payload?: UserType
}

export const setUserData = (payload?: UserType): SetUserDataActionInterface => ({
    type: UserActionType.SET_USER_DATA,
    payload
})

// SET LINK // --------------------------------`// SET LINK
export interface SetLinkActionInterface extends Action<UserActionType> {
    type: UserActionType.SET_LINK,
    payload?: string
}

export const setLink = (payload?: string): SetLinkActionInterface => ({
    type: UserActionType.SET_LINK,
    payload
})

// FETCH Users Profile // --------------------------------`// FETCH Users Profile
export interface FetchUsersActionInterface extends Action<UserActionType> {
    type: UserActionType.FETCH_USERS,
}

export const fetchUsers = (): FetchUsersActionInterface => ({
    type: UserActionType.FETCH_USERS,
})
// SET Profile // --------------------------------`// SET Profile
export interface SetUsersActionInterface extends Action<UserActionType> {
    type: UserActionType.SET_USERS,
    payload?: UserType[]
}

export const setUsers = (payload?: UserType[]): SetUsersActionInterface => ({
    type: UserActionType.SET_USERS,
    payload
})

// FETCH Profile // --------------------------------`// FETCH Profile
export interface FetchProfileActionInterface extends Action<UserActionType> {
    type: UserActionType.FETCH_PROFILE,
    payload?: string
}

export const fetchProfile = (payload?: string): FetchProfileActionInterface => ({
    type: UserActionType.FETCH_PROFILE,
    payload
})
// SET Profile // --------------------------------`// SET Profile
export interface SetProfileActionInterface extends Action<UserActionType> {
    type: UserActionType.SET_PROFILE,
    payload?: UserType
}

export const setProfile = (payload?: UserType): SetProfileActionInterface => ({
    type: UserActionType.SET_PROFILE,
    payload
})

// FETCH FOLLOW // --------------------------------`// FETCH UNFOLLOW
export interface FetchFollowActionInterface extends Action<UserActionType> {
    type: UserActionType.FETCH_FOLLOW,
    payload?: {id: string, userID: string, followState: string}
}

export const fetchFollow = (payload?: {id: string, userID: string, followState: string}): FetchFollowActionInterface => ({
    type: UserActionType.FETCH_FOLLOW,
    payload
})

// // SET FOLLOW STATE // --------------------------------`// // // SET FOLLOW STATE 
export interface SetFollowStateActionInterface extends Action<UserActionType> {
    type: UserActionType.SET_FOLLOW_STATE,
    payload: any
}

export const setFollowState = (payload: any): SetFollowStateActionInterface => ({
    type: UserActionType.SET_FOLLOW_STATE,
    payload
})

// SET_LOADING_STATE // --------------------------------`// SET_LOADING_STATE
export interface SetLoadingStateActionInterface extends Action<UserActionType> {
    type: UserActionType.SET_LOADING_STATE,
    payload: LoadingState
}

export const setUserLoadingState = (payload: LoadingState): SetLoadingStateActionInterface => ({
    type: UserActionType.SET_LOADING_STATE,
    payload
})
// // // SET FOLLOW STATE // --------------------------------`// // // SET FOLLOW STATE 
export interface FetchSearchUserActionInterface extends Action<UserActionType> {
    type: UserActionType.FETCH_SEARCH_USER_BY_NAME,
    payload: string
}

export const FetchSearchUser = (payload: string): FetchSearchUserActionInterface => ({
    type: UserActionType.FETCH_SEARCH_USER_BY_NAME,
    payload
})

// // SET_LOADING_STATE // --------------------------------`// SET_LOADING_STATE
export interface SetSearchUserActionInterface extends Action<UserActionType> {
    type: UserActionType.SET_SEARCH_USER_BY_NAME,
    payload: UserType[]
}

export const SetSearchUser = (payload: UserType[]): SetSearchUserActionInterface => ({
    type: UserActionType.SET_SEARCH_USER_BY_NAME,
    payload
})

// FETCH USER UPDATE // --------------------------------`// FETCH USER UPDATE
export interface FetchUserUpdateActionInterface extends Action<UserActionType> {
    type: UserActionType.FETCH_USER_UPDATE,
    payload: any
}

export const FetchUserUpdate = (payload: any): FetchUserUpdateActionInterface => ({
    type: UserActionType.FETCH_USER_UPDATE,
    payload
})



export type UserActions =
    FetchSignInActionInterface |
    SetUserDataActionInterface |
    SetLoadingStateActionInterface |
    FetchGetMeActionInterface |
    FetchProfileActionInterface |
    SetProfileActionInterface | 
    SetLinkActionInterface |
    FetchFollowActionInterface |  
    SetFollowStateActionInterface | 
    SetSearchUserActionInterface | 
    FetchSearchUserActionInterface | 
    FetchUserUpdateActionInterface | 
    SetUsersActionInterface