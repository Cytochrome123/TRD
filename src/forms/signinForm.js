import { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import axios from "axios";
import { AlertContext, AuthContext } from "../App";

import Loader from "../component/Loader";

const Signin = (props) => {
  const { handleAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {notify} = useContext(AlertContext)

  const emailRef = useRef();
  const location = useLocation();
  const url = new URLSearchParams(location.search);
  
  useEffect(() => {
    emailRef.current.focus()
  }, [])

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
    setLoading(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVERURL}/auth/signin`,
      data: formData,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`
      }
      // withCredentials: true
    })
    .then((res) => {
      setLoading(false);
      console.log(res.data);
      notify('success', res.data.message);
      console.log(res.data.data.token, 'res.data.accessToken');
      // cookies.set('token', hard );
      // cookies.set("temp", res.data.accessToken);
      // navigate(`/verify?email=${formData.email}`);

      const token = cookies.set("token", res.data.data.token);

      const prev = url.get('rd');
      if(prev) {
        handleAuth(token);
        navigate(`${process.env.REACT_APP_CLIENTURL}/${prev}`);
      }

      if (res.data.data.user.userType === "admin") {
        navigate("/admin/dashboard");
        handleAuth(token);
      } else if (res.data.data.user.userType === "instructor") {
        navigate("/instructor/dashboard");
        handleAuth(token);
      } else if (res.data.data.user.userType === "student") {
        navigate("/student/dashboard");
        handleAuth(token);
      } else {
        handleAuth(token);
        navigate("/courses");
      }
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
      if (Array.isArray(err.response?.data.message)) {
        notify('error', err.response.data.errors[0].msg)
      } else if (err.response) {
        // This can happen when the required headers or options to access the endpoint r not provided
        if (err.response.data.message) {
          notify('error', err.response.data.message)
        } else {
          notify('error', err.response.data)
        }
      } else {
        notify('error', err.message)
      }
    });
  };

  const style = {
    background: "green",
    /* For Firefox */
    'scrollbar-width': 'none',
    /* For Chrome, Safari, and Edge */
    'webkit-scrollbar': {
      display: 'none',
      overflow: 'auto'
    },
  }

  return (
    <div className="flex flex-col mt-20 h-screen overflow-scroll scrollbar-hide">
      {loading && <Loader />}
      <div className="flex items-center justify-center">
        <div className="w-full p-10 mb-10 bg-blue-300 border rounded-lg shadow sm:mx-7 md:m-10 md:max-w-md border-slate-200">
          <div className="mb-8 text-xl font-semibold text-center text-blue-600 lg:justify-center">
            Log in to your account
          </div>

          {/* TODO: fix form focus */}

          <form className="" onSubmit={handleSubmit}>
            <div className="mb-6 form-control">
              <label className="text-xs font-semibold text-slate-800 dark:text-white" htmlFor="email">
                Email
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
                required
                id="email"
                type="text"
                name="email"
                onChange={handleChange}
                value={formData.email}
                ref={emailRef}
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

            <div className='flex items-center justify-center gap-1 w-full mt-5 text-sm'>
                <p className='text-gray-200'>Don't have an account?</p>
                <p className="text-blue-700">
                  <Link to="/auth/signup">Create an account</Link>
                </p>
             </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
