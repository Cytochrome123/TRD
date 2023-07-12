import { Navigate, Outlet, useNavigate } from "react-router-dom";

import cookies from "js-cookie";
import jwtDecode from 'jwt-decode';
import { hard } from "../../App";

const StudentRoutes = () => {
// cookies.set('token', hard)
    const token = cookies.get('token')
    const decoded = jwtDecode(token)

    const navigate = useNavigate()
    return (
        decoded.userType === 'student' ? <Outlet /> : <Navigate to='/courses' />
    )
}

export default StudentRoutes;