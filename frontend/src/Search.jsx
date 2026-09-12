import { useEffect, useState } from "react";
import Dropdown from "./Dropdown"
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL || "";

export default function Search(){
    const [params, setParams] = useState({});
    const [state, setState] = useState("NC")
    const [op, setOp] = useState("getSessionList")
    const [objID, setObjID] = useState("")

    const opsList = {
  "getSessionList": "Session List",
  "getMasterList": "Master List",
  "getMasterListRaw": "Master List Raw",
  "getBill": "Bill",
  "getBillText": "Bill Text",
  "getAmendment": "Amendment",
  "getSupplement": "Supplement",
  "getRollCall": "Roll Call",
  "getPerson": "Person",
  "getSearch": "Search",
  "getSearchRaw": "Search Raw",
  "getDatasetList": "Dataset List",
  "getDataset": "Dataset",
  "getDatasetRaw": "Dataset Raw",
  "getSessionPeople": "Session People",
  "getSponsoredList": "Sponsored List",
  "getMonitorList": "Monitor List",
  "getMonitorListRaw": "Monitor List Raw",
  "setMonitor": "Monitor"
}

    const statesList = {
  "AL": "Alabama",
  "AK": "Alaska",
  "AZ": "Arizona",
  "AR": "Arkansas",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DE": "Delaware",
  "FL": "Florida",
  "GA": "Georgia",
  "HI": "Hawaii",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "IA": "Iowa",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "ME": "Maine",
  "MD": "Maryland",
  "MA": "Massachusetts",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MS": "Mississippi",
  "MO": "Missouri",
  "MT": "Montana",
  "NE": "Nebraska",
  "NV": "Nevada",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NY": "New York",
  "NC": "North Carolina",
  "ND": "North Dakota",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PA": "Pennsylvania",
  "RI": "Rhode Island",
  "SC": "South Carolina",
  "SD": "South Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VT": "Vermont",
  "VA": "Virginia",
  "WA": "Washington",
  "WV": "West Virginia",
  "WI": "Wisconsin",
  "WY": "Wyoming"
}
   
    const getState = async (newIncData)=> {
        console.log("dropdown onchange triggered")
        console.log(newIncData);
        setState(newIncData)
        console.log("Search.Callback.getState says: ", newIncData)
}
    const getOpsList = async (newIncData)=> {
        console.log("dropdown onchange triggered")
        console.log(newIncData);
        setOp(newIncData)
        console.log("Search.Callback.getState says: ", newIncData)
}

    const submitSearch = async (e, op, state)=> {
        e.preventDefault();
        console.log("op: ", op)
        console.log("state: ", state)
        const response = await axios.put(`${API_URL}/api/legiscan/search`, 
            {op: op,
            state: state}
        )
        .then((res) => {console.log("Legiscan Server Response: ", res.data)})
        .catch((err)=> console.log("error searching Legiscan: ", err))
        console.log(response);
    };
    return(
        <div><div className="row">
        <div  className="app">
            <form onSubmit={(e)=>submitSearch(e, op, state)} >
            <div>
                <label>Search Type</label>
                <Dropdown func={getOpsList} dataset={opsList} />
            </div>
            <div>
                <label>State</label>
                <Dropdown func={getState} dataset={statesList}/>
            </div> 
            <button type="submit">Query</button>
            </form>
        </div>
        
            <div className="box">Results</div>
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