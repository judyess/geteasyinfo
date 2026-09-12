import React, {useState, useEffect} from "react";
const API_URL = import.meta.env.VITE_API_URL || "";

/* expects a function, "func", and a dictionary, "dataset" */
export default function Dropdown(props){
    const [dataset, setDataset] = useState(props.dataset)
    const [choice, setChoice] = useState("");

    const dropdown_handler = (e)=>{
        const selectedValue = e.target.value; 
        setChoice(selectedValue);
        console.log("Selected option:", selectedValue);
        props.func(selectedValue);
    }

    return(
        <div>
                        <select value={choice} onChange={dropdown_handler}>
                            <option>--</option>
                        {Object.entries(dataset).map(([key, value])=> (
                            <option key={key} value={key}>{value}</option>
                        ))}
                        </select>
        </div>
    )
}
