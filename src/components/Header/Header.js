import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import "./Header.scss";
import HeartIcon from "../../assets/HeartIcon";
import { useContext } from "react";

const Header = (props) => {
    const ctx = useContext(AuthContext);

    function logoutHandler() {
        ctx.onLogout()
    }

    function matchHandler() {
        props.match(); 
    }

    return (
        <header>
            <Link to="/Home">
                <h1>Dog Finder</h1>
            </Link>
            <div className="right-content">
                <button className="match" onClick={matchHandler}><span>match</span><HeartIcon/></button>
                <button className="logout" onClick={logoutHandler}>Logout</button>
            </div>
        </header>
    )
}

export default Header;

