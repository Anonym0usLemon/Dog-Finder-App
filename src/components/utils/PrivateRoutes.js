import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom"; 
import AuthContext from "../../context/auth-context";
const PrivateRoutes = () => {
    const ctx = useContext(AuthContext);

    return (
        ctx.isLoggedIn ? <Outlet/> : <Navigate to="https://anonym0uslemon.github.io/fetch-fe-challenge"/> 
    );
}

export default PrivateRoutes;