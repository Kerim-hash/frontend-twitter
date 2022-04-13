import { all } from "@redux-saga/core/effects";
import { UserSaga } from "./user/saga";
import { TagsSaga } from "./tags/saga";
import {tweetsSaga} from './tweets/saga'

export default function* rootSaga() {
    yield all([
        tweetsSaga(), TagsSaga(),  UserSaga(),
    ])
  }