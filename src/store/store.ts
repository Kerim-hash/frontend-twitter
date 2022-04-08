import { applyMiddleware, compose, createStore } from 'redux';
import { rootReducer } from './ducks/rootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './ducks/rootSaga';
import { TweetsState } from './ducks/tweets/contracts/state';
import { TagsState } from './ducks/tags/contracts/state';
import { User } from './ducks/user/contracts/state';
import { Message } from './ducks/Messages/contracts/state';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware()

export interface RootState {
    tweets: TweetsState,
    tags: TagsState,
    user: User,
    message: Message
}


export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)