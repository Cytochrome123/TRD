import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
// import { BASEURL } from "../App";

import { hard } from "../App";

const Signin = (props)=>{

    const [ formData , setFormData ] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate();

    function handleChange(event){
        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name] : event.target.value
            }
        });
    }
    console.log(formData);


    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            // url: `${BASEURL}/Signin`,
            url: 'http://localhost:5001/api/signin',
            data: formData,
            // withCredentials: true
        })
        .then(res => {
            console.log(res.data);
            alert(res.data.msg)
            console.log(res.data.accessToken)
            // cookies.set('token', hard );
            cookies.set('temp', res.data.accessToken );
            // props.handleAlert(true, 'successfully Loged In!!!', 'success');

            navigate(`/verify?email=${formData.email}`)
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
            <div>Signin form</div>

            <form onSubmit={handleSubmit}>
                <input type='email' name='email' placeholder="Email" onChange={handleChange} value={formData.email} />
                <input type='password' name='password' placeholder="Password" onChange={handleChange} value={formData.password} />

                <button type='submit'>Submit</button>
            </form>
        </div>

    )
}

export default Signin;