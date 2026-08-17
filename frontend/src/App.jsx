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

  async function serverMsg() {
    console.log("axios pressed")
    //const res = await axios.post(`${API_URL}/do`);
    const res = await fetch(`${API_URL}/msg`)
    const data = await res.json();
    console.log(data.message);
}
  // receives data from child fine, receives server response fine ^_^
  const dropdown = async(newIncData)=>{
    console.log("REACT dropdown says: ", newIncData)
    const response = await axios.put(`${API_URL}/dropdown/${newIncData}`, newIncData)
    .then((res)=> {setOption(res.data); console.log("Option set with: ", res.data)})
    .catch((err)=>console.log("error updating dropdown data: ", err));
} 

  const getTest = async()=>{
    try {
          const response = await axios.get(`${API_URL}/get`)
          console.log('Test Update successful:', response.data);
      } catch(error) {
          console.log("error updating getTest data: ", error)
      }
}
  const getOption = async() => {
    console.log(option)
}

  return (
  <div>
    <Menu />
    <Dropdown func={dropdown}/>  {/* swapped with handle dropdown function*/}
    <div className="app">
      <button onClick={getOption} >option</button>
      <h1>Todo List</h1>
      <form onSubmit={addTodo} className="add-form">
        <button onClick={serverMsg}>serverMsg</button>
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