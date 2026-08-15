import React, {useState, useEffect} from "react";
import state_abbreviations from "./state_abbreviations"
import Menu from "./Menu.jsx"

export default function Dropdown(){
    const [stateData, setStateData] = useState([]);

    useEffect(() => {
        fetch('./db.json')
        .then((response)=>response.json())
        .then((jsonData)=>setStateData(jsonData))
        .catch((error)=>console.error("Error loading JSON"))
    }, []);

    function reset(){
        setServerData([]);
    }
    function testprint(){
        console.log("props bro")
        console.log(state_abbreviations[0])
    }

    function dropdown_states(){
        stateData.map((abbreviation)=>{
            return(       
                <li>
                    <option value="" onChange={testprint}>Choose State</option>
                </li>
            )
        })
    }
    
    return(
        <div>
            <Menu />
            <h1>Prop Header</h1>
            <select>
                <ul>
                    {dropdown_states}
                </ul>
                </select>
            <button onClick={testprint}>submit</button>
        </div>
    )
}
