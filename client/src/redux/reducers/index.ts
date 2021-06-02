import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {PostsReducer, PostsReducerState} from './postsReducer';
import {AuthReducer, AuthReducerState} from './authReducer';

import thunk from 'redux-thunk';

export interface RootReducerState {
    postsReducer: PostsReducerState;
    authReducer: AuthReducerState;
}
export const rootReducer = combineReducers({
   postsReducer: PostsReducer,
   authReducer: AuthReducer
});
let composeEnhancers = compose;
export default createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
);