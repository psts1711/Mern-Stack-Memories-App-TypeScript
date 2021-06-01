import {PostsAction} from '../redux/actions/postsAction';
import * as api from '../api/index';

export class Services{

    static getPosts(page:number){
        return async (dispatch:any) => {
            try {
                dispatch(PostsAction.startLoding());
                const { data } = await api.fetchPosts(page);
                dispatch(PostsAction.getPosts(data));
                dispatch(PostsAction.stopLoading());
                return ;
            }catch (e) {
                return Promise.reject(e)
            }
        }
    }

    static getPost(id:any){
        return async (dispatch:any) => {
            try {
                dispatch(PostsAction.startLoding());
                const { data } = await api.fetchPost(id);
                dispatch(PostsAction.getPost(data));
                dispatch(PostsAction.stopLoading());
                return ;
            }catch (e) {
                return Promise.reject(e)
            }
        }
    }

    static createPosts(post:any, history:any){
        return async (dispatch:any) => {
            try {
                dispatch(PostsAction.startLoding());
                const {data} = await api.createPost(post);
                const newPost = {...data};
                history.push(`/posts/${data._id}`)
                dispatch(PostsAction.createPost(newPost))
                dispatch(PostsAction.stopLoading());
            }catch (e) {
                console.log(e);
                return Promise.reject(e)
            }
        }
    }

    static updatePost(id:any, updatedPost:any){
        return async (dispatch:any) => {
            try {
                const response = await api.updatePost(id, updatedPost);
                const post = {...response, id: id};
                dispatch(PostsAction.updatePost(post));
                return ;
            }catch (e) {
                console.log(e);
                return Promise.reject(e)
            }
        }
    }
    static likedPost(id:any){
        return async (dispatch:any) => {
            try {
                const response = await api.likePostApi(id);
                const likePost = {...response, id: id};
                dispatch(PostsAction.likePost(likePost));
                return ;
            }catch (e) {
                console.log(e);
                return Promise.reject(e)
            }
        }
    }

    static deletePost(id:any){
        return async (dispatch:any) => {
            try {
                const response = await api.deletePost(id);
                dispatch(PostsAction.deletePost(id));
                return response;
            }catch (e) {
                console.log(e);
                return Promise.reject(e)
            }
        }
    }

    // Part 4 Here start
    static getPostsBySearch(searchQuery:any){
      //  console.log(searchQuery);
        return async (dispatch:any) => {
            try {
                dispatch(PostsAction.startLoding());
                const { data: {data} } = await api.fetchPostsBySearch(searchQuery);
                dispatch(PostsAction.getPostsBySearch(data));
                dispatch(PostsAction.stopLoading());
                // console.log(data);
               // dispatch(PostsAction.getPosts(data));
                return ;
            }catch (e) {
               // console.log(e);
                return Promise.reject(e)
            }
        }
    }
}