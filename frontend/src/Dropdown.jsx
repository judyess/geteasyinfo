import React, {useState, useEffect} from "react";
import Menu from "./Menu.jsx"

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

export default function Dropdown(){
    const [stateData, setStateData] = useState(states);
    const [choice, setChoice] = useState("");

    function testprint(){
        console.log("props bro")
        console.log(stateData)
        console.log(choice)
    }

    
    return(
        <div>
            <Menu />
            <h1>Prop Header</h1>
            <select value={choice} onChange={(e)=>setChoice(e.target.value)}>
                <ul>
                    <li>
                    {Object.entries(states).map(([key, value])=> (
                        <option key={key}>{value}</option>
                    ))}
                    </li>
                </ul>
                </select>
            <button onClick={testprint}>submit</button>
        </div>
    )
}
