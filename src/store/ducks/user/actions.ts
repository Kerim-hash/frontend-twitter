import { Action } from "redux";
import { LoginFormProps } from "../../../components/auth/Signin";
import { RegisterFormProps } from "../../../components/auth/SignUp";
import { LoadingState, UserType } from "./contracts/state";
import { UserResponse } from '../../../services/api/userApi'
export enum UserActionType {
    FETCH_GET_ME = "User/FETCH_GET_ME",
    FETCH_SIGN_UP = "User/FETCH_SIGN_UP",
    FETCH_SIGN_IN = "User/FETCH_SIGN_IN",
    SET_USER_DATA = "User/SET_USER_DATA",
    SET_PROFILE = "User/SET_PROFILE",
    FETCH_PROFILE = "User/FETCH_PROFILE",
    SET_LOADING_STATE = "User/SET_LOADING_STATE",
    SIGN_OUT = "User/SIGN_OUT",
    SET_LINK = "User/SET_LINK",
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



// SET_LOADING_STATE // --------------------------------`// SET_LOADING_STATE
export interface SetLoadingStateActionInterface extends Action<UserActionType> {
    type: UserActionType.SET_LOADING_STATE,
    payload: LoadingState
}

export const setUserLoadingState = (payload: LoadingState): SetLoadingStateActionInterface => ({
    type: UserActionType.SET_LOADING_STATE,
    payload
})





export type UserActions =
    FetchSignInActionInterface |
    SetUserDataActionInterface |
    SetLoadingStateActionInterface |
    FetchGetMeActionInterface |
    FetchProfileActionInterface |
    SetProfileActionInterface | 
    SetLinkActionInterface