import { useEffect, useState } from "react";
import Dropdown from "./Dropdown"
import axios from 'axios'
// In local dev this is empty, so fetch("/api/...") stays relative and
// Vite's proxy (vite.config.js) forwards it to the Flask dev server.
// In production, set VITE_API_URL to your deployed backend's URL
// (e.g. https://your-backend.onrender.com) and requests go straight there.
const API_URL = import.meta.env.VITE_API_URL || "";


export default function App() {
  const [dataItems, setDataItems] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState("")
 
  useEffect(() => {
    fetchServer();
  }, []);

  async function fetchServer() {
    setLoading(true);
    const res = await fetch(`${API_URL}/api/gei`);
    const data = await res.json();
    setDataItems(data);
    setLoading(false);
}

  async function addItem(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await fetch(`${API_URL}/api/gei`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newItem = await res.json();
    setDataItems([newItem, ...dataItems]);
    setText("");
}

  async function toggleDone(item) {
    const res = await fetch(`${API_URL}/api/gei/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !item.done }),
    });
    const updated = await res.json();
    setDataItems(dataItems.map((t) => (t.id === updated.id ? updated : t)));
}

  async function remove_item(id) {
    await fetch(`${API_URL}/api/gei/${id}`, { method: "DELETE" });
    setDataItems(dataItems.filter((t) => t.id !== id));
}

  const fromServer = async()=>{
    try {
          const response = await axios.get(`${API_URL}/msg`)
          console.log('Handshake Successful:', response.data);
      } catch(error) {
          console.log("failed to get response: ", error)
      }
}
      // receives data from child fine, receives server response fine ^_^
  const getDropdown = async(newIncData)=>{
    console.log("REACT getDropdown says: ", newIncData)
    const response = await axios.put(`${API_URL}/dropdown/${newIncData}`, newIncData)
    .then((res)=> {console.log("Server response: ", res.data)})
    .catch((err)=>console.log("error updating getDropdown data: ", err));
} 

  return (
  <div>
    <Dropdown func={getDropdown} dataset={testList}/>
    <div className="app">
      <h1>Search</h1>
      <form onSubmit={addItem} className="add-form">
        <button onClick={fromServer}>Say Hi</button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs doing?"
        />
        <button type="submit">Add</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : dataItems.length === 0 ? (
        <p className="empty">No dataItems yet — add one above.</p>
      ) : (
        <ul className="item-list">
          {dataItems.map((item) => (
            <li key={item.id} className={item.done ? "done" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={!!item.done}
                  onChange={() => toggleDone(item)}
                />
                {item.text}
              </label>
              <button className="delete" onClick={() => remove_item(item.id)}>
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

