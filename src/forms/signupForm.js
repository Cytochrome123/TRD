import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
// import { BASEURL } from "../App";

const Signup = (props)=>{

    const [ formData , setFormData ] = useState({
        firstName: 'Micheal',
        lastName: 'Owojori',
        email: '',
        password: '',
        confirmPassword: '',
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
      <div className="flex justify-center">
        {/* container start */}
            
        <div className="mx-5 my-1 sm:mx-7 md:m-10 md:max-w-md  w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {/* <div>SignUp Form</div> */}

          <form className="space-y-6" action="#" onSubmit={handleSubmit} >
            <h5 className="text-xl font-medium text-gray-900 dark:text-white lg:justify-center">Sign Up to our platform</h5>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter First Name" required
                type="text"
                name="firstName"
                onChange={handleChange} 
                value={formData.firstName}

              />
            </div>
            <div className="form-control">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                onChange={handleChange} 
                value={formData.lastName}

              />
            </div>
            <div className="form-control">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange} 
                value={formData.email}

              />
            </div>
            <div className="form-control">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange} 
                value={formData.password}

              />
            </div>
            <div className="form-control">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange} 
                value={formData.confirmPassword}
              />
            </div>
            <div className="form-control">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required
                type="Number"
                name="phoneNumber"
                placeholder="phone Number"
                onChange={handleChange} 
                value={formData.phoneNumber}
              />
            </div>


            {/* <div className="mx-5 my-1 sm:mx-7 md:m-10 md:max-w-md  w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"> */}

            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
        </div>

        {/* container end */}
      </div>
    )
}

export default Signup;