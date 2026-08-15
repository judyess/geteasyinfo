import React, {useState, useEffect} from "react";
export default function Prop(){
    const [serverData, setServerData] = useState([]);

    useEffect(() => {
        print("Prop props loaded")
    }, []);

    function reset(){
        setServerData([]);
    }
    function testprint(){
        console.log("props bro")
    }

    async function fetchDatabase() {
        const res = await fetch(`${API_URL}/api/todos`);
        const data = await res.json();
        setServerData(data)
    }
    
    return(
        <div className="app">
            <button type="submit" onClick={testprint}>submit</button>
        </div>
    )
}

export default Prop;