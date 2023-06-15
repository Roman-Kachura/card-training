import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./app/store";
import { App } from './app/App';

ReactDOM.render(
        <HashRouter>
            <Provider store={store}>
            <App/>
            </Provider>
        </HashRouter>,
    document.getElementById('root')
);

reportWebVitals();
