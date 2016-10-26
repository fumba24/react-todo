/*ActionHistoryList component*/
import React from 'react';
import ActionHistory from './ActionHistory'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

class ActionHistoryList extends React.Component {
	//Retrun to base url
	goBack() {
		this.props.router.push(window.base_url + '/');
	}
	//Clear history
	clearHistory() {
		this.props.dispatch({type: "CLEAR_HISTORY"});
	}
	render() {
		//create array of ActionHistory components from array of Action history
		var actionComponent = this.props.historyList.map(function(action)  {
			return <ActionHistory key={action.id} action={action}/>
		});
		//Inline style for clear button
		var clearButtonStype = {
			marginRight: '10px'
		}
		return (
			<div>
				<h1>History</h1>
				<hr/>
                <ul id="sortable" className="list-unstyled">
                	<table className="table">
	                	<thead>
		                	<tr>
		                	<th>Action</th>
		                	<th>description</th>
		                	<th>Date</th>
		                	</tr>
		                </thead>
		                <tbody>
							{actionComponent}
						</tbody>	
					</table>
	            </ul>
	            <div className="todo-footer history-footer">
		            <strong><span className="count-todos"></span></strong> History count: {actionComponent.length}
		            <span className="pull-right">
		            	<button className="btn btn-success" onClick={this.clearHistory.bind(this)} style={clearButtonStype}>Clear history</button>
		            	<button className="btn btn-success" onClick={this.goBack.bind(this)}>Back</button>
		            </span>
		        </div>
	            
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		todos: state,
		historyList: state.history
	}
}

export default connect(mapStateToProps)(withRouter(ActionHistoryList));