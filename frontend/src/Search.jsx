import { useEffect, useState } from "react";
import Dropdown from "./Dropdown"
import axios from 'axios'
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
export default function Search(){
    
    const [dataItems, setDataItems] = useState();
    const [type, setType] = useState()
    const [state, setState] = useState("")
    const [sessionID, setSessionID] = useState("")
    const [operation, setOperation] = useState([])
    const [opsList, setOpsList] = useState([])

    useEffect(()=> {
        connect_to_API();
    }, []);
    

    async function connect_to_API() {
        const res = await fetch(`$api/legiscan`);
        console.log("connected")
        const data = await res.json();
        setOpsList(data)
}      


    async function getOperation(newIncData) {
        console.log("REACT getState says: ", newIncData)
        const response = await axios.put(`${API_URL}/dropdown/${newIncData}`, newIncData)
        .then((res)=> {console.log("Server response: ", res.data)})
        .catch((err)=>console.log("error updating getState data: ", err));
        setOperation(res)
}
    const ops_dropdown_handler = (e)=>{
        const user_choice = e.target.value; 
        setOperation(user_choice);
        console.log("Selected option:", operation);
}

    const getState = async (newIncData)=> {
        console.log("REACT getState says: ", newIncData)
        const response = await axios.put(`${API_URL}/state/${newIncData}`, newIncData)
        .then((res)=> {console.log("Server response: ", res.data)})
        .catch((err)=>console.log("error updating getState data: ", err));
        setState(res)
}

    const state_dropdown_handler = (e)=>{
        const user_choice = e.target.value; 
        setState(user_choice);
        console.log("Selected option:", selectedValue);
}

    async function submitToServer() {
        const res = await axios.put(`${API_URL}/api/legiscan/submit`, newIncData)
        .then((res)=> {console.log("Server response: ", res.data)})
        .catch((err)=>console.log("error updating getDropdown data: ", err));
    }


    return(
        <div>
            <form>
            
                <label>State </label>
                    <Dropdown func={getState} dataset={states}/>
                <label>Session ID </label>
                    <input> some data </input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )



const operations = [
"getSessionList",
"getMasterList", 
"getMasterListRaw", 
"getBill", 
"getBillText", 
"getAmendment",
"getSupplement",
"getRollCall", 
"getPerson", 
"getSearch", 
"getSearchRaw", 
"getDatasetList", 
"getDataset",
"getDatasetRaw",
"getSessionPeople", 
"getSponsoredList",
"getMonitorList", 
"getMonitorListRaw",
"setMonitor", 
]
}

