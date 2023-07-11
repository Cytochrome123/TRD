import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cookies from 'js-cookie';
import axios from 'axios';
// import { BASEURL } from "../App";

import { hard } from "../App";

const TwoFAForm = (props) => {

    const [ otp , setOtp ] = useState('')

    const navigate = useNavigate();
    const location = useLocation();

    console.log(otp);


    const handleSubmit = (event) => {
        event.preventDefault();
        const token = cookies.get('temp');
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
                Authorization: `Bearer ${token}`
            }
            // withCredentials: true
        })
        .then(res => {
            console.log(res.data);
            alert(res.data.msg)
            
            cookies.remove('temp')
            cookies.set('token', res.data.newAccessToken );
            // props.handleAlert(true, 'successfully Loged In!!!', 'success');

            navigate('/dashboard')
            // window.location.href = '/dashboard'

            // if(res.data.data.userType === 'admin') {
            //     navigate('/admin')
            // } else if(res.data.data.userType === 'subAdmin') {
            //     navigate('/subAdmin/examiners')
            // } else if(res.data.data.userType === 'examiner') {
            //     navigate('/examiner/course');
            // } else {
            //     navigate('/student/allExams')
            // }
        })
        .catch(e => {
            alert(e.response.data.msg)
            console.log(e);
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