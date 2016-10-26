/*App component*/
import React from 'react';
import TodoList from './TodoList';

/*base component to render todo list*/
class App extends React.Component {
   render() {
      return (
      		<TodoList/>
        );
   }
}

export default App;