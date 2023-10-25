import { createContext, useState } from "react";

import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [authenticatedUser, setAuthenticatedUser] = useState({
        authenticated: false,
        firstName: '',
        lastName: '',
        courses: [],
        role: '',
        token: ''
      })
    const handleAuth = () => {
        const token = cookies.get('token')
        if (token) {
          const decoded = jwtDecode(token);
          console.log(decoded)
          setAuthenticatedUser(prev => ({
            authenticated: true,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            // courses: decoded.courses
            role: decoded.userType,
            token
          }))
        }
      }

    return (
        <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser, handleAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;