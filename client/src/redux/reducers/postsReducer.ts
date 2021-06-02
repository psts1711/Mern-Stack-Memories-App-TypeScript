import {PostsActionTypes} from '../actions/postsAction';
export interface PostsReducerState {
    posts: any[];
}
const initialState : PostsReducerState= {
    posts: [],
};
export const PostsReducer =  (state = initialState, action:any,) => {
    switch (action.type) {
        case PostsActionTypes.FETCH_ALL:
            return {state, posts: action.payload};
        case PostsActionTypes.CREATE:
            const Post = state.posts.concat(action.payload);
            return {state, posts:Post};
        case PostsActionTypes.UPDATE:
           const posts = state.posts.map((post)=>post._id == action.payload.id ? action.payload.data : post);
           return {state,  posts: posts};
        case PostsActionTypes.DELETE:
            const postsData = state.posts.filter((post) => post._id !== action.payload);
            return {state, posts: postsData};
        case PostsActionTypes.LIKE:
            const posts2 = state.posts.map((post)=>post._id == action.payload.id ? action.payload.data : post);
            return {state,  posts: posts2};
        default:
            return state;
    }
};
