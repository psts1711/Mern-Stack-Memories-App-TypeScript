import {AuthAction, PostsAction} from '../redux/actions/postsAction';
import * as api from '../api/index'
export class AuthServices{

    static login(formData:any, history:any){

        return async (dispatch:any) => {
            try {
                dispatch(AuthAction.LoginRequestAction());
                const {data} = await api.signIn(formData);
                dispatch(AuthAction.LoginRequestSuccessAction(data));
                history.push('/');
                return ;
            }catch (error) {
                const errorMessage:any = error.response.data.message;
                dispatch(AuthAction.UserErrorOccurred(errorMessage));
                return Promise.reject(error)
            }
        }
    }

    static signup(formData:any, history:any){
        return async (dispatch:any) => {
            try {
                const { data } = await api.signUp(formData);
                dispatch(AuthAction.SignUpAction(data));
                history.push('/');
                return ;
            }catch (error) {
                const errorMessage:any = error.response.data.message;
                dispatch(AuthAction.UserErrorOccurred(errorMessage));
                return Promise.reject(error)
            }
        }
    }


    static logout(){
        return async (dispatch:any) =>{
            await dispatch(AuthAction.UserLogoutAction())
        }
    }
}