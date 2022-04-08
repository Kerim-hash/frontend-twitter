import { RootState } from "../../store";
import { Message } from "./contracts/state";


export const selectMessage = (state: RootState): Message  => state.message

export const selectConversation = (state: RootState) => selectMessage(state).conversation
export const selectMessages = (state: RootState) => selectMessage(state).messages