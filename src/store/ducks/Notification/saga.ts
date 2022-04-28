import { call, put, takeLatest } from 'redux-saga/effects'

// export function* FetchConversation({payload}: FetchConversationActionInterface) {
//   try {
//     const data = yield call(ConversationApi.fetchConvertsation, payload)
//     yield put(setConversation(data))
//   }
//   catch (e) {
//     yield put(setConversation(e))
//   }
// }



export function* NotificationSaga() {
  // yield takeLatest(MessageActionType.FETCH_GET_CONVERSATION, FetchConversation)
}