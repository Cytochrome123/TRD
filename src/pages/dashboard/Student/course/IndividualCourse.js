import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertContext } from "../../../../App";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
// import { useOutletContext } from 'react-router-dom';



const IndividualCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    duration: '',
    start_date: '',
    end_date: '',
    location: '',
    capacity: '',
    amount: '',
    image: null,
  })

  const navigate = useNavigate()

  const { id } = useParams();
  // const [isSidebarOpen] = useOutletContext();
  const { notify } = useContext(AlertContext)



  // const clickedCourse = courses.find(
  //   (eachCourse) => eachCourse._id === (id)
  //   // (eachCourse) => eachCourse.id == (id)
  //   );



  // test data fetch start
  useEffect(() => {
    const token = Cookies.get('token');
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVERURL}/course/${id}`,
      headers: {
        // 'Content-Type': 'text/html',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      // withCredentials: true
    })
      .then((res) => {
        console.log("abc", res.data);
        setCourse(prev => ({
          ...prev,
          title: res.data.data.title,
          description: res.data.data.description,
          duration: res.data.data.duration,
          start_date: res.data.data.start_date,
          end_date: res.data.data.end_date,
          location: res.data.data.location,
          capacity: res.data.data.capacity,
          amount: res.data.data.amount,
          image: `${process.env.REACT_APP_SERVERURL}/file/${res.data.data.image?.path}`,
        }))
        // console.log("url", url)
        // const studentData = res.data.students
        // setItems(() => res.data.students)

      })
      .catch((err) => {
        console.log(err.message);
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

  }, []);

  //   const clickedInstructor = instructorList.find(
  //     (eachInstructor) => eachInstructor._id === (id)
  //   );
  // Responsible for the scrolling up of the nasted route in the dashboard
  useEffect(() => {


    window.scroll(0, 0)
  }, []);



  return (
    <div>
      {/* <SideBar /> */}
      <div className={`min-h-screen md:ml-72 my-32 w-[900px]`}>
        <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:w-1/3 md:pr-4">
              <img
                src={course.image}
                alt={course.title}
                className="object-cover w-full mb-4 h-60"
              />
              <div className="flex items-center m-2 md:justify-between">
                <button
                  onClick={() => navigate(-1)}
                  // className="px-4 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 md:text-base"
                  className="border border-blue-500 bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
                >
                  Back
                </button>
                <div className="absolute hidden p-2 text-sm text-gray-700 bg-gray-100 rounded shadow-md group-hover:block">
                  Go back to the previous page
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="mb-2 text-2xl font-semibold text-blue-600">
                {course.title}
              </h2>
              <p className="mb-2 text-gray-600">Capacity: {course.capacity}</p>
              <p className="mb-2 text-gray-600">{course.description}</p>
              <p className="mb-2 text-gray-600">Duration: {course.duration}</p>
              <p className="mb-2 text-gray-600">Location: {course.location}</p>
              <p className="mb-2 text-gray-600">Start Date: {course.start_date}</p>
              <p className="mb-2 text-gray-600">End Date: {course.end_date}</p>
              <div className="flex justify-end m-2">
                <button
                  className="px-4 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 md:text-base"
                >
                  Delete Course
                </button>
                <div className="absolute hidden p-2 text-sm text-gray-700 bg-gray-100 rounded shadow-md group-hover:block">
                  This Course will be deleted
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-col items-center p-6">
          <div className="w-full p-8 bg-white rounded-lg shadow-lg sm:w-2/3 md:w-3/4 lg:w-1/2 xl:w-2/3">

            <div className="">
              <h2 className="text-2xl font-semibold text-gray-900">Requirments</h2>
              <ul className="mt-2">
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">*</span>
                </li>
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">*</span>
                </li>
              </ul>
            </div>


          </div>

        </div>
        <div className="flex flex-col items-center p-6">
          <div className="w-full p-8 bg-white rounded-lg shadow-lg sm:w-2/3 md:w-3/4 lg:w-1/2 xl:w-2/3">

            <div className="">
              <h2 className="text-2xl font-semibold text-gray-900">Course Materials</h2>
              <ul className="mt-2">
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">*</span>
                </li>
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">*</span>
                </li>
              </ul>
            </div>


          </div>

        </div>
      </div>
    </div>
  )
}

export default IndividualCourse








