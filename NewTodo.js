/*NewTodo component*/
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

class NewTodo extends React.Component {
	//Set initial todo if not exist
	constructor() {
		super();
		this.todo = {text: "", id: -1, finished: false};
	}
	//Check if component is for new todo or updating todo text
	//and change button and input value accordingly
	componentWillMount() {
		this.currentPath = this.props.location.pathname;
		if (this.currentPath.indexOf('new') >= 0) {
			this.button_label = "Add todo";
		} else {
			const todoId = parseInt(this.currentPath.substring(this.currentPath.indexOf('todos/') + 6));
			this.button_label = "Save";
			//Try to get current todo for editing
			var currentTodo = null;
			this.props.todos.forEach(function(todo) {
				if (todo.id == todoId) {
					currentTodo = todo;
				}
			});
			//If current todo not found return to base url
			if (currentTodo == null) this.props.router.push(window.base_url + '/');
			else this.todo = currentTodo;
		}
	}
	//Run button accroding to action type
	executeButton() {
		if (this.currentPath.indexOf('new') >= 0) {
			this.addTodo();
		} else {
			this.saveTodo();
		}
	}
	//Update todo text
	saveTodo() {
		const todo = {...this.todo, text: this.refs.addTodo.value};
		this.props.dispatch({type: "SAVE_TODO", text: todo.text, id: todo.id});
		//Add update to action history
		this.props.dispatch({type: "ADD_HISTORY", text: "Update Todo text", description: todo.text});
		this.props.router.push(window.base_url + '/');
	}
	//Add new todo
	addTodo() {
		const todo = {...this.todo, text: this.refs.addTodo.value};
		this.props.dispatch({type: "CREATE_TODO", text: todo.text});
		//Add addition to action history
		this.props.dispatch({type: "ADD_HISTORY", text: "Add Todo", description: todo.text});
		this.props.router.push(window.base_url + '/');
	}
	//Execute button if ENTER is pressed in input
	onKeyPressInput(e) {
		if (e.key === 'Enter') this.executeButton();
	}
	//Go back to base url
	goBack() {
		this.props.router.push(window.base_url + '/');
	}
	render() {
		return (
			<div className="new-todo">
				<input ref="addTodo" type="text" defaultValue={this.todo.text} onKeyDown={this.onKeyPressInput.bind(this)} className="form-control add-todo" autoFocus placeholder="Add todo"/>
		        <span>
		        	<button id="checkAll" className="btn btn-success pull-left" onClick={this.executeButton.bind(this)}>{this.button_label}</button>
					<button className="btn btn-success pull-right" onClick={this.goBack.bind(this)}>Back</button>
		        </span>
	        </div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		todos: state.todos
	}
}

export default connect(mapStateToProps)(withRouter(NewTodo));