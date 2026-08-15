import React, {useState, useEffect} from "react";
function Prop(){
    const [serverData, setServerData] = useState([]);

    useEffect(() => {
        print("{Prop props loaded")
    }, []);

  function reset(){
        setServerData([]);
    }

    async function fetchDatabase() {
        const res = await fetch(`${API_URL}/api/todos`);
        const data = await res.json();
        setServerData(data)
    }
    
    return(
        <div>
            <button type="submit" onClick={}>submit</button>
        </div>
    )
}

export default Prop;