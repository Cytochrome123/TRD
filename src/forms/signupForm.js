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
          
          // placeholder="First Name"
          onChange={handleChange} value={formData.firstName}
        //   value={text}
        //   onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
        <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required
          type="text"
          placeholder="Enter Last Name"
        //   value={}
        onChange={handleChange} value={formData.lastName}
        //   onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="forn-control">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required
          type="text"
          placeholder="Email"
        //   value={}
        onChange={handleChange} value={formData.email}
        //   onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="forn-control">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required
          type="password"
          placeholder="Password"
        //   value={}
        onChange={handleChange} value={formData.password}
        //   onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="forn-control">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
        <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required
          type="password"
          placeholder="Confirm Password"
        //   value={}
        //   onChange={(e) => setDay(e.target.value)}
        />
      </div>

      <div className="forn-control">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
        <input
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required
          type="Number"
          placeholder="phone Number"
        //   value={}
        onChange={handleChange} value={formData.phoneNumber}
        //   onChange={(e) => setDay(e.target.value)}
        />
      </div>


      {/* <div className="mx-5 my-1 sm:mx-7 md:m-10 md:max-w-md  w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"> */}

      


      <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
            </form>
            {/* <form onSubmit={handleSubmit}>
                <input type='text' name='firstName' placeholder="First Name" onChange={handleChange} value={formData.firstName} />
                <input type='text' name='lastName' placeholder="Last Name" onChange={handleChange} value={formData.lastName} />
                <input type='email' name='email' placeholder="Email" onChange={handleChange} value={formData.email} />
                <input type='text' name='phoneNumber' placeholder="Phone Number" onChange={handleChange} value={formData.phoneNumber} />
                <input type='password' name='password' placeholder="Password" onChange={handleChange} value={formData.password} />

                <button type='submit'>Submit</button>
            </form> */}
        </div>

            {/* container end */}
        </div>
    )
}

export default Signup;