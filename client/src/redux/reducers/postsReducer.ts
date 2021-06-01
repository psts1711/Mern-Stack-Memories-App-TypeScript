import {PostsActionTypes} from '../actions/postsAction';
export interface PostsReducerState {
    posts: any[]
    isLoading: boolean
}
const initialState:PostsReducerState = {
    posts: [],
    isLoading: true
};
export const PostsReducer =  (state = initialState, action:any,) => {
    switch (action.type) {
        case PostsActionTypes.START_LOADOING:
            return {...state, isLoading: true}
        case PostsActionTypes.STOP_LOADOING:
            return {...state, isLoading: false}
        case PostsActionTypes.FETCH_POST:
            return {...state, post: action.payload};
        case PostsActionTypes.FETCH_ALL:
            return {...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalNumberOfPages,
            };
        case PostsActionTypes.FETCH_BY_SEARCH:
            return {...state, posts: action.payload};

        case PostsActionTypes.CREATE:
            const Post = state.posts.concat(action.payload);
            return {...state, posts:Post};

        case PostsActionTypes.UPDATE:
           const posts = state.posts.map((post)=>post._id == action.payload.id ? action.payload.data : post);
           return {...state,  posts: posts};

        case PostsActionTypes.DELETE:
            const postsData = state.posts.filter((post) => post._id !== action.payload);
            return {...state, posts: postsData};

        case PostsActionTypes.LIKE:
            const posts2 = state.posts.map((post)=>post._id == action.payload.id ? action.payload.data : post);
            return {...state,  posts: posts2};
        default:
            return state;
    }
};
