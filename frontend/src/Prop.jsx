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
        abbreviations.map((abbreviation)=>{
            return(
                <div>
                <select id="options" key={abbreviation}>
                    <option value={abbreviation}>{abbreviation}</option>
                </select></div>
            )
        })
        return(<div>
            
        </div>)
    }
    
    return(
        <div>
            <Menu />
            <h1>Prop Header</h1>
            <select id="options" value="hi">
                <option value="apples">apples</option>
                <option value="crapples">crapples</option>
            </select>
            <button onClick={testprint}>submit</button>
        </div>
    )
}
