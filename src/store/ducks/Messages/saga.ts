import { call, put, takeLatest } from 'redux-saga/effects'
import { ConversationApi } from '../../../services/api/conversationApi'
import { MessageApi } from '../../../services/api/message'
import { LoadingState } from '../tags/contracts/state'
import { FetchAddConversationActionInterface, FetchConversationActionInterface, FetchMessageActionInterface, MessageActionType, sendMessageActionInterface, setAddConversation, setConversation, setMessage, setMessageLoadingState } from './actions'

export function* FetchConversation({payload}: FetchConversationActionInterface) {
  try {
    const data = yield call(ConversationApi.fetchConvertsation, payload)
    yield put(setConversation(data))
    
  }
  catch (e) {
    yield put(setConversation(e))
  }
}

export function* FetchAddConversation({payload}: FetchAddConversationActionInterface) {
  try {
    yield put(setMessageLoadingState(LoadingState.LOADING))
    const data = yield call(ConversationApi.fetchAddConvertsation, payload)
    yield put(setAddConversation(data))
    yield put(setMessageLoadingState(LoadingState.NEVER))
  }
  catch (e) {
    yield put(setMessageLoadingState(LoadingState.ERROR))
    yield put(setAddConversation(e))
  }
}


export function* FetchMessage({payload}: FetchMessageActionInterface) {
  try {
    const data = yield call(MessageApi.fetchMessage, payload)
    yield put(setMessage(data))
  }
  catch (e) {
    yield put(setMessage(e))
  }
}

export function* SendMessage({payload}: sendMessageActionInterface) {
  try {
    const data = yield call(MessageApi.sendMessage, payload)
    // yield put(setMessage(data))
  }
  catch (e) {
    alert('oops')
  }
}


export function*  MessageSaga() {
  yield takeLatest(MessageActionType.FETCH_GET_CONVERSATION, FetchConversation)
  yield takeLatest(MessageActionType.FETCH_GET_MESSAGE, FetchMessage)
  yield takeLatest(MessageActionType.SEND_MESSAGE, SendMessage)
  yield takeLatest(MessageActionType.FETCH_ADD_CONVERSATION, FetchAddConversation)
}