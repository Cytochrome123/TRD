import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import cookies from 'js-cookie';
import axios, { AxiosError } from "axios";
// import { BASEURL } from "../App";

const Signup = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
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
      url: "http://localhost:5001/api/signup",
      data: formData,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`
      }
      // withCredentials: true
    })
    .then((res) => {
      console.log(res);
      alert(res.data.msg);
      // console.log(res.data.token)
      // cookies.set('token', res.data.token );
      // props.handleAlert(true, 'successfully Loged In!!!', 'success');

      navigate("/signin");
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
    <div className="flex flex-col my-10">
      <div className="flex items-center justify-center flex-1">
        <div className="w-full p-10 mx-5 my-1 bg-white border rounded-lg shadow sm:mx-7 md:m-10 md:max-w-md border-slate-200">
          <div className="mb-8 text-xl font-semibold text-center text-blue-600 dark:text-white lg:justify-center">
            Sign Up to our platform
          </div>

          <form className="" onSubmit={handleSubmit}>
            <div className="mb-3 form-control">
              <label className="text-xs font-semibold text-slate-800">
                First Name
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5"
                required
                type="text"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
            </div>
            <div className="mb-3 form-control">
              <label className="text-xs font-semibold text-slate-800">
                Last Name
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5"
                required
                type="text"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
            <div className="mb-3 form-control">
              <label className="text-xs font-semibold text-slate-800">
                Email
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5"
                required
                type="text"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="mb-3 form-control">
              <label className="text-xs font-semibold text-slate-800">
                Password
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5"
                required
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className="mb-3 form-control">
              <label className="text-xs font-semibold text-slate-800">
                Confirm Password
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5"
                required
                type="password"
              />
            </div>

            <div className="form-control">
              <label className="text-xs font-semibold text-slate-800">
                Phone Number
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                type="number"
                name="phoneNumber"
                onChange={handleChange}
                value={formData.phoneNumber}
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mt-8"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
