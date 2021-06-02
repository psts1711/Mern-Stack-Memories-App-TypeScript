import {AuthActionTypes} from '../actions/postsAction';

export interface AuthReducerState {
    //user: User;
    authData: null,
    loggedIn: boolean;
    loggingIn: boolean;
    toastMessage: null;
    toastAlert: boolean;
    toastSeverity: string
}
const initialState:AuthReducerState={
   // user: null,
    authData: null,
    loggedIn: false,
    loggingIn: false,
    toastMessage: null,
    toastAlert: false,
    toastSeverity: ''

};

export const AuthReducer = (state = initialState, action:any) => {
    switch (action.type) {

        case AuthActionTypes.LOGIN_REQUEST: {
           // console.log({...state, toastAlert:true, loggingIn: true});
            //console.log({state, toastAlert:true, loggingIn: true});
            return {...state, toastAlert: false, loggingIn: true};
        }

        case AuthActionTypes.LOGIN_REQUEST_SUCCESS: {
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
            return {...state, toastAlert:true, toastSeverity:'success', toastMessage: 'Login successfully.',
                loggingIn: false, loggedIn: true,  authData: action.payload};
        }

        case AuthActionTypes.SIGNUP_ACTION: {
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
            return {...state, toastAlert:true, toastSeverity:'success', toastMessage: 'SignUp done, login successfully.', loggingIn: false, loggedIn: true, authData: action.payload};
        }

        case AuthActionTypes.USER_ERROR_OCCURRED: {
            return {state, toastMessage: action.payload, toastAlert: true, toastSeverity:'error'};
        }

        case AuthActionTypes.USER_LOGOUT: {
            localStorage.clear();
            return {...initialState, authData: null, loggedIn: false, toastMessage: null};
        }
        default: {
            return state;
        }
    }
};