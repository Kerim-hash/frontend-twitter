import { call, put, takeLatest } from 'redux-saga/effects'
import { UserApi } from '../../../services/api/userApi'
import { FetchSignInActionInterface, FetchSignUpActionInterface, setProfile, setUserData, setUserLoadingState, UserActionType , FetchProfileActionInterface, setLink, setFollowState, FetchFollowActionInterface, FetchSearchUserActionInterface, SetSearchUser, FetchUserUpdateActionInterface, setUsers} from './actions'
import { FollowState, LoadingState } from './contracts/state'
import {istance} from '../../../core/axios'

export function* GetMeRequest() {
  try {
    const data = yield call(UserApi.fetchGetMe)
    yield put(setUserData(data))
  }
  catch (e) {
    yield put(setUserData(null))
  }
}

export function* fetchUsersRequest() {
  try {
    const data = yield call(UserApi.fetchUsers)
    yield put(setUsers(data))
  }
  catch (e) {
    yield put(setUsers(null))
  }
}

export function* LoginRequest({ payload }: FetchSignInActionInterface) {
  try {
    yield put(setUserLoadingState(LoadingState.LOADING))
    const data = yield call(UserApi.fetchLogin, payload)
    window.localStorage.setItem('token', data.token)
    istance.defaults.headers.common['token'] = `${data.token}`;
    yield put(setUserData(data))
    yield put(setUserLoadingState(LoadingState.SUCCESS))
    window.location.href = '/home'
  } catch (e) {
    yield put(setUserLoadingState(LoadingState.ERROR))
  }
}

export function* RegisterRequest({ payload }: FetchSignUpActionInterface) {
  try {
    yield put(setUserLoadingState(LoadingState.LOADING))
    const data = yield call(UserApi.fetchRegister, payload)
    yield put(setLink(data))
    yield put(setUserLoadingState(LoadingState.SUCCESS))
  } catch (e) {
    yield put(setUserLoadingState(LoadingState.ERROR))
  }
}

export function* ProfileRequest({ payload }: FetchProfileActionInterface) {
  try {
    const data = yield call(UserApi.fetchProfile, payload)
    yield put(setProfile(data))
    yield put(setUserLoadingState(LoadingState.SUCCESS))
  } catch (e) {
    yield put(setUserLoadingState(LoadingState.ERROR))
  }
}

export function* SignOut() {
  try {
    localStorage.clear();
    yield put(setUserData(undefined))
    window.location.href = '/auth'
  } catch (e) {
    yield put(setUserLoadingState(LoadingState.ERROR))
  }
}

export function* FetchFollow({payload}: FetchFollowActionInterface) {
  try {
    yield put(setFollowState(FollowState.LOADING))
    const data = yield call(UserApi.fetchFollow, payload)
    yield put(setFollowState(data))
    yield put(setFollowState(FollowState.NEVER))
  } catch (e) {
    yield put(setFollowState(FollowState.ERROR))
  }
}


export function* SearchUser({ payload }: FetchSearchUserActionInterface) {
  try {
    const data = yield call(UserApi.fetchSearchUser, payload)
    console.log(data)
    yield put(SetSearchUser(data))
  } catch (e) {
    console.log('oops')
  }
}

export function* FetchUserUpdate({ payload }: FetchUserUpdateActionInterface) {
  try {
    const data = yield call(UserApi.fetchUserUpdate, payload)
    yield put(setUserData(data))
    console.log(data)
  } catch (e) {
    // console.log('oops')
  }
}


export function* UserSaga() {
  yield takeLatest(UserActionType.FETCH_SIGN_IN, LoginRequest)
  yield takeLatest(UserActionType.FETCH_SIGN_UP, RegisterRequest)
  yield takeLatest(UserActionType.FETCH_GET_ME, GetMeRequest)
  yield takeLatest(UserActionType.SIGN_OUT, SignOut)
  yield takeLatest(UserActionType.FETCH_PROFILE, ProfileRequest)
  yield takeLatest(UserActionType.FETCH_FOLLOW, FetchFollow)
  yield takeLatest(UserActionType.FETCH_SEARCH_USER_BY_NAME, SearchUser)
  yield takeLatest(UserActionType.FETCH_USER_UPDATE, FetchUserUpdate)
  yield takeLatest(UserActionType.FETCH_USERS, fetchUsersRequest)
}