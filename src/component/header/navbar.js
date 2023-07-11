import { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import jwtDecode from 'jwt-decode';
import cookies from 'js-cookie';

const Navbarr = () => {

    const [authenticatedUser, setAuthenticatedUser] = useState({
        authenticated: false,
		firstName: '',
		lastName: '',
		role: '',
    })
    const ref = useRef(true);
    // const navigate = useNavigate();

    // cookies.set("jwt_auth",mytoken, {
    //     expires: new Date(decoded.exp * 1000),
    // })

    useEffect( () => {
        if (ref.current) {
            const token = cookies.get('token')
            console.log(token)
            let decoded;
            if (token) {
            decoded = jwtDecode(token);
            console.log(decoded)
  
            }

            setAuthenticatedUser(prev => ({
                ...prev,
                authenticated: true,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                role: decoded.userType,
            }))
        }

        return () => ref.current = false;
    }, [authenticatedUser.authenticated])


    const logOutUser = () => {
        // cookies.remove('token');
        // cookies.remove('type');
        setAuthenticatedUser(prev => ({
            ...prev,
            authenticated: false,
            firstName: '',
            lastName: '',
            role: '',
        }))
        // navigate('/courses')
        // window.location.href = '/courses';

    }


    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">TRD</Navbar.Brand>
          <Nav className="text-right">
            {console.log(authenticatedUser.authenticated)}
            {authenticatedUser.authenticated ? 
                <>
                    <Nav.Link onClick={logOutUser}>Logout</Nav.Link> 
                    <Nav.Link href="/courses" >Courses</Nav.Link>
                </> 
                : 
                <>
                    <Nav.Link href="/signin">Sign In</Nav.Link>
                    <Nav.Link href="/signup">Sign Up</Nav.Link>
                </>
            }
            

            {authenticatedUser.role === 'admin' ? (
                <>
                    <Nav.Link href="/insructors">Instructors</Nav.Link>
                    <Nav.Link href="/students">Students</Nav.Link>
                </>
            ) : authenticatedUser.role === 'instructor' ? (
                <>
                    <Nav.Link href="#">Assigned Courses</Nav.Link>
                </>
            ) : authenticatedUser.role === 'student' ? (
                <>
                    <Nav.Link href="#">My Courses</Nav.Link>
                </>
            ) : authenticatedUser.role}

            <Nav.Link href="#">{authenticatedUser.firstName}</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
    )
}



export default Navbarr;