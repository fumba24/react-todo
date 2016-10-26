/*Main entry point for react*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NewTodo from './NewTodo';
import ActionHistoryList from './ActionHistoryList';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { Router, Route, browserHistory } from 'react-router';
import Data from './Data'
import DataMiddleware from './DataMiddleware'

//Load store from reducers and middlewares
let store =  createStore(reducer, applyMiddleware(DataMiddleware));
//load initial Data
let data = new Data;
var savedData = data.loadData();
//Dispatch initial data
if (savedData != false) store.dispatch({type: "LOAD_INITIAL_DATA", data: savedData});

//Render React
ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path={window.base_url + "/"} component={App}/>
			<Route path={window.base_url + "/new"} component={NewTodo}/>
			<route path={window.base_url + "/todos/:id"} component={NewTodo}/>
			<Route path={window.base_url + "/history"} component={ActionHistoryList}/>
		</Router>
	</Provider>
, document.getElementById('app'));