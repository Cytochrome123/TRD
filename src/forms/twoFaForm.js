import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { AlertContext, BASEURL } from "../App";
import { AuthContext } from "../App";
import OtpInput from 'react-otp-input';
import Loader from "../component/Loader";

const TwoFAForm = (props) => {

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const location = useLocation();

  console.log(otp);

  const { authenticatedUser, handleAuth } = useContext(AuthContext);
  const { notify } = useContext(AlertContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    const temp = cookies.get("temp");
    console.log(temp, 'temp signin')
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");

    setLoading(true)
    axios({
      method: "post",
      url: `${BASEURL}/verify`,
      data: { otp },
      params: { email },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${temp}`,
      },
    })
      .then((res) => {
        setLoading(false)
        console.log(res.data);
        notify('success', res.data.msg);

        // cookies.remove("temp");
        const token = cookies.set("token", res.data.newAccessToken);
console.log(token, 'token')
        if (res.data.user.userType === "admin") {
          navigate("/admin/dashboard");
          handleAuth(token);
        } else if (res.data.user.userType === "instructor") {
          navigate("/instructor/dashboard");
          handleAuth(token);
        } else if (res.data.user.userType === "student") {
          navigate("/student/dashboard");
          handleAuth(token);
        } else {
          handleAuth(token);
          navigate("/courses");
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
        if (Array.isArray(err.response?.data.msg)) {
          notify('error', err.response.data.msg[0].msg)
        } else if (err.response) {
          // This can happen when the required headers or options to access the endpoint r not provided
          if (err.response.data.msg) {
            notify('error', err.response.data.msg)
          } else {
            notify('error', err.response.data)
          }
        } else {
          notify('error', err.message)
        }
      });
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text");
    const newOtp = pastedData
      .slice(0, 6)
      .split("")
      .map((char) => (isNaN(Number(char)) ? "" : char));
    setOtp(newOtp);
  };

  return (
    <div className="flex flex-col h-screen">
      {loading && <Loader />}
      <div className="flex items-center justify-center flex-1">
        <div className="w-full p-10 mt-32 mb-10 bg-blue-300 border rounded-lg shadow sm:mx-7 md:m-10 md:max-w-md border-slate-200">
          <div className="mb-8 text-xl font-semibold text-center text-blue-600 lg:justify-center">
            Enter OTP Code
          </div>

          <form
            className="flex flex-col justify-center space-x-2"
            onSubmit={handleSubmit}
          >
            <OtpInput
              inputType="number"
              value={otp}
              onChange={setOtp}
              numInputs={6}
              shouldAutoFocus
              containerStyle={{ justifyContent: 'space-between' }}
              renderSeparator={'o'}
              // renderInput={(props) => <input {...props} />}
              renderInput={props => (
                <input
                  {...props}
                  className="w-10 h-10 text-lg text-center text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500"
                />
              )}
              // inputStyle={`className="w-12 h-12 text-lg text-center text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500"`}
              onPaste={handlePaste}
            />
            
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mt-8"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TwoFAForm;
