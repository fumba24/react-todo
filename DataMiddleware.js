const DataMiddleware  = store => next => action => {
	let result = next(action)
	if (action.type != "LOAD_INITIAL_DATA") {
		setCookie("state", JSON.stringify(store.getState()), 10);
	}
	return result
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default DataMiddleware