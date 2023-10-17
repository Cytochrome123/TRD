import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { BASEURL } from "../App";

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
      url: `${BASEURL}/signin`,
      data: formData,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`
      }
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
      if(Array.isArray(err.response?.data.msg)){
        alert(err.response.data.msg[0].msg);
      } else if (err.response) {
        alert(err.response.data.msg);
      } else {
        // err.response?.data ? alert(err.response?.data) : alert(err.message)
        alert(err.message)
      }
      // props.handleAlert(false, e.response.data ? e.response.data : e.message, 'danger');
    });
  };

  return (
    <div className="flex flex-col h-screen my-10">
      <div className="flex items-center justify-center flex-1">
        <div className="w-full p-10 mx-5 my-1 bg-white border rounded-lg shadow sm:mx-7 md:m-10 md:max-w-md border-slate-200">
          <div className="mb-8 text-xl font-semibold text-center text-blue-600 lg:justify-center">
            Log in to your account
          </div>

          {/* TODO: fix form focus */}

          <form className="" onSubmit={handleSubmit}>
            <div className="mb-6 form-control">
              <label className="text-xs font-semibold text-slate-800 dark:text-white">
                Email
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
                required
                type="text"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="form-control">
              <label className="text-xs font-semibold text-slate-800 dark:text-white">
                Password
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
                required
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            <button
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mt-8"
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
