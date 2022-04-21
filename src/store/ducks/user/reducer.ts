import produce, { Draft } from 'immer'
import { UserActions, UserActionType } from './actions'
import { FollowState, LoadingState, User } from './contracts/state'

export const initialstate: User = {
    loadingState: LoadingState.NEVER,
    data: undefined,
    profile: undefined,
    link: undefined,
    searchUser: undefined,
    users: undefined,
    followState: FollowState.NEVER
}

export const userReducer = produce((draft: Draft<User>, action: UserActions) => {
    switch (action.type) {
        case UserActionType.SET_USER_DATA:
            draft.data = action.payload
            break
        case UserActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload
            break
        case UserActionType.FETCH_GET_ME:
            draft.data = action.payload
            break
        case UserActionType.SET_PROFILE:
            draft.profile = action.payload
            break
        case UserActionType.SET_LINK:
            draft.link = action.payload
            break
        case UserActionType.SET_FOLLOW_STATE:
                console.log()
            if(action.payload === "LOADING"){
                draft.followState = FollowState.LOADING
            }
            if(action.payload === "ERROR"){
                draft.followState = FollowState.ERROR
            }
            if(action.payload === "NEVER"){
                draft.followState = FollowState.NEVER
            }
          
            if (action.payload.status) {
                action.payload.followed ? draft.data.followers.push(action.payload.follower) : draft.data.followers.pop()
            }
            break
        case UserActionType.SET_SEARCH_USER_BY_NAME:
            if (action.payload) {
                draft.searchUser = action.payload
            }
            break
        case UserActionType.SET_USERS:
            draft.users = action.payload
            break
    
    }
}, initialstate)
