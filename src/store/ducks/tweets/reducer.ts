import produce, { Draft } from 'immer'
import { TweetsActions } from './actionCreators'
import { TweetsActionType } from './contracts/actionTypes'
import { LoadingState, TweetsState, AddFormState, AddCommentState, BookmarksState } from './contracts/state'

export const initialTweetState: TweetsState = {
    items: [],
    data: undefined,
    loadingState: LoadingState.NEVER,
    addFormState: AddFormState.NEVER,
    addCommentState: AddCommentState.NEVER,
    bookmarksState: BookmarksState.NEVER,
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
            draft.loadingState = action.payload
            break
        case TweetsActionType.FETCH_ADD_TWEET:
            draft.addFormState = AddFormState.LOADING
            break
        case TweetsActionType.SET_ADD_FORM_STATE:
            draft.addFormState = action.payload
            break
        case TweetsActionType.ADD_TWEET:
            draft.items.unshift(action.payload)
            draft.addFormState = AddFormState.NEVER
            break
        case TweetsActionType.DELETE_TWEET:
            draft.items = draft.items.filter(obj => obj._id !== action.payload)
            break
        case TweetsActionType.SET_TWEET:
            draft.data = action.payload
            draft.loadingState = LoadingState.LOADED
            break
        case TweetsActionType.FETCH_TWEET:
            draft.loadingState = LoadingState.LOADING
            break
        case TweetsActionType.SET_COMMENT_TWEET:
            if (action.payload.comment) {
                draft.addCommentState = AddCommentState.NEVER
                draft.data.comment.unshift(action.payload.comment)
            } else {
                draft.addCommentState = AddCommentState.ERROR
            }
            break
        case TweetsActionType.SET_ADD_COMMENT_FORM_STATE:
            draft.addCommentState = action.payload
            break
        case TweetsActionType.FETCH_LIKE_TOGGLE:
            if (action.payload.liked) {
                draft.items.find(obj => obj._id === action.payload.id)?.likes.pop()
                draft.data !== undefined && draft.data?.likes.push(action.payload.userID)
            } else {
                draft.items.find(obj => obj._id === action.payload.id)?.likes.push(action.payload.userID)
                draft.data !== undefined && draft.data?.likes.pop()
            }
            break
        // case TweetsActionType.SET_BOOKMARKS_STATE:
        //     if (action.payload.message === 'tweet bookmarksed') {
        //         console.log('tweet bookmarksed')
        //         draft.bookmarksState = BookmarksState.BOOKMARKSED
        //         draft.items.find(action.payload.tweetID).bookmarks.push(action.payload.userID)
        //     } else if (action.payload.message === 'tweet unbookmarksed') {
        //         console.log('tweet unbookmarksed')
        //         draft.bookmarksState = BookmarksState.UNBOOKMARKSED
        //         draft.items.find(action.payload.tweetID).bookmarks.pop()
        //     } else  {
        //         console.log('tweet never')
        //         // draft.bookmarksState = BookmarksState.NEVER
        //     }
        //     break
    }
}, initialTweetState)
