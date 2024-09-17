import { useState } from 'react'
import './App.css'

function App() {
  const [Todos, setTodos] = useState([]); 
  const [newTask, setNewTask] = useState(""); 
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTodos([...Todos, { text: newTask, completed: false }]); 
    setNewTask("");
  };

  const toggleComplete = (index) => {
    const updatedTodos = Todos.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTodos(updatedTodos); 
  };

  const deleteTask = (index) => {
    const updatedTodos = Todos.filter((_, i) => i !== index);
    setTodos(updatedTodos); 
  };
  const filteredTodos = Todos.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h1>#todo</h1>
      <div className="filters">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All</button>
        <button onClick={() => setFilter("active")} className={filter === "active" ? "active" : ""}>Active</button>
        <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>Completed</button>
      </div>

      < hr />
      <div className="input-container">
        <input type="text" placeholder="Add details" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {filteredTodos.map((task, index) => (
          <li key={index}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(index)} />
            <span className={task.completed ? "completed" : ""}>{task.text}</span>
            {filter === "completed" && (
              <button onClick={() => deleteTask(index)} className="delete-btn">
                Xóa
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
