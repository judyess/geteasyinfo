import { NavLink } from "react-router-dom"


export default function Menu(){
    return(
        <div>
            <div className="main-links">
            <ul>
            <li><NavLink to="/" exact='true'>Home</NavLink></li>
            <li><NavLink to="/dropdown" exact='true'> Dropdown </NavLink></li>
            </ul>
            </div>
        </div>
    )
}