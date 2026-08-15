import React, {useState, useEffect} from "react";
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
        return(<div>
            <select id="options" value="hi"></select>
        </div>)
    }
    
    return(
        <div>
            <h1>Prop Header</h1>
            <select id="options" value="hi">
                <option value="apples">apples</option>
                <option value="crapples">crapples</option>
            </select>
            <button onClick={testprint}>submit</button>
        </div>
    )
}
