import React, {useState, useEffect} from "react";
import state_abbreviations from "./state_abbreviations"
import Menu from "./Menu.jsx"

export default function Dropdown(){
    const [stateData, setStateData] = useState([]);

    useEffect(() => {
        fetch('./state_abbreviations')
        .then((response)=>response.json())
        .then((jsonData)=>setStateData(jsonData))
        .catch((error)=>console.error("Error loading JSON"))
        console.log(stateData)
    }, []);

    function testprint(){
        console.log("props bro")
        console.log(stateData)
    }

    function dropdown_states(){
        stateData.map((abbreviation)=>{      
            console.log(abbreviation)
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
