import React, {useState, useEffect} from "react";
const API_URL = import.meta.env.VITE_API_URL || "";


/* expects a function, "func", and a dictionary, "dataset" */
export default function Dropdown(props){
    const [dataset, setDataset] = useState([props.dataset])
    const [choice, setChoice] = useState("");

    const dropdown_handler = (e)=>{
        const selectedValue = e.target.value; 
        setChoice(selectedValue);
        console.log("Selected option:", selectedValue);
    }

    function send_back_to_caller(e){
        e.preventDefault();
        console.log(choice);
        if (choice != ""){
            props.func(choice);
        }
        else{
            console.log("no dropdown data")
        }
    }

    return(
        <div>
            <form onSubmit={(e) => send_back_to_caller(e)}>
            <select value={choice} onChange={dropdown_handler}>
                <ul>
                    <li><option>--</option>
                    </li>
                    <li>
                    {Object.entries(states).map(([key, value])=> (
                        <option key={key}>{value}</option>
                    ))}
                    </li>
                </ul>
                </select>
            <button type="submit">submit</button>
            </form>
        </div>
    )
}
