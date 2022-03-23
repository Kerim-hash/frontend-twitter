import produce, { Draft } from 'immer'
import { UserActions, UserActionType } from './actions'
import { LoadingState, User} from './contracts/state'

export const initialstate: User = {
    loadingState: LoadingState.NEVER,
    data: undefined,
    profile: undefined,
    link: undefined
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
    }
}, initialstate)
