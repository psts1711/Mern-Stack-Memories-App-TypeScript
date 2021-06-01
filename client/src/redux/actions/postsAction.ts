export enum PostsActionTypes {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    FETCH_ALL = 'FETCH_ALL',
    FETCH_POST = 'FETCH_POST',
    LIKE = 'LIKE',
    FETCH_BY_SEARCH = 'FETCH_BY_SEARCH',
    START_LOADOING ='START_LOADOING',
    STOP_LOADOING ='STOP_LOADOING',

}
export enum AuthActionTypes{
    LOGIN_REQUEST = 'Login Request',
    LOGIN_REQUEST_SUCCESS = 'Login Request Success',
    USER_ERROR_OCCURRED = 'User Error Occurred',
    USER_LOGOUT = 'User Logout',
    SIGNUP_ACTION = 'Sign Up Action',
    START_LOADOING ='START_LOADOING',
    STOP_LOADOING ='STOP_LOADOING',
}

export class PostsAction {

    static getPost=(post:any) => ({
        type: PostsActionTypes.FETCH_POST,
        payload: post
    });

    static getPosts=(posts:any) => ({
        type: PostsActionTypes.FETCH_ALL,
        payload: posts
    });

    static getPostsBySearch=(posts:any) => ({
        type: PostsActionTypes.FETCH_BY_SEARCH,
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

    static startLoding = () => ({
        type: AuthActionTypes.START_LOADOING,
    });
    static stopLoading = () => ({
        type: AuthActionTypes.STOP_LOADOING,
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