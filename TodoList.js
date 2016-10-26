/*TodoList component*/
import React from "react";
import Todo from './Todo';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class TodoList extends React.Component {
	render() {
		//create array of Todo components from array of todos
		//and calculate how many todos are left
		var todoComponents;
		var todoLeft = 0;
		if (this.props.todos != undefined) {
			todoComponents = this.props.todos.todos.map(function(todo) {
				//Set css class if todo is finished
				var finished = (todo.finished)? "checked" : "";
				//count unfinished todos
				if (!todo.finished) todoLeft++;
				return <Todo finished={finished} key={todo.id} item={todo}/>
			});
		} else todoComponents = "";

		return (
			<div>
		        <h1>Todos</h1>
		        	<span>
		        	<Link to={window.base_url + "/new"}>New Todo</Link>
		        	<Link  className="pull-right" to={window.base_url + "/history"}>Action history</Link></span>         
	                <hr/>
	                <ul id="sortable" className="list-unstyled">
		            	{todoComponents}    
		            </ul>
		        <div className="todo-footer">
		            <strong><span className="count-todos"></span></strong> Items Left to do: {todoLeft}
		        </div>
	        </div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		todos: state
	}
}

export default connect(mapStateToProps)(TodoList);