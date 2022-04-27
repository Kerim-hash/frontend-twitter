import produce, { Draft } from 'immer'
import { ThemeActions, ThemeActionType } from './actionCreators'
import { ThemeState, ThemeStatus } from './contracts/state'

export const initialstate: ThemeState = {
    theme: ThemeStatus.DARK
}


export const ThemeReducer = produce((draft: Draft<ThemeState>, action: ThemeActions) => {
    switch (action.type) {
        case ThemeActionType.SET_THEME:
            draft.theme = action.payload
            break
    }
}, initialstate) 
