import { call, put, takeLatest } from 'redux-saga/effects'
import { ConversationApi } from '../../../services/api/conversationApi'
import { MessageApi } from '../../../services/api/message'
import { FetchAddConversationActionInterface, FetchConversationActionInterface, FetchConversationByIdActionInterface, FetchDeleteConversationActionInterface, FetchMessageActionInterface, MessageActionType, sendMessageActionInterface, setAddConversation, setAddMessage, setConversation, setConversationCurrent, setMessage, setMessageLoadingState } from './actions'
import { LoadingState } from './contracts/state'

export function* FetchConversation({payload}: FetchConversationActionInterface) {
  try {
    const data = yield call(ConversationApi.fetchConvertsation, payload)
    yield put(setConversation(data))
  }
  catch (e) {
    yield put(setConversation(e))
  }
}
export function* FetchConversationById({payload}: FetchConversationByIdActionInterface) {
  try {
    const data = yield call(ConversationApi.fetchConvertsationById, payload)
    yield put(setConversationCurrent(data))
  }
  catch (e) {
    yield put(setConversationCurrent(undefined))
  }
}

export function* FetchAddConversation({payload}: FetchAddConversationActionInterface) {
  try {
    yield put(setMessageLoadingState(LoadingState.LOADING))
    const data = yield call(ConversationApi.fetchAddConvertsation, payload)
    yield put(setAddConversation([data]))
    yield put(setMessageLoadingState(LoadingState.NEVER))
  }
  catch (e) {
    yield put(setMessageLoadingState(LoadingState.ERROR))
  }
}

export function* FetchDeleteConversation({payload}: FetchDeleteConversationActionInterface) {
  try {
    yield put(setMessageLoadingState(LoadingState.LOADING))
    yield call(ConversationApi.fetchdeleteConvertsation, payload)
    yield put(setMessageLoadingState(LoadingState.NEVER))
  }
  catch (e) {
    yield put(setMessageLoadingState(LoadingState.ERROR))
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
    yield put(setAddMessage(data))
  }
  catch (e) {
    console.log('oops')
  }
}


export function*  MessageSaga() {
  yield takeLatest(MessageActionType.FETCH_GET_CONVERSATION, FetchConversation)
  yield takeLatest(MessageActionType.FETCH_GET_MESSAGE, FetchMessage)
  yield takeLatest(MessageActionType.SEND_MESSAGE, SendMessage)
  yield takeLatest(MessageActionType.FETCH_ADD_CONVERSATION, FetchAddConversation)
  yield takeLatest(MessageActionType.FETCH_DELETE_CONVERSATION, FetchDeleteConversation)
  yield takeLatest(MessageActionType.FETCH_GET_CONVERSATION_BY_ID, FetchConversationById)
}