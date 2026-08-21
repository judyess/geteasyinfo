import React, {useState, useEffect} from "react";

export default function Textbox(){
    const [text, setText] = useState("")

    return(
        <div>
            <input 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="text"></input>
        </div>
    )
}