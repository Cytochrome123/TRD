import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import cookies from 'js-cookie';
import axios from 'axios';
// import { BASEURL } from "../App";

const Signup = (props)=>{

    const [ formData , setFormData ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: ''
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
            url: `http://localhost:5001/api/signup`,
            data: formData,
            // withCredentials: true
        })
        .then(res => {
            console.log(res);
            alert(res.data.msg)
            // console.log(res.data.token)
            // cookies.set('token', res.data.token );
            // props.handleAlert(true, 'successfully Loged In!!!', 'success');

            navigate('/signin')
        })
        .catch(e => {
            console.log(e);
            alert('Error')
            e.response.data.msg ? alert(e.response.data.msg) : alert(e.response.data.data.msg)
            // props.handleAlert(false, e.response.data ? e.response.data : e.message, 'danger');
        });
    }

    return(
        <div className="form">
            <div>SignUp Form</div>

            <form onSubmit={handleSubmit}>
                <input type='text' name='firstName' placeholder="First Name" onChange={handleChange} value={formData.firstName} />
                <input type='text' name='lastName' placeholder="Last Name" onChange={handleChange} value={formData.lastName} />
                <input type='email' name='email' placeholder="Email" onChange={handleChange} value={formData.email} />
                <input type='text' name='phoneNumber' placeholder="Phone Number" onChange={handleChange} value={formData.phoneNumber} />
                <input type='password' name='password' placeholder="Password" onChange={handleChange} value={formData.password} />

                <button type='submit'>Submit</button>
            </form>
        </div>

    )
}

export default Signup;