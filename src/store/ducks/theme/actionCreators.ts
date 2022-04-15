import { Action } from "redux";
import { ThemeStatus } from "./contracts/state";

export enum ThemeActionType  {
    SET_THEME = "Theme/SET_THEME",
}

export interface SetThemeActionInterface extends Action<ThemeActionType>{
    type: ThemeActionType.SET_THEME,
    payload: ThemeStatus
}  

export const setTheme = (payload: ThemeStatus ): SetThemeActionInterface => ({
    type: ThemeActionType.SET_THEME,
    payload
})




export type ThemeActions = SetThemeActionInterface 