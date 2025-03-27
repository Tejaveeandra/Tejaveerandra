import React from 'react';
import Todo from './Todo';
import TodoApp from './Todo';

const App = () => {
   
  const showAlert = (message: string) => {
    alert(message);
  };

  return (
    <div>
      <h1>To-Do List Application</h1>
      <TodoApp showAlert={showAlert} />
    </div>
  );
};

export default App;
