import { NavLink } from "react-router-dom"


export default function Menu(){
    return(
        <div>
            <div className="main-links">
            
            <NavLink to="/" exact='true'>Home</NavLink>
            <NavLink to="/dropdown" exact='true'> Dropdown </NavLink>
            
            </div>
        </div>
    )
}