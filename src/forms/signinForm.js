import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import axios, { AxiosError } from "axios";
// import { BASEURL } from "../App";

import { hard } from "../App";

const Signin = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }
  console.log(formData);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      // url: `${BASEURL}/Signin`,
      url: "http://localhost:5001/api/signin",
      data: formData,
      // withCredentials: true
    })
      .then((res) => {
        console.log(res.data);
        alert(res.data.msg);
        console.log(res.data.accessToken);
        // cookies.set('token', hard );
        cookies.set("temp", res.data.accessToken);
        // props.handleAlert(true, 'successfully Loged In!!!', 'success');

        navigate(`/verify?email=${formData.email}`);
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
      .catch((err) => {
        console.log(err);
        if (err && err instanceof AxiosError) {
          alert(err.message);
        } else if (err && err instanceof Error) {
          alert(err.response?.data.message);
        } else {
          alert("Error");
        }
        // props.handleAlert(false, e.response.data ? e.response.data : e.message, 'danger');
      });
  };

  return (
    <div className="my-10 flex flex-col">
      <div className="flex-1 flex justify-center items-center">
        <div className="mx-5 my-1 sm:mx-7 md:m-10 md:max-w-md  w-full  p-4 bg-white border border-slate-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-800 dark:border-slate-700">
          <div className="text-xl mb-8 font-semibold text-blue-600 text-center dark:text-white lg:justify-center">
            Log in to your account
          </div>

          <form className="" action="#">
            <div className="form-control mb-6">
              <label className="text-xs font-semibold text-slate-800 dark:text-white">
                Email
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                required
                type="text"
                //   value={}
                //   onChange={(e) => setDay(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="text-xs font-semibold text-slate-800 dark:text-white">
                Password
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                required
                type="password"
                //   value={}
                //   onChange={(e) => setDay(e.target.value)}
              />
            </div>

            <button
              type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-8"
            >
              LOG IN
            </button>

            {/* <input type="submit" value="Submit" /> */}
          </form>

          {/* <form onSubmit={handleSubmit}>
                <input type='email' name='email' placeholder="Email" onChange={handleChange} value={formData.email} />
                <input type='password' name='password' placeholder="Password" onChange={handleChange} value={formData.password} />
            
                <button type='submit'>Submit</button>
            </form> */}
        </div>
      </div>
    </div>
  );
};

export default Signin;
