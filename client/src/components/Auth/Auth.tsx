import React, {useState, useEffect} from "react";
import { GoogleLogin } from 'react-google-login';
import {useDispatch} from "react-redux";
import { Avatar, Grow, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import Input from './Input';
import Icon from './Icon';
import {AuthServices} from "../../services/AuthServices";
import {useHistory} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {AuthAction} from "../../redux/actions/postsAction";


import useStyles from './AuthStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''};
const Auth=()=>{
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const handleShowPassword:any = ()=>setShowPassword((prevShowPassword)=>!prevShowPassword);
    const history = useHistory();

    const switchMode=()=>{
        setIsSignUp((prevSignUp)=>!prevSignUp);
        setShowPassword(false);
    };

    const googleSucces= async (res:any)=>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        const data = {result, token};
        try {
            dispatch(AuthAction.LoginRequestSuccessAction(data));
            history.push('/');
        }catch (e) {
            console.log(e);
        }
    };
    const googleFailure=(error:any)=>{
        console.log('Google Sign In Unsuccessfully! Try again later!')
    };

    const handleSubmit=(e:any)=>{
        e.preventDefault();
            if(isSignUp)
            {
                if(formData.password===formData.confirmPassword)
                {
                dispatch(AuthServices.signup(formData, history));
                history.push('/');
                }else{

                }
            }else{
             //   console.log(props.userData);
                dispatch(AuthServices.login(formData, history));
            }
    };

    const handleChange=(e:any)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    return(
       <>
           <Grow in>
               <Container component="main" maxWidth="xs">
                   <Paper className={classes.paper} elevation={3}>
                       <Avatar className={classes.avatar}>
                           <LockOutlinedIcon/>
                       </Avatar>
                       <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                       <form className={classes.form} onSubmit={handleSubmit}>
                           <Grid container spacing={2}>
                               {
                                   isSignUp && (
                                       <>
                                           <Input fieldName="firstName"
                                                  label="First Name"
                                                  handleChange={handleChange}
                                                  autoFocus
                                                  half
                                           />

                                           <Input fieldName="lastName"
                                                  label="Last Name"
                                                  handleChange={handleChange}
                                                  half
                                           />
                                       </>
                                   )
                               }
                               <Input fieldName="email"
                                      label="Email"
                                      handleChange={handleChange}
                                      type="email"
                               />

                               <Input fieldName="password"
                                      label="Password"
                                      handleChange={handleChange}
                                      type={showPassword ? "text" : "password"}
                                      handleShowPassword={handleShowPassword}
                               />
                               {isSignUp &&
                               <Input
                                   fieldName="confirmPassword"
                                   label="Confirm Password"
                                   handleChange={handleChange}
                                   type="password"
                               />
                               }
                           </Grid>
                           <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                               {isSignUp ? 'Sign Up' : 'Sign In'}
                           </Button>

                           <GoogleLogin
                               clientId="35260579418-ufsihh0og14afhl465mot552ohgquqhp.apps.googleusercontent.com"
                               render={(renderProps)=>(
                                   <Button className={classes.googleButton} onClick={renderProps.onClick}  disabled={renderProps.disabled} startIcon={<Icon />} variant="contained" fullWidth color="secondary">
                                       Sign With Google
                                   </Button>
                               )}
                               onSuccess={googleSucces}
                               onFailure={googleFailure}
                               cookiePolicy="single_host_origin"
                           />

                           <Grid container justify="flex-end">
                               <Grid item>
                                   <Button onClick={switchMode}>
                                       {isSignUp ? 'Already have account? Sign In':'Create an account! Sign Up'}
                                   </Button>
                               </Grid>
                           </Grid>
                       </form>
                   </Paper>
               </Container>
           </Grow>
       </>
       
    )
};

export default Auth;