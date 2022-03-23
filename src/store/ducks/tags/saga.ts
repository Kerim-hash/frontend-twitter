import {  call, put, takeLatest } from 'redux-saga/effects'
import { TagsApi } from '../../../services/api/tagsApi'
import { FetchctionInterface } from '../tweets/actionCreators'
import { setTags, TagsActionType, setTagsLoadingState} from './actionCreators'
 import { LoadingState, TagsState } from './contracts/state'


export function* TagsRequest({}: FetchctionInterface) {
  try{
    const items: TagsState['items'] = yield call(TagsApi.fetchTags, )
    yield put(setTags(items))
  }catch(e){
    yield put(setTagsLoadingState(LoadingState.ERROR)) 
  }
}

export function* TagsSaga() {
  yield takeLatest(TagsActionType.FETCH_TAGS , TagsRequest)
}  