import { useEffect, useState } from "react";
import Dropdown from "./Dropdown"
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL || "";

export default function Search(){
    const [dataItems, setDataItems] = useState();
    const [state, setState] = useState("")

    const statesList = {
  "Alabama": "ALabama",
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

const opsList = {
  "1": "getSessionList",
  "2": "getMasterList",
  "3": "getMasterListRaw",
  "4": "getBill",
  "5": "getBillText",
  "6": "getAmendment",
  "7": "getSupplement",
  "8": "getRollCall",
  "9": "getPerson",
  "10": "getSearch",
  "11": "getSearchRaw",
  "12": "getDatasetList",
  "13": "getDataset",
  "14": "getDatasetRaw",
  "15": "getSessionPeople",
  "16": "getSponsoredList",
  "17": "getMonitorList",
  "18": "getMonitorListRaw",
  "19": "setMonitor"
}

    useEffect(()=> {
        connect_to_API();
    }, []);

    async function connect_to_API() {
        const res = await fetch(`$api/legiscan`);
        console.log("connected")
        const data = await res.json();
}      

    const getState = async (newIncData)=> {
        console.log("Search.Callback.getState says: ", newIncData)
        const response = await axios.put(`${API_URL}/search/state/${newIncData}`, newIncData)
        .then((res)=> {console.log("Server response: ", res.data)})
        .catch((err)=>console.log("error updating getState data: ", err));
        console.log(response);
}

    return(
        <div>
            <div className="app">
                <label>State </label>
                <Dropdown func={getState} dataset={statesList}/>
            </div>
            <div className="app">
                <label>State </label>
                <Dropdown func={getState} dataset={opsList}/>
            </div>
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

/*
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
*/