import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import NewTodo from './NewTodo';
import ActionHistoryList from './ActionHistoryList';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { Router, Route, browserHistory } from 'react-router';
import Data from './Data'
import DataMiddleware from './DataMiddleware'

let store =  createStore(reducer, applyMiddleware(DataMiddleware));
let data = new Data;
var savedData = data.loadData();
if (savedData != false) store.dispatch({type: "LOAD_INITIAL_DATA", data: savedData});
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