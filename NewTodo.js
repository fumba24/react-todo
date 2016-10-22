import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

class NewTodo extends React.Component {
	constructor() {
		super();
		this.todo = {text: "", id: -1, finished: false};
	}
	componentWillMount() {
		this.currentPath = this.props.location.pathname;
		if (this.currentPath.indexOf('new') >= 0) {
			this.button_label = "Add todo";
		} else {
			const todoId = parseInt(this.currentPath.substring(this.currentPath.indexOf('todos/') + 6));
			this.button_label = "Save";
			var currentTodo = null;
			this.props.todos.forEach(function(todo) {
				if (todo.id == todoId) {
					currentTodo = todo;
				}
			});
			if (currentTodo == null) this.props.router.push(window.base_url + '/');
			else this.todo = currentTodo;
		}
	}
	executeButton() {
		if (this.currentPath.indexOf('new') >= 0) {
			this.addTodo();
		} else {
			this.saveTodo();
		}
	}
	saveTodo() {
		const todo = {...this.todo, text: this.refs.addTodo.value};
		this.props.dispatch({type: "SAVE_TODO", text: todo.text, id: todo.id});
		this.props.dispatch({type: "ADD_HISTORY", text: "Update Todo text", description: todo.text});
		this.props.router.push(window.base_url + '/');
	}
	addTodo() {
		const todo = {...this.todo, text: this.refs.addTodo.value};
		this.props.dispatch({type: "CREATE_TODO", text: todo.text});
		this.props.dispatch({type: "ADD_HISTORY", text: "Add Todo", description: todo.text});
		this.props.router.push(window.base_url + '/');
	}
	onKeyPressInput(e) {
		if (e.key === 'Enter') this.executeButton();
	}
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