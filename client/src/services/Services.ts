import {PostsAction} from '../redux/actions/postsAction';
import * as api from '../api/index';

export class Services{

    static getPosts(){
        return async (dispatch:any) => {
            try {
                const { data } = await api.fetchPosts();
                dispatch(PostsAction.getPosts(data));
                return ;
            }catch (e) {
                return Promise.reject(e)
            }
        }
    }
    static createPosts(post:any){
        return async (dispatch:any) => {
            try {
               const {data} = await api.createPost(post);
                const newPost = {...data};
               dispatch(PostsAction.createPost(newPost))
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
}