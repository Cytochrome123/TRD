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
        <div className="min-h-screen flex flex-col ">
            <div className="flex-1 flex justify-center items-center">
            {/* container start */}

                <div className="mx-5 my-1 sm:mx-7 md:m-10 md:max-w-md  w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

                    <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                        <div className="text-xl font-medium text-gray-900 dark:text-white lg:justify-center">Signin form</div>
        
                        <div className="form-control">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                
                        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
        
                    </form>
                </div>


            {/* container end */}
        </div>
        </div>

    )
}

export default Signin;