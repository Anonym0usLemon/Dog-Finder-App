import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom"; 
import AuthContext from "../../context/auth-context";
const PrivateRoutes = () => {
    const ctx = useContext(AuthContext);
    console.log(ctx.isLoggedIn)

    return (
        ctx.isLoggedIn ? <Outlet/> : <Navigate to="/login"/> 
    );
}

export default PrivateRoutes;