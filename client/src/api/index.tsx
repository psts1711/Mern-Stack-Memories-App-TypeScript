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
export const fetchPost = (id:any) => API.get(`/posts/${id}`)
export const fetchPosts = (page:number) => API.get(`/posts?page=${page}`);
export const createPost = (newPost:any) => API.post('/posts', newPost);
export const updatePost = (id:any, updatedPost:any) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id:any) => API.delete(`/posts/${id}`);
export const likePostApi = (id:any) => API.patch(`/posts/${id}/likedPost`)

export const fetchPostsBySearch = (searchQuery:any) => API.get(`/posts/search/posts?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);


// User Api Services
export const signIn=(formData:any)=>API.post('/user/signin', formData);
export const signUp=(formData:any)=>API.post('/user/signup', formData);
