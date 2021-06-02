export enum PostsActionTypes {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    FETCH_ALL = 'FETCH_ALL',
    LIKE = 'LIKE',
}
export enum AuthActionTypes{
    LOGIN_REQUEST = 'Login Request',
    LOGIN_REQUEST_SUCCESS = 'Login Request Success',
    USER_ERROR_OCCURRED = 'User Error Occurred',
    USER_LOGOUT = 'User Logout',
    SIGNUP_ACTION = 'Sign Up Action',
}

export class PostsAction {
    static getPosts=(posts:any) => ({
        type: PostsActionTypes.FETCH_ALL,
        payload: posts
    });
    static createPost=(posts:any) => ({
        type: PostsActionTypes.CREATE,
        payload: posts
    });
    static updatePost=(posts:any) => ({
        type: PostsActionTypes.UPDATE,
        payload: posts
    });
    static likePost=(id:any) => ({
        type: PostsActionTypes.LIKE,
        payload: id
    });
    static deletePost=(id: any) => ({
        type: PostsActionTypes.DELETE,
        payload: id
    });
}
export class AuthAction {
    static LoginRequestAction = () => ({
        type: AuthActionTypes.LOGIN_REQUEST,
    });
    static LoginRequestSuccessAction = (user:any) => ({
        type: AuthActionTypes.LOGIN_REQUEST_SUCCESS,
        payload: user,
    });
    static UserErrorOccurred = (errorMessage:any) => ({
        type: AuthActionTypes.USER_ERROR_OCCURRED,
        payload:errorMessage
    });
    static UserLogoutAction = () => ({
        type: AuthActionTypes.USER_LOGOUT,
    });
    static SignUpAction = (user:any) => ({
        type: AuthActionTypes.SIGNUP_ACTION,
        payload: user,
    });
}