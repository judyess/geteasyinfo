import { useEffect, useState } from "react";
import Dropdown from "./Dropdown"
import Menu from "./Menu"
import axios from 'axios'
// In local dev this is empty, so fetch("/api/...") stays relative and
// Vite's proxy (vite.config.js) forwards it to the Flask dev server.
// In production, set VITE_API_URL to your deployed backend's URL
// (e.g. https://your-backend.onrender.com) and requests go straight there.
const API_URL = import.meta.env.VITE_API_URL || "";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState("")
 
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    setLoading(true);
    const res = await fetch(`${API_URL}/api/todos`);
    const data = await res.json();
    setTodos(data);
    setLoading(false);
  }

  async function addTodo(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await fetch(`${API_URL}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos([newTodo, ...todos]);
    setText("");
  }

  async function toggleDone(todo) {
    const res = await fetch(`${API_URL}/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !todo.done }),
    });
    const updated = await res.json();
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  }

  async function removeTodo(id) {
    await fetch(`${API_URL}/api/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  }

  async function pressButton() {
    console.log("pressed")
    const res = await fetch(`${API_URL}/api/do`, { 
        method: "POST"});
    const data = await res.json();
    console.log(data.message);
  }

  // receives data
  const handle_dropdown = async (choice) =>{
    setOption(choice)
    try {
      const response = await fetch(`${API_URL}/api/dropdown`, { //removed a slash
        method: "POST",
        headers:{ "Content-Type" : "application/json" },
        body: JSON.stringify({option: choice}),
      });
      const result = await response.json();
      console.log('server response: ', result);
      console.log('server response: ', result.message);
      console.log("dropdown handled")
      console.log(choice)
    } catch (error) {
      console.log("error passing choice to server")
    }
  }
  const testfn = async(newIncData)=>{
        try {
            const response = await axios.put(`${API_URL}/api/dropdown`, newIncData)
            console.log('Update successful:', response.data);
        } catch(error) {
            console.log("error updating data: ", error)
        }
    }

    const getTest = async()=>{
      try {
            const response = await axios.get(`${API_URL}/api/dropdown`, newIncData)
            console.log('Update successful:', response.message);
        } catch(error) {
            console.log("error updating data: ", error)
        }
    }
  return (
  <div>
    <Menu />
    <Dropdown func={testfn}/>  {/* swapped with handle dropdown function*/}
    <div className="app">
      <h1>Todo List</h1>
      <form onSubmit={addTodo} className="add-form">
        <button onClick={pressButton}>Console Message</button>
        <button onClick={getTest}>getTest </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs doing?"
        />
        <button type="submit">Add</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : todos.length === 0 ? (
        <p className="empty">No todos yet — add one above.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.done ? "done" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={!!todo.done}
                  onChange={() => toggleDone(todo)}
                />
                {todo.text}
              </label>
              <button className="delete" onClick={() => removeTodo(todo.id)}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
  );
}
