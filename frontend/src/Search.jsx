
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown"
import axios from 'axios'

const LEGISCAN_API = import.meta.env.LEGISCAN_API_URL || "";
API_KEY = import.meta.env.LEGISCAN_API_KEY || "";

export default function Search(){
    const [dataItems, setDataItems] = useState();
    const [type, setType] = useState()
    const [state, setState] = useState("")


    useEffect(()=> {
        connect_to_API();
    }, []);

    async function connect_to_API() {
        const res = await fetch(`${LEGISCAN_API}/search`);
        console.log("connected")
}       

    const dropdown_handler = (e)=>{
        const selectedValue = e.target.value; 
        setChoice(selectedValue);
        console.log("Selected option:", selectedValue);
}

    const getState = async (newIncData)=> {
        console.log("REACT getState says: ", newIncData)
        const response = await axios.put(`${API_URL}/dropdown/${newIncData}`, newIncData)
        .then((res)=> {console.log("Server response: ", res.data)})
        .catch((err)=>console.log("error updating getState data: ", err));
}
    async function getSessionList(state) {
    const res = await fetch(`${API_URL}/api/legiscan?op=getSessionList&state=${state}`);
    return res.json();
}

    async function getMasterList(sessionId) {
    const res = await fetch(`${API_URL}/api/legiscan?op=getMasterList&id=${sessionId}`);
    return res.json();
}   


    return(
        <div>
            <label>State </label>
                <Dropdown func={getState} dataset={states}/>
            <label>Session ID </label>
                <input> some data </input>
        </div>
    )
}

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