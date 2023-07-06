import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/register">Register</NavLink>
            <span> | </span>
			<NavLink to="/list">List</NavLink>
            <span> | </span>
			<NavLink to="/insert">Insert</NavLink>
            <span> | </span>
			<NavLink to="/edit">Insert</NavLink>
        </div>
    );
}

export default Menu;
