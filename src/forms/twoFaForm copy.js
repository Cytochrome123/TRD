import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { AlertContext } from "../App";
import { AuthContext } from "../App";
import Loader from "../component/Loader";

const TwoFAForm = (props) => {

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const location = useLocation();

  console.log(otp);

  const { authenticatedUser, handleAuth } = useContext(AuthContext);
  const { notify } = useContext(AlertContext)

  useEffect(() => {
    inputRefs.current[0].focus()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const temp = cookies.get("temp");
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVERURL}/verify`,
      data: { otp: otp.join("") },
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

        cookies.remove("temp");
        const token = cookies.set("token", res.data.newAccessToken);

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

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = ""; // Clear the current digit
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else if (event.key >= "0" && event.key <= "9") {
      const newOtp = [...otp];
      newOtp[index] = event.key;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }

    // if (inputChar === "") {
    //   // Backspace pressed
    //   const newOtp = [...otp];
    //   newOtp[index] = "";
    //   setOtp(newOtp);
  
    //   if (index > 0) {
    //     inputRefs.current[index - 1].focus();
    //   }
    // } else if (/^[0-9]$/.test(inputChar)) {
    //   // Valid digit entered
    //   const newOtp = [...otp];
    //   newOtp[index] = inputChar;
    //   setOtp(newOtp);
  
    //   if (index < otp.length - 1) {
    //     inputRefs.current[index + 1].focus();
    //   }
    // }
  };

  return (
    <div className="flex flex-col h-screen">
      {loading && <Loader />}
      <div className="flex items-center justify-center flex-1">
        <div className="w-full p-10 mx-5 my-1 bg-white border rounded-lg shadow sm:mx-7 md:m-10 md:max-w-md border-slate-200">
          <div className="mb-8 text-xl font-semibold text-center text-blue-600 lg:justify-center">
            Enter OTP
          </div>

          <form
            className="flex flex-col justify-center space-x-2"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center w-full space-x-2">
              {otp.map((digit, index) => (
                <input
                  autoComplete="off"
                  key={index}
                  className="w-12 h-12 text-lg text-center text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500"
                  maxLength={1}
                  type="text"
                  name={`otp-${index}`}
                  value={digit}
                  onPaste={handlePaste}
                  // onKeyDown={(event) => handleKeyDown(index, event)}
                  // onChange={(event) => handleKeyDown(index, event)}
                  onInput={(event) => handleKeyDown(index, event)}
                  ref={(inputRef) => (inputRefs.current[index] = inputRef)}
                />

                // <input
                //   key={index}
                //   type="text"
                //   className="w-12 h-12 text-lg text-center text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500"
                //   maxLength="1"
                //   value={otp[index] || ""}
                //   name={`otp-${index}`}
                //   // onPaste={handlePaste}
                //   onChange={(event) => handleKeyDown(index, event)}
                //   ref={(ref) => (inputRefs.current[index] = ref)}
                // />
              ))}
            </div>
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
