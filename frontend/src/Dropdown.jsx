import React, {useState, useEffect} from "react";
const API_URL = import.meta.env.VITE_API_URL || "";
const states = {
  "Alabama": "AL",
  "Alaska": "AK",
  "Arizona": "AZ",
  "Arkansas": "AR",
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Delaware": "DE",
  "Florida": "FL",
  "Georgia": "GA",
  "Hawaii": "HI",
  "Idaho": "ID",
  "Illinois": "IL",
  "Indiana": "IN",
  "Iowa": "IA",
  "Kansas": "KS",
  "Kentucky": "KY",
  "Louisiana": "LA",
  "Maine": "ME",
  "Maryland": "MD",
  "Massachusetts": "MA",
  "Michigan": "MI",
  "Minnesota": "MN",
  "Mississippi": "MS",
  "Missouri": "MO",
  "Montana": "MT",
  "Nebraska": "NE",
  "Nevada": "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Ohio": "OH",
  "Oklahoma": "OK",
  "Oregon": "OR",
  "Pennsylvania": "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  "Tennessee": "TN",
  "Texas": "TX",
  "Utah": "UT",
  "Vermont": "VT",
  "Virginia": "VA",
  "Washington": "WA",
  "West Virginia": "WV",
  "Wisconsin": "WI",
  "Wyoming": "WY"
}

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
                <ul>
                    <li>
                        <select value={choice} onChange={dropdown_handler}>
                            <option>--</option>
                        {Object.entries(states).map(([key, value])=> (
                            <option key={key}>{value}</option>
                        ))}
                        </select>
                    </li>
                </ul>
            <button type="submit">submit</button>
            </form>
        </div>
    )
}
