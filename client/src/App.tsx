import React from 'react';
import {Container} from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import CustomizedSnackbars from "./components/Alert/CustomSnackbar";
import {RootReducerState} from "./redux/reducers";
import {connect} from "react-redux";

interface Props {
    userData?: any
}

const App = (props:Props) => {
    return(
        <Router>
            <Container maxWidth="lg">
                <Navbar/>

                {props?.userData?.toastAlert &&
                <CustomizedSnackbars userData={props?.userData}/>
                }

                    <Switch>
                       <Route path="/" exact component={Home}/>
                        <Route path="/auth" exact component={Auth}/>
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
