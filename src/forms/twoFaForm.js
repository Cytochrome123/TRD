import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
// import { BASEURL } from "../App";

import { AuthContext, hard } from "../App";

const TwoFAForm = (props) => {

    const [ otp , setOtp ] = useState('')

    const navigate = useNavigate();
    const location = useLocation();

    console.log(otp);

    const { authenticatedUser, handleAuth } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const temp = cookies.get('temp');
        console.log(temp, '2FA')
        // const searchParams = new URLSearchParams(window.location.search);
        const searchParams = new URLSearchParams(location.search);
        const email = searchParams.get('email');
        axios({
            method: 'post',
            // url: `${BASEURL}/Signin`,
            url: 'http://localhost:5001/api/verify',
            data: {otp},
            params: {email} ,
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${'token'}`
                Authorization: `Bearer ${temp}`
            }
            // withCredentials: true
        })
        .then(res => {
            console.log(res.data);
            alert(res.data.msg)
            
            cookies.remove('temp')
            cookies.set('token', res.data.newAccessToken );
            // props.handleAlert(true, 'successfully Loged In!!!', 'success');

            // handleAuth()
            // navigate('/dashboard')
            // window.location.href = '/dashboard'

            if(res.data.user.userType === 'admin') {
                navigate('/admin/dashboard')
            } else if(res.data.user.userType === 'instructor') {
                navigate('/instructor/dashboard')
            } else if(res.data.user.userType === 'student') {
                navigate('/student/dashboard');
            } else {
                // navigate('/courses/allExams')
                window.location.back()
            }
        })
        .catch(err => {
            console.log(err)
            if(err && err instanceof AxiosError) {
                alert(err.message)
            } else if(err && err instanceof Error) {
                alert(err.response?.data.message);
            } else {
                alert('Error')
            }
            // props.handleAlert(false, e.response.data ? e.response.data : e.message, 'danger');
        });
    }

    return(
        <div className="form">
            <div>Verify</div>

            <form onSubmit={handleSubmit}>
                <input type='text' name='otp' placeholder="OTP" onChange={(event) => setOtp(event.target.value)} value={otp} />

                <button type='submit'>Submit</button>
            </form>
        </div>

    )
}

export default TwoFAForm;