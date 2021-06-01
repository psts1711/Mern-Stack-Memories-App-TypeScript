import React, {useEffect, useState} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom'
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";

import useStyles from "./NavbarStyles";
import Avatar from "@material-ui/core/Avatar";
import {useDispatch} from "react-redux";
import {AuthServices} from "../../services/AuthServices";
import jwtDecode from "jwt-decode";



const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile') as string));

    useEffect(() => {
        const token = user?.token;
        if(token){
            const decodedToken:any = jwtDecode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()){
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile') as string))
    }, [location]);

    const logout=()=>{
        dispatch(AuthServices.logout());
        setUser(null);
        history.push('/');
    };
    return(
        <>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Link to="/" className={classes.brandContainer}>
                 {/*   <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>*/}
                    <img className={classes.image} src={memoriesLogo} alt="icon" height="60" />
                    <img className={classes.image} src={memoriesText} alt="icon" height="40px" />
                </Link>
                <Toolbar className={classes.toolbar}>
                    {user?.result ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
};

export default Navbar;