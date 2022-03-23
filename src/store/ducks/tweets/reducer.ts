import produce, { Draft } from 'immer'
import { TweetsActions, TweetsActionType } from './actionCreators'
import { LoadingState, TweetsState, AddFormState } from './contracts/state'

export const initialTweetState: TweetsState = {
    items: [],
    loadingState: LoadingState.NEVER,
    addFormState: AddFormState.NEVER 
}


export const tweetsReducer = produce((draft: Draft<TweetsState>, action: TweetsActions) => {
    switch (action.type) {
        case TweetsActionType.SET_TWEETS:
            draft.items = action.payload
            draft.loadingState = LoadingState.LOADED
            break
        case TweetsActionType.FETCH_TWEETS:
            draft.items = []
            draft.loadingState = LoadingState.LOADING
            break 
        case TweetsActionType.SET_LOADING_STATE:
            draft.loadingState  =  action.payload
            break 
        case TweetsActionType.FETCH_ADD_TWEET :
            draft.addFormState = AddFormState.LOADING
            break 
        case TweetsActionType.SET_ADD_FORM_STATE :
            draft.addFormState = action.payload
            break 
        case TweetsActionType.ADD_TWEET:
            draft.items.unshift(action.payload) 
            draft.addFormState = AddFormState.NEVER
            break 
        case TweetsActionType.DELETE_TWEET:
            draft.items = draft.items.filter(obj => obj._id !== action.payload)
            break 
        }
}, initialTweetState) 
