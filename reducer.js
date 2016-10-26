//Set initial state if no state is loaded
var initialState = {
	todos: [],
	history: []
}

//Reducer function for Redux
function reducer(state = initialState, action) {

	switch (action.type) {
		//Create new todo
		case 'CREATE_TODO':
			var newState =  {
				...state,
				todos: [
					...state.todos, { text: action.text, finished:false, id: Date.now() }
				]
			};
			return newState;
			break;
		//Chaneg todo state from finished to unfinished and vice versa
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
			return newState;
			break;
		//Delete todo
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
			return newState;
			break;
		//Update todo text
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
			return newState;
			break;
		//Add action history
		case 'ADD_HISTORY':
			var newState = {...state};
			newState.history = [...newState.history, {id: Date.now(), text: action.text, description: action.description }]
			return newState;
			break;
		//Clear action history
		case "CLEAR_HISTORY":
			var newState = {...state};
			newState.history = [];
			return newState;
			break;
		//Load initial state data
		case "LOAD_INITIAL_DATA":
			var newState = {...state};
			newState = action.data;
			return newState;
		//Default
		default:
			return state;
			break;
	}
}

export default reducer;