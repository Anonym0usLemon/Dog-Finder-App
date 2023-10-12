import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
    return (
        <header>
            <Link to="/">
                <h1>Fetch</h1>
            </Link>
        </header>
    )
}

export default Header;

