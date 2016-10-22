class Data {

	getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return null;
	}

	loadData() {
		var savedState = this.getCookie("state");
		if (savedState != null) return JSON.parse(savedState);
		else return false;
	}
}



export default Data