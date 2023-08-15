import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import cookies from 'js-cookie';
import axios, { AxiosError } from "axios";
import { BASEURL } from "../App";
import cookies from "js-cookie";

const AddCourseForm = (props) => {
  const { onClose, className } = props;
  const [ formData, setFormData ] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    duration: "",
    location: "",
    amount: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling on the background when the modal is open
    document.body.style.overflow = "hidden";

    // Event listener for clicking outside the modal to close it
    // const handleOutsideClick = (event) => {
    //   if (!event.target.closest(".modal-content")) {
    //     onClose();
    //   }
    // };
    console.log('ergwvggvew');
    // document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Cleanup: Re-enable scrolling and remove the event listener
      document.body.style.overflow = "auto";
      // document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  function handleChange(event) {
    setFormData((prevData) => {
      console.log(prevData);
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }
  console.log(formData);

  // const handleInstructors(event) {
    
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = cookies.get('token')
    axios({
      method: "post",
      // url: `${BASEURL}/course`,
      url: `http://localhost:5001/api/course`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      // withCredentials: true
    })
      .then((res) => {
        console.log(res);
        alert(res.data.msg);
        // console.log(res.data.token)
        // c.set('token', res.data.token );
        // props.handleAlert(true, 'successfully Loged In!!!', 'success');

        onClose();
      })
      .catch((err) => {
        console.log(err);
        if (err && err instanceof Error) {
          alert(err.response?.data.msg);
          alert(JSON.stringify(err.response?.data.msg))
          alert(JSON.stringify(err))
        } else if (err && err instanceof AxiosError) {
          alert(err.message);
          console.log('qwer');
        } else {
          alert("Error");
        }
        // props.handleAlert(false, e.response.data ? e.response.data : e.message, 'danger');
      });
  };

  return (
    <div className={`flex flex-col my-10 fixed inset-0 items-center justify-center z-50 w-screen  p-10 ${className} fade-in-regular`}>
      <div className="fixed inset-0 h-screen bg-black opacity-30"></div>{" "}
      {/* <div className="flex items-center justify-center flex-1"> */}
        <div className="relative w-full max-w-5xl p-5 mx-5 my-1 overflow-hidden bg-white border rounded-lg shadow sm:mx-7 md:m-10 md:max-w-md border-slate-200 md:p-10">
          <span className="float-right cursor-pointer" onClick={onClose}>X</span>
          <div className="mb-8 text-xl font-semibold text-center text-blue-600 dark:text-white lg:justify-center">
            Add New Course
          </div>

          <form className="" onSubmit={handleSubmit}>
            <div className="mb-3 form-control">
              <label className="text-xs font-semibold text-slate-800">
                Name
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
                required
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="mb-3 form-control">
              <label className="text-xs font-semibold text-slate-800">
                Description
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
                required
                type="text"
                name="description"
                onChange={handleChange}
                value={formData.description}
              />
            </div>
            <div className="mb-3 form-control">
              <label className="text-xs font-semibold text-slate-800">
                Start Date
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
                required
                type="Date"
                name="start_date"
                onChange={handleChange}
                value={formData.start_date}
              />
            </div>
            <div className="mb-3 form-control">
              <label className="text-xs font-semibold text-slate-800">
                End 
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
                required
                type="Date"
                name="end_date"
                onChange={handleChange}
                value={formData.end_date}
              />
            </div>
            <div className="mb-3 form-control">
              <label className="text-xs font-semibold text-slate-800">
                Duration
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
                required
                type="text"
                name="duration"
                onChange={handleChange}
                // setConfirmPassword(value)
                value={formData.duration}
                // value={}
              />
            </div>

            <div className="mb-3 form-control">
              <label className="text-xs font-semibold text-slate-800">
                Location
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
                required
                type="text"
                name="location"
                onChange={handleChange}
                // setConfirmPassword(value)
                value={formData.location}
                // value={}
              />
            </div>

            <div className="mb-3 form-control">
              <label className="text-xs font-semibold text-slate-800">
                Amount
              </label>
              <input
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
                required
                type="text"
                name="amount"
                onChange={handleChange}
                // setConfirmPassword(value)
                value={formData.amount}
                // value={}
              />
            </div>
            
            {/* <br/> */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mt-8"
            >
              ADD
            </button>
          </form>
        </div>
      {/* </div> */}
    </div>
  );
};

export default AddCourseForm;