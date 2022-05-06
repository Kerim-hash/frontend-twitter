import { RootState } from "../../store";
import { User } from "./contracts/state";


export const selectUser = (state: RootState): User  => state.user

export const selectData = (state: RootState) => selectUser(state).data

export const selectProfile = (state: RootState) => selectUser(state).profile

export const selectLink = (state: RootState) => selectUser(state).link

export const selectUsers = (state: RootState) => selectUser(state).users

export const selectLoadingState = (state: RootState) => selectUser(state).loadingState

export const selectSearchUser = (state: RootState) => selectUser(state).searchUser

export const selectFollowState = (state: RootState) => selectUser(state).followState

export const isAuthenticated = () => window.localStorage.getItem('token' || '')