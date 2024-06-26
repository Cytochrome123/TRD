// CourseForm.js
import { useContext, useState } from 'react';
import { AlertContext } from "../App";
import Icon_x from "../assets/Icons/x-close.png";
import axios from 'axios';
import cookies from 'js-cookie';
import Loader from '../component/Loader';




const AddCourseForm = ({ onClose, onData }) => {
  // const { courses, setCourses, setShouldMakeApiCall } = useContext(AuthContext)
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    duration: '',
    start_date: '',
    end_date: '',
    location: '',
    capacity: '',
    amount: '',
    isModuleZero: false,
    image: null, //should I change this to empty string ni? 
  });
  const [loading, setLoading] = useState(false)

  const { notify } = useContext(AlertContext)

  const token = cookies.get('token')
  const temp = cookies.get('temp');

  const handleChange = (event) => {
    setCourseData(prevData => (
      {
        ...prevData,
        [event.target.name]: event.target.value,
      }
    ));
  };

  const handleCheck = e => {
    setCourseData(prev => ({
      ...prev,
      isModuleZero: e.target.checked
    }))
  }
  console.log(courseData, 'dta')
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);

  const onFileChange = (e) => {

    const file = e.target.files[0]

    if (!file) {
      setError('No file selected');
      return;
    }

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 500 * 1024; // 500 KB in bytes

    if (!validTypes.includes(file.type)) {
      setError('Only PNG, JPG, and JPEG files are allowed');
      // Clear the input field
      e.target.value = '';
      return;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 500 KB');
      // Clear the input field
      e.target.value = '';
      return;
    }

    // Proceed with file processing
    console.log('Selected file:', file);
    // You can handle file upload or any other logic here
    // if (file) {
    setCourseData(prevData => (
      {
        ...prevData,
        image: file
      }
    ));
    setSelectedImage(URL.createObjectURL(file));
    // };

  };


  //   HandleAddCourse
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    console.log(token, 'ADDCOuse token');
    console.log(temp, 'ADDCOuse temp');
    console.log(courseData, 'datacourse')
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVERURL}/admin/course`,
      data: courseData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
      // withCredentials: true
    })
      .then((res) => {
        notify('success', res.data.message);
        console.log("xxx created-courses", res.data.message);
        setLoading(false)
        setCourseData(prev => ({
          ...prev,
          title: '',
          description: '',
          duration: '',
          start_date: '',
          end_date: '',
          location: '',
          capacity: '',
          amount: '',
          isModuleZero: false,
          image: null, //should I change this to empty string ni? 
        }))
        onClose();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (Array.isArray(err.response?.data.message)) {
          notify('error', err.response.data.errors[0].msg);
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
    // // Axios request end




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
      {loading && <Loader />}
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
                type="date"
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
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="end_date">
                End Date
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="date"
                id="end_date"
                name="end_date"
                value={courseData.end_date}
                onChange={handleChange}
                placeholder="end date"
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
                Amount
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="number"
                id="amount"
                name="amount"
                value={courseData.amount}
                onChange={handleChange}
                placeholder='Amount'
                required
              />
            </div>

            <div className="mb-1 flex align-center py-3 gap-2">
              <input type='checkbox' name='isModuleZero' checked={courseData.isModuleZero} onChange={handleCheck} />
              <label className="block font-semibold text-gray-600" htmlFor="enrollmentDate">
                Module 0
              </label>
            </div>

          </div>
          {/* second section end */}


        </div>
        {/* overall 2 side end */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-600" htmlFor="image">
            Image
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
            required
          />
        </div>
        <p className="text-red-500">{error}</p>
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
