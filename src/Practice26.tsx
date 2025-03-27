import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  // Declare state for storing the user's name
  const [name, setName] = useState<string>("");

  // Retrieve the name from localStorage when the component mounts
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setName(storedName); // Set the name from localStorage if it exists
    }
  }, []);

  // Function to handle saving the name to localStorage
  const saveNameToLocalStorage = () => {
    if (name) {
      localStorage.setItem("userName", name); // Save the name to localStorage
      alert(`Name "${name}" saved to localStorage!`);
    }
  };

  return (
    <div>
      <h1>React LocalStorage Example</h1>
      <div>
        <label htmlFor="name">Enter your name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update state on input change
        />
      </div>
      <button onClick={saveNameToLocalStorage}>Save Name</button>
      <p>Stored Name: {name}</p>
    </div>
  );
};

export default App;




// import React, { useState, useEffect } from "react";
// import axios from "axios";

// type Todo = {
//   id: number;
//   task: string;
//   completed: boolean;
// };

// const API_URL = "http://localhost:8080/todoList"; // Your backend URL

// const TodoApp = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [newTodo, setNewTodo] = useState<string>("");
//   const [editTodoId, setEditTodoId] = useState<number | null>(null);
//   const [updatedTask, setUpdatedTask] = useState<string>("");

//   // Fetch data from backend
//   useEffect(() => {
//     axios.get(`${API_URL}/tasks`)
//       .then(response => setTodos(response.data))
//       .catch(error => console.error("Error fetching tasks:", error));
//   }, []);

//   const addTodo = () => {
//     if (newTodo.trim()) {
//       axios.post(`${API_URL}/addTask`, { task: newTodo, completed: false })
//         .then(response => {
//           setTodos([...todos, response.data]); // Update state
//           setNewTodo("");
//         })
//         .catch(error => console.error("Error adding task:", error));
//     }
//   };

//   const deleteTodo = (id: number) => {
//     axios.delete(`${API_URL}/delete?id=${id}`)
//       .then(() => {
//         setTodos(todos.filter(todo => todo.id !== id));
//       })
//       .catch(error => console.error("Error deleting task:", error));
//   };

//   const updateTodo = (id: number) => {
//     if (updatedTask.trim()) {
//       axios.put(`${API_URL}/update?id=${id}`, { task: updatedTask })
//         .then(response => {
//           setTodos(todos.map(todo => todo.id === id ? response.data : todo));
//           setUpdatedTask("");
//           setEditTodoId(null);
//         })
//         .catch(error => console.error("Error updating task:", error));
//     }
//   };

//   const toggleComplete = (id: number) => {
//     const todo = todos.find(t => t.id === id);
//     if (todo) {
//       axios.put(`${API_URL}/update?id=${id}`, { ...todo, completed: !todo.completed })
//         .then(response => {
//           setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
//         })
//         .catch(error => console.error("Error updating task:", error));
//     }
//   };

//   return (
//     <div>
//       <h2>To-Do List</h2>
//       <input
//         type="text"
//         value={newTodo}
//         onChange={(e) => setNewTodo(e.target.value)}
//         placeholder="Enter a new task"
//       />
//       <button onClick={addTodo}>Add Todo</button>

//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             {editTodoId === todo.id ? (
//               <>
//                 <input
//                   type="text"
//                   value={updatedTask}
//                   onChange={(e) => setUpdatedTask(e.target.value)}
//                   placeholder="Edit task"
//                 />
//                 <button onClick={() => updateTodo(todo.id)}>Update</button>
//                 <button onClick={() => setEditTodoId(null)}>Cancel</button>
//               </>
//             ) : (
//               <>
//                 <span>{todo.task} - {todo.completed ? "Completed" : "Not Completed"}</span>
//                 <button onClick={() => toggleComplete(todo.id)}>
//                   {todo.completed ? "Mark as Not Completed" : "Mark as Completed"}
//                 </button>
//                 <button onClick={() => setEditTodoId(todo.id)}>Edit</button>
//                 <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoApp;
