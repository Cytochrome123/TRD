import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { IoMdClose } from "react-icons/io";
import cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import { AlertContext, AuthContext, BASEURL } from "../App";
import Loader from "./Loader";



function CourseDetails(props) {
  const { id, image, title, description, duration, className, onClose, isModuleZero, fetchModule0 } = props;

  const navigate = useNavigate()
  const { notify } = useContext(AlertContext);
  const { authenticatedUser, handleAuth } = useContext(AuthContext);
  

  // const [quizStatus, setQuizStatus] = useState({
  //   taken: false,
  //   passed: false
  // });
  const [loading, setLoading] = useState(false);


  const ref = useRef(true);
  const token = cookies.get('token');

  useEffect(() => {
    // Event listener for clicking outside the modal to close it
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-content")) {
        // onClose();
      }
    };

    // Disable scrolling on the background when the modal is open
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Cleanup: Re-enable scrolling and remove the event listener
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
      ref.current = false;
    };
  }, [onClose]);

  const checkEntryQuiz = async () => {
    const has = await axios({
      method: 'get',
      url: `${BASEURL}/entry_quiz/status`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!has) throw new Error('Could not check user status for the entry quiz')

    return has.data;
  }

  const register = async (id) => {
    const reg = await axios({
      method: "post",
      url: `${BASEURL}/course/${id}/register`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });

    if (!reg) throw new Error('Failed to enrol to course');

    if(authenticatedUser.role === 'user') handleAuth(reg.data.renewToken);

    onClose();
    notify('success', 'Registration sucessfull!!!')
    navigate(`/student/dashboard/enrolled-courses/${id}`)
  }

  const handleRegister = async (id) => {
    try {
      // check if authenticated, if not redirect to login page
      // if module_0, conntinue to register
      // check if taken enry quiz
      // if yes and passed, continue to registration
      // if yes but failed, module 0
      // if no, redirect to quiz page

      setLoading(true);
      if (!authenticatedUser.authenticated) navigate('/signin');

      if(isModuleZero) return await register(id);

      const entry_quiz = await checkEntryQuiz();
      console.log(entry_quiz, 'entry quiz staatus')
      if (!entry_quiz.hasTakenQuiz) return navigate(`/${id}/enrol/entry_quiz`);

      if (entry_quiz.hasTakenQuiz && !entry_quiz.quizPassed) {
        onClose()
        notify('error', 'Unfortunately, you did not pass the test. Consider enrolling in the basic course (module 0) first.')
        setTimeout(() => {
          return fetchModule0()

        }, 2000)
      };

      await register(id);
    } catch (err) {
      setLoading(false);
      console.log(err);
      // console.log(instanceof err)
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
    }
  }



  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 w-screen  p-10 ${className} fade-in-regular`}
    >
      {loading && <Loader />}
      <div className="fixed inset-0 bg-black opacity-30"></div>{" "}
      {/* Black overlay */}
      <div className="relative w-full max-w-5xl p-5 overflow-hidden bg-white rounded-lg md:p-10">
        <div className="flex justify-end w-full">
          <IoMdClose
            className="mb-3 text-xl transition duration-300 ease-in-out cursor-pointer md:text-3xl md:mb-0 text-slate-800 hover:text-red-600"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col justify-between md:flex-row">
          <div className="w-full h-32 mb-5 md:h-72 md:w-1/2 md:mb-0">
            {" "}
            <img
              // src={image}
              src={`${image}`.includes('/s') ? `${image}` : `https://trd-server.onrender.com/api/file/${image}`}
              alt="Course"
              className="object-cover object-top w-full h-full rounded-lg"
            />
          </div>

          <div className="flex flex-col items-start justify-center w-full gap-3 md:gap-5 md:w-96">
            <span className="text-lg font-bold md:text-2xl text-slate-800">{title}</span>
            <p className="text-sm leading-6 tracking-wide text-slate-500 md:text-base">
              {description}
            </p>

            <span className="text-sm font-semibold md:text-base text-slate-700">
              Duration: {duration}
            </span>

            {/* <button onClick={() => handleRegister(id)} className="w-full px-10 py-2 mt-3 font-semibold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg md:mt-0 md:w-max hover:bg-blue-700">
              Enrol
            </button> */}
            <button onClick={() => handleRegister(id)} className="w-full px-10 py-2 mt-3 font-semibold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg md:mt-0 md:w-max hover:bg-blue-700">
              Enrol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;

// Add a response interceptor
// axios.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       console.error('Response Error:', error.response.data);
//       alert(error.response.data.msg)
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error('Request Error:', error.request);
//       // alert(error.request.response, 'Network error')
//       alert(error.message)
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error('Error:', error.message);
//       alert(error.message)
//     }
//     return Promise.reject(error);
//   }
// );

// Then import in every
// const instance = axios.create();

// instance.interceptors.response.use(
//   response => response,
//   error => {
//     // Your error handling logic here
//     console.error('Global Error Handling:', error);
//     return Promise.reject(error);
//   }
// );

// export default instance;
