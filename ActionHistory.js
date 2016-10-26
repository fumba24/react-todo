/*ActionHistory component*/
import React from 'react'

//update Date function to add rendering from timestamp to dd/mm/yyyy
Date.prototype.ddmmyyyy = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();
  var hh = this.getHours();
  var min = this.getMinutes();
  var ss = this.getSeconds();
  var mmString = (mm<10)? '0' + mm.toString():mm;
  var ddString = (dd<10)? '0' + dd.toString():dd;
  var hhString = (hh<10)? '0' + hh.toString():hh;
  var minString = (min<10)? '0' + min.toString():min;
  var ssString = (ss<10)? '0' + ss.toString():ss;
  var time = [hhString, minString, ssString].join(':');

  return [ddString,mmString,this.getFullYear()].join('/') + " " + time; // padding
};

class ActionHistory extends React.Component {

	render() {
		var t = new Date(this.props.action.id);
		var formatted = t.ddmmyyyy();
		return (
			<tr>
				<td>{this.props.action.text}</td>
				<td>{this.props.action.description}</td>
				<td>{formatted}</td>
			</tr>
		);
	}
}


export default ActionHistory;