import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { AuthContext } from "../App";
import { useContext } from "react";
// import AuthContext from "../context/AuthProvider";

const RequireAuth = ({ allowedRoles }) => {
    const { authenticatedUser } = useContext(AuthContext);
    // const { auth } = useAuth();
    const location = useLocation();

    console.log(authenticatedUser);

    return (
        // <div>grfdh</div>
        allowedRoles?.includes(authenticatedUser.role)
            ? <Outlet />
            : authenticatedUser?.authenticated
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/signin" state={{ from: location }} replace />
    );
}

export default RequireAuth;