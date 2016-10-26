/*Todo component*/
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Todo extends React.Component {
	//change todo status from finished to unfinished and vice versa
	changeTodoState() {
		this.props.dispatch({type: 'CHANGE_TODO_STATE', id: this.props.item.id });
		//add change to action history
		var description = this.props.item.text.concat((this.props.item.finished)?" - finished": " - not finished");
		this.props.dispatch({type: "ADD_HISTORY", text: "Change todo state", description: description });
	}
	//Delete todo from list
	deleteTodo() {
		this.props.dispatch({type: 'DELETE_TODO', id: this.props.item.id });
		//add deletion to action history
		this.props.dispatch({type: "ADD_HISTORY", text: "Delete todo", description: this.props.item.text});
	}
	render() {
		//set inline style for edit button
		var editButtonStype = {
			marginRight: '10px'
		}
		return (
			<li className="ui-state-default">
                <div className={this.props.finished}>
                    <label onClick={this.changeTodoState.bind(this)} >{this.props.item.text}</label>
                    <span className="todo-buttons pull-right">
                     	<Link to={window.base_url + '/todos/' + this.props.item.id}><button className="btn" style={editButtonStype}>Edit</button></Link>
                     	<button onClick={this.deleteTodo.bind(this)} className="btn">Delete</button>
                     </span>
                </div>
            </li>
		);
	}
}

export default connect()(Todo);