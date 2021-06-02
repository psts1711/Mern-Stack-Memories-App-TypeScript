import axios from "axios";

// Post Api Services
// const url = 'http://localhost:5000/posts';

// Axios
const API = axios.create({
    baseURL: 'http://localhost:5000',
});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile'))
    {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') as string).token}`
    }
    return req;
});

export const fetchPosts = () => API.get('/posts');

export const createPost = (newPost:any) => API.post('/posts', newPost);
export const updatePost = (id:any, updatedPost:any) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id:any) => API.delete(`/posts/${id}`);
export const likePostApi = (id:any) => API.patch(`/posts/${id}/likedPost`);

// User Api Services
export const signIn=(formData:any)=>API.post('/user/signin', formData);
export const signUp=(formData:any)=>API.post('/user/signup', formData);