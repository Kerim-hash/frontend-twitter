import { all } from "@redux-saga/core/effects";
import { UserSaga } from "./user/saga";
import {tweetsSaga} from './tweets/saga'
import { MessageSaga } from "./Messages/saga";

export default function* rootSaga() {
    yield all([
        tweetsSaga(), UserSaga(), MessageSaga()
    ])
  }