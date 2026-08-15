import React, {useState, useEffect} from "react";
import state_abbreviations from "./state_abbreviations"
import Menu from "./Menu.jsx"

export default function Prop(){
    const [serverData, setServerData] = useState([]);

    useEffect(() => {
        console.log("Prop props loaded")
    }, []);

    function reset(){
        setServerData([]);
    }
    function testprint(){
        console.log("props bro")
    }

    function dropdown_states(){
        state_abbreviations.map((abbreviation)=>{
            return(       
                <li>
                    <option value={abbreviation} onChange={testprint}>{abbreviation}</option>
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
