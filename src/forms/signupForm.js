import { useState, useContext, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import cookies from 'js-cookie';
import axios from "axios";
import { AlertContext } from "../App";
import Loader from "../component/Loader";

const Signup = (props) => {
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    image: null,
  });
  const [error, setError] = useState({
    password: "",
    file: ""
  });
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();
  const { notify } = useContext(AlertContext);
  const firstNameRef = useRef();

  useEffect(() => {
    firstNameRef.current.focus()
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

  // img start
  const [selectedImage, setSelectedImage] = useState(null);


  //   image seperate start
  const onFileChange = (e) => {

    const file = e.target.files[0]

    if (!file) {
      setError(prev => ({ ...prev, file: 'No file selected' }));
      return;
    }

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 500 * 1024; // 500 KB in bytes

    if (!validTypes.includes(file.type)) {
      setError(prev => ({ ...prev, file: 'Only PNG, JPG, and JPEG files are allowed' }));
      // Clear the input field
      e.target.value = '';
      return;
    }

    if (file.size > maxSize) {
      setError(prev => ({ ...prev, file: 'File size must be less than 500 KB' }));
      // Clear the input field
      e.target.value = '';
      return;
    }

    // Proceed with file processing
    console.log('Selected file:', file);
    // You can handle file upload or any other logic here
    // if (file) {
      setFormData(prevData => (
        {
          ...prevData,
          image: file
        }
      ));
      setSelectedImage(URL.createObjectURL(file));
    // };

  };
  // img end



  const handleSubmit = (event) => {
    event.preventDefault();
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError(prev => ({ ...prev, password: "Passwords do not match" }));
      return;
    } else {
      setError(prev => ({ ...prev, password: "" }));
      // Perform further actions like submitting the form or making API calls here
    }

    setLoading(true)
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVERURL}/auth/signup`,
      data: formData,
      headers: {
        // "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`
        'Content-Type': 'multipart/form-data',
        // Authorization: `Bearer ${token}`
      },
      // withCredentials: true
    })
      .then((res) => {
        setLoading(false)
        console.log(res);
        notify('success', res.data.message);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
          image: null,
        })
        // console.log(res.data.token)
        // cookies.set('token', res.data.token );
        // props.handleAlervscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.htmlt(true, 'successfully Loged In!!!', 'success');

        // navigate("/signin");
      })
      .catch((err) => {
        setLoading(false)
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

  return (
    <div className="flex flex-col lg:h-screen">
      {loading && <Loader />}
      <div className="flex items-center justify-center flex-1">
        <div className="w-full p-10 mt-32 mb-10 bg-blue-300 border rounded-lg shadow sm:mx-7 md:m-10 md:max-w-md border-slate-200">
          <div className="mb-8 text-xl font-semibold text-center text-blue-600 lg:justify-center">
            Sign up to our platform
          </div>

          <form className="" onSubmit={handleSubmit}>
            <div className="mb-3 form-control">
              <label className="text-xs font-semibold text-slate-800">
                First Name
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
                required
                type="text"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
                ref={firstNameRef}
              />
            </div>
            <div className="mb-3 form-control">
              <label className="text-xs font-semibold text-slate-800">
                Last Name
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
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
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
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
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
                required
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
              <p className="text-red-500">{error.password}</p>
            </div>
            <div className="mb-3 form-control">
              <label className="text-xs font-semibold text-slate-800">
                Confirm Password
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
                required
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                // setConfirmPassword(value)
                value={formData.confirmPassword}
              // value={}
              />
            </div>

            <div className="mb-3 form-control">
              <label className="mb-2 text-xs font-semibold text-slate-800">
                Phone Number
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-blue-500"
                required
                type="number"
                name="phoneNumber"
                onChange={handleChange}
                value={formData.phoneNumber}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-xs font-semibold text-slate-800" htmlFor="passport">
                Passport
              </label>
              <input

                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="file"
                id="image"
                name="image"
                // value={Course.image}
                // accept='image/*'
                accept="image/png, image/jpeg, image/jpg"
                onChange={onFileChange}
                placeholder="Upload img"
              // required

              />
              <p className="text-red-500">{error.file}</p>
            </div>
            {/* <br/> */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mt-8"
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
