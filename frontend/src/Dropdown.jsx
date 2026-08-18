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
  

export default function Dropdown({func}){
    const [choice, setChoice] = useState("");

    const dropdown_handler = (e)=>{
        const selectedValue = e.target.value; 
        setChoice(selectedValue);
        console.log("Selected option:", selectedValue);
    }

    function send_back_to_caller(){
        console.log(choice);
        func(choice);
    }

    return(
        <div>
            <h1>Prop Header</h1>
            <form onSubmit={send_back_to_caller=((e)=>{e.preventDefault()})}>
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
