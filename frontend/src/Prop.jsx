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
        
    }
    
    return(
        <div className="app">
            <button onClick={testprint}>submit</button>

        </div>
    )
}

//export default Prop;