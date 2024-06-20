
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const useHistory = () => {
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };
    // return useContext(AuthContext);
}

export default useHistory;