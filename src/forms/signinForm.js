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
        <div className="mx-5 my-1 sm:mx-7 md:m-10 md:max-w-md  w-full p-10 bg-white border border-slate-200 rounded-lg shadow">
          <div className="text-xl mb-8 font-semibold text-blue-600 text-center dark:text-white lg:justify-center">
            Log in to your account
          </div>

          {/* TODO: fix form focus */}

          <form className="" action="#">
            <div className="form-control mb-6">
              <label className="text-xs font-semibold text-slate-800 dark:text-white">
                Email
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5"
                required
                type="text"
              />
            </div>
            <div className="form-control">
              <label className="text-xs font-semibold text-slate-800 dark:text-white">
                Password
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5"
                required
                type="password"
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
