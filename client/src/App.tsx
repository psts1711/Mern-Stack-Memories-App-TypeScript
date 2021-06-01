import React from 'react';
import {Container} from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import CustomizedSnackbars from "./components/Alert/CustomSnackbar";
import {RootReducerState} from "./redux/reducers";
import {connect} from "react-redux";

interface Props {
    userData?: any
}

const App = (props:Props) => {
    const user = JSON.parse(localStorage.getItem('profile') as string)
    return(
        <Router>
            <Container maxWidth="xl">
                <Navbar/>
                {props?.userData?.toastAlert &&
                <CustomizedSnackbars userData={props?.userData}/>
                }
                    <Switch>
                        {/*<Route path="/" exact component={Home}/>*/}
                        <Route path="/" exact component={()=><Redirect to="/posts"/>}/>
                        <Route path="/posts" exact component={Home}/>
                        <Route path="/posts/search" exact component={Home}/>
                        <Route path="/posts/:id" exact component={PostDetails}/>

                        <Route path="/auth" exact component={()=>(!user?<Auth/> : <Redirect to="/posts"/>)}/>
                        <Route path="/snack" exact component={CustomizedSnackbars}/>
                    </Switch>
            </Container>
        </Router>

    );
};

const mapStateToProps = (state: RootReducerState) => ({
    userData: state.authReducer,
});
export default connect(mapStateToProps, null,)(App);
