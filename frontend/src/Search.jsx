import { useEffect, useState } from "react";
import Dropdown from "./Dropdown"
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL || "";

export default function Search(){
    const [dataItems, setDataItems] = useState();
    const [state, setState] = useState("")
    const opsList = {
  "1": "Session List",
  "2": "Master List",
  "3": "Master List Raw",
  "4": "Bill",
  "5": "Bill Text",
  "6": "Amendment",
  "7": "Supplement",
  "8": "Roll Call",
  "9": "Person",
  "10": "Search",
  "11": "Search Raw",
  "12": "Dataset List",
  "13": "Dataset",
  "14": "Dataset Raw",
  "15": "Session People",
  "16": "Sponsored List",
  "17": "Monitor List",
  "18": "Monitor List Raw",
  "19": "Monitor"
}
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
    const getOpsList = async (newIncData)=> {
        console.log("Search.Callback.getState says: ", newIncData)
        const response = await axios.put(`${API_URL}/search/op/${newIncData}`, newIncData)
        .then((res)=> {console.log("Server response: ", res.data)})
        .catch((err)=>console.log("error updating getState data: ", err));
        console.log(response);
}
    return(
        <div  className="app">
            <div>
                <label>Search Type</label>
                <Dropdown func={getOpsList} dataset={opsList}/>
            </div>
            <div>
                <label>State</label>
                <Dropdown func={getState} dataset={statesList}/>
            </div>
            
        </div>
    )
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