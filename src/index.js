import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import {createStore, compose, applyMiddleware, combineReducers} from "redux";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import {BrowserRouter} from "react-router-dom";
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true, traceLimit: 40}) || compose;
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
    );

const app = (
    <Provider store={store}>
        <BrowserRouter><App/></BrowserRouter>
    </Provider>
);

ReactDOM.render(
  app, document.getElementById('root')
);
