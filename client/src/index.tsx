import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import  Store from "../src/redux/reducers"
import './index.css';

ReactDOM.render(
    <Provider store={Store}>
        <App/>
    </Provider>
, document.getElementById('root'));