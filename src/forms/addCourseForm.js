// CourseForm.js
import React, { useContext, useState } from 'react';
import { AuthContext, BASEURL } from "../App";
import Icon_x from "../assets/Icons/x-close.png";
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token')


const AddCourseForm = ({ onClose, onData, getCourses }) => {
  const { courses, setCourses, setShouldMakeApiCall } = useContext(AuthContext)

  // const [sm, setSm] = useState(null)

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    duration: '',
    start_date: '',
    end_date: '',
    location: '',
    capacity: '',
    amount: '',
    image: null, //should I change this to empty string ni? 
  });






  const handleChange = (event) => {
    setCourseData(prevData => (
      {
        ...prevData,
        [event.target.name]: event.target.value,
      }
    ));
  };

  const [selectedImage, setSelectedImage] = useState(null);


  //   image seperate start
  const onFileChange = (e) => {

    const file = e.target.files[0]; // Get the selected file
    // This if statement prevent an error that arises when an img has previously being selected
    if (file) {
      setCourseData(prevData => (
        {
          ...prevData,
          image: file
        }
      ));
      setSelectedImage(URL.createObjectURL(file));
    };

  };
  //   image seperate end


  //   HandleAddCourse
  const handleSubmit = (e) => {
    e.preventDefault();

    // const id = Math.floor(Math.random() * 1000) + 1

    // const newPost = { id, title: Course.title, description : Course.description,  duration: Course.duration,start_date: Course.start_date, end_date: Course.end_date, location: Course.location, capacity: Course.capacity, amount: Course.amount, image: selectedImage  }
    // console.log('new post newPost', newPost);
    // console.log('new post selectedImage', selectedImage);
    // onData(Course, selectedImage);


    // // Axios request start
    axios({
      method: "post",
      url: `${BASEURL}/course`,
      data: courseData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
      // withCredentials: true
    })
      .then((res) => {
        console.log("xxx created-courses", res.data.msg);
        getCourses();
      })
      .catch((err) => {
        console.log(err);
        if(Array.isArray(err.response.data.msg)){
          alert(err.response.data.msg[0].msg);
        } else if (err.response) {
          alert(err.response.data.msg);
        } else {
          // err.response?.data ? alert(err.response?.data) : alert(err.message)
          alert(err.message)
        }
        // props.handleAlert(false, e.response.data ? e.response.data : e.message, 'danger');
      });
    // // Axios request end


    onClose()

  };

  const handleCancel = () => {
    // e.preventDefault();
    onClose()
    // You can add your logic here to handle the form submission, e.g., sending data to a server or updating state.
  };
  // console.log("YES Course",Course);

  return (
    // <div className="flex items-center justify-center min-h-screen bg-blue-50">
    <div className="w-full p-8 overflow-y-auto bg-white rounded-lg shadow-md md:w-1/2 lg:w-1/3 ">
      <button className='float-right' onClick={handleCancel}><img src={Icon_x} alt='Icon x close' /></button>
      <h2 className="mb-4 text-3xl font-semibold text-blue-600">Add Course</h2>
      <form onSubmit={handleSubmit}>
        {/* <div className='flex flex-wrap items-center justify-center gap-2 '> */}
        <div className='flex justify-between gap-5 '>

          {/* first section start */}
          <div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="name">
                Title
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="text"
                id="title"
                name="title"
                value={courseData.title}
                onChange={handleChange}
                placeholder="Course Title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="CourseId">
                Description
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="text"
                id="description"
                name="description"
                value={courseData.description}
                onChange={handleChange}
                placeholder="Description "
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="CourseId">
                Duration
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="text"
                id="duration"
                name="duration"
                value={courseData.duration}
                onChange={handleChange}
                placeholder=" Course Duration"
                required
              />
            </div>
            <div className="mb-1">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="CourseId">
                start_date
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="number"
                id="start_date"
                name="start_date"
                value={courseData.start_date}
                onChange={handleChange}
                placeholder=" start date"
                required
              />
            </div>
          </div>
          {/* first section end */}

          {/* second section start */}
          <div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="CourseId">
                Duration
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="text"
                id="end_date"
                name="end_date"
                value={courseData.end_date}
                onChange={handleChange}
                placeholder=" end date"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="CourseId">
                location
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="text"
                id="location"
                name="location"
                value={courseData.location}
                onChange={handleChange}
                placeholder="location"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="CourseId">
                capacity
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="number"
                id="capacity"
                name="capacity"
                value={courseData.capacity}
                onChange={handleChange}
                placeholder="capacity"
                required
              />
            </div>

            <div className="mb-1">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="enrollmentDate">
                Enrolled
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="number"
                id="amount"
                name="amount"
                value={courseData.amount}
                onChange={handleChange}
                placeholder='Amount '
                required
              />
            </div>

          </div>
          {/* second section end */}


        </div>
        {/* overall 2 side end */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-600" htmlFor="phoneNumber">
            File
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
            type="file"
            id="image"
            name="image"
            // value={Course.image}
            accept='image/*'
            onChange={onFileChange}
            placeholder="Upload img"
            required
          />
        </div>

        {/* {selectedImage && <img src={selectedImage} alt="Selected Image" />} */}
        <button
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          type="submit"
        >
          Add Course
        </button>
      </form>
    </div>
    // </div>
  );
};

export default AddCourseForm;
