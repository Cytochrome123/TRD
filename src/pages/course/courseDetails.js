import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import instructor from "../../Data/Instructor";
import { AuthContext, BASEURL } from "../../App";
// import imgCallback from "../../images/profile.jpeg";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useState } from "react";



const CourseDetails = () => {
  // const { courses, setCourses } = useContext(AuthContext);
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
  // const {id}  = useParams();

  console.log("id object", id);
  const params = { id }
  console.log("params", params);


  // const clickedCourse = courses.find(
  //   (eachCourse) => eachCourse._id === (id)
  //   // (eachCourse) => eachCourse.id == (id)
  //   );



  // test data fetch start
  useEffect(() => {
    const token = Cookies.get('token');
    axios({
      method: "get",
      url: `${BASEURL}/course/${id}`,
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
          title: res.data.course.title,
          description: res.data.course.description,
          duration: res.data.course.duration,
          start_date: res.data.course.start_date,
          end_date: res.data.course.end_date,
          location: res.data.course.location,
          capacity: res.data.course.capacity,
          amount: res.data.course.amount,
          image: `https://trd-server.onrender.com/api/file/${res.data.course.image.path}`,
        }))
        // console.log("url", url)
        // const studentData = res.data.students
        // setItems(() => res.data.students)

      })
      .catch((err) => {
        console.log(err.message);
        if (err && err instanceof Error) {
          // alert(err.response?.err.message);
          alert(`${err.message} `)
          console.log("www", err.response);
        } else if (err && err instanceof AxiosError) {
          alert(err.message)
        } else {
          alert('Error')
        }
        // props.handleAlert(false, e.response.data ? e.response.data : e.message, 'danger');
      });

  }, []);

  //   const clickedInstructor = instructorList.find(
  //     (eachInstructor) => eachInstructor._id === (id)
  //   );
  // Responsible for the scrolling up of the nasted route in the dashboard
  useEffect(() => {


    window.scroll(0, 0)
  }, [])

  return (
    <div className="h-screen">
      <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:w-1/3 md:pr-4">
            <img
              src={course.image}
              alt={course.title}
              className="object-cover w-full mb-4 h-60"
            />
          </div>
          <div className="md:w-2/3">
            <div className="flex items-center m-2 md:justify-between">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 md:text-base"
              >
                Back
              </button>
              <div className="absolute hidden p-2 text-sm text-gray-700 bg-gray-100 rounded shadow-md group-hover:block">
                Go back to the previous page
              </div>
            </div>
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

          <div className="mt-6">
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
    </div>
  )
}

export default CourseDetails








