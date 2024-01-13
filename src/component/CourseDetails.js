import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { IoMdClose } from "react-icons/io";
import cookies from "js-cookie";

import { AlertContext, BASEURL } from "../App";



function CourseDetails(props) {
  const { id, image, title, description, duration, className, onClose } = props;

  const navigate = useNavigate()
  const {notify} = useContext(AlertContext)

  useEffect(() => {
    // Disable scrolling on the background when the modal is open
    document.body.style.overflow = "hidden";

    // Event listener for clicking outside the modal to close it
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-content")) {
        // onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Cleanup: Re-enable scrolling and remove the event listener
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleRegister = async (id) => {
    try {
      const token = cookies.get('token');
      if (!token) {
        notify('error', 'You need to login to register for this course');
        return navigate(`/signin`);
      }
      const register = await axios({
        method: "post",
        url: `${BASEURL}/course/${id}/register`,
        // url: `http://localhost:5001/api/course/${id}/register`, 
        // data: 'formData',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      })
      if (!register) {
        notify('error', 'Registrtion failed')
        onClose()
      }
      onClose()
      return notify('success', 'Registration sucessfull!!!')
    } catch (err) {
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
      onClose()
    }
  }
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 w-screen  p-10 ${className} fade-in-regular`}
    >
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
