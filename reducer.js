var initialState = {
	todos: [],
	history: []
}

function reducer(state = initialState, action) {

	switch (action.type) {
		case 'CREATE_TODO':
			var newState =  {
				...state,
				todos: [
					...state.todos, { text: action.text, finished:false, id: Date.now() }
				]
			};
			//setCookie("state", JSON.stringify(newState), 10);
			return newState;
			break;
		case 'CHANGE_TODO_STATE':
			var newState = {
				...state,
				todos: [
					...state.todos
				]
			};
			newState.todos.forEach(function(todo) {
				if (todo.id == action.id) todo.finished = !todo.finished;
			});
			//setCookie("state", JSON.stringify(newState), 10);
			return newState;
			break;
		case 'DELETE_TODO':
			var newState = {
				...state,
				todos: [
					...state.todos
				]
			};
			for (var i=0; i<newState.todos.length; i++) {
				if (newState.todos[i].id == action.id) {
					newState.todos.splice(i, 1);
				}
			}
			//setCookie("state", JSON.stringify(newState), 10);
			return newState;
			break;
		case 'SAVE_TODO':
			var newState = {
				...state,
				todos: [
					...state.todos
				]
			};
			newState.todos.forEach(function(todo) {
				if (todo.id == action.id) todo.text = action.text;
			});
			//setCookie("state", JSON.stringify(newState), 10);
			return newState;
			break;
		case 'ADD_HISTORY':
			var newState = {...state};
			newState.history = [...newState.history, {id: Date.now(), text: action.text, description: action.description }]
			//setCookie("state", JSON.stringify(newState), 10);
			return newState;
			break;
		case "CLEAR_HISTORY":
			var newState = {...state};
			newState.history = [];
			//setCookie("state", JSON.stringify(newState), 10);
			return newState;
			break;
		case "LOAD_INITIAL_DATA":
			var newState = {...state};
			newState = action.data;
			return newState;
		default:
			return state;
			break;
	}
}

export default reducer;