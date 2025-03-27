import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/todoList"; // Backend URL

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

type TodoAppProps = {
  showAlert: (message: string) => void; // Alert function prop
};

const TodoApp: React.FC<TodoAppProps> = ({ showAlert }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [updatedTask, setUpdatedTask] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${API_URL}/tasks`)
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTask = { id: 0, task: newTodo, completed: false };
      axios
        .post(`${API_URL}/addTask`, newTask)
        .then((response) => {
          setTodos([...todos, response.data]);
          setNewTodo("");
          showAlert("Task added successfully!"); // Alert after adding task
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  const deleteTodo = (id: number) => {
    axios
      .delete(`${API_URL}/delete?id=${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        showAlert("Task deleted successfully!"); // Alert after deleting task
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const updateTodo = (id: number) => {
    if (updatedTask.trim()) {
      const updatedTodo = { id, task: updatedTask, completed: false };
      axios
        .put(`${API_URL}/update?id=${id}`, updatedTodo)
        .then((response) => {
          setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
          setUpdatedTask("");
          setEditTodoId(null);
          showAlert("Task updated successfully!"); // Alert after updating task
        })
        .catch((error) => console.error("Error updating task:", error));
    }
  };

  const toggleComplete = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      axios
        .put(`${API_URL}/update?id=${id}`, updatedTodo)
        .then((response) => {
          setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
        })
        .catch((error) => console.error("Error updating task:", error));
    }
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={updatedTask}
                  onChange={(e) => setUpdatedTask(e.target.value)}
                  placeholder="Edit task"
                />
                <button onClick={() => updateTodo(todo.id)}>Update</button>
                <button onClick={() => setEditTodoId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>
                  {todo.task} - {todo.completed ? "Completed" : "Not Completed"}
                </span>
                <button onClick={() => toggleComplete(todo.id)}>
                  {todo.completed ? "Mark as Not Completed" : "Mark as Completed"}
                </button>
                <button onClick={() => setEditTodoId(todo.id)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
