import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useQuery } from '@tanstack/react-query';
// import { Form, Button } from "react-bootstrap";
import axios from "axios";
// import { BsSearch } from "react-icons/bs";
// import { AiFillStar } from "react-icons/ai";
import { LuCalendarClock } from "react-icons/lu";
import CourseHTML from "../../../../images/html.jpg";
import CourseExcel from "../../../../images/excel.png";
import CourseWord from "../../../../images/word.jpg";
import CourseDAP from "../../../../images/dapython.jpg";
// import CourseCard from "../component/courseCard

import Cookies from "js-cookie";
import { AlertContext } from "../../../../App";
// import { useOutletContext } from 'react-router-dom';

const AssignedCourses = () => {

  // const [assignedCourses, setAssignedCourses] = useState(initialCourses);
  const [assignedCourses, setAssignedCourses] = useState([]);
  // const [isSidebarOpen] = useOutletContext();
  const {notify} = useContext(AlertContext)


  const navigate = useNavigate()

  useEffect(() => {
    getAssignedCourses()
    // setLoading(false);
  }, [])

  // closing of the pop up
  // const handleOnClose = () => {
    // setShowAddPop(false);
  // };


  // const ref = useRef(true);

  console.log(assignedCourses)


  function getAssignedCourses() {
    const token = Cookies.get('token');
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVERURL}/admin/assigned-courses`,
      headers: {
        // 'Content-Type': 'text/html',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      // withCredentials: true
    })
      .then((res) => {
        console.log("xxx created-courses", res.data);
        // const allPost = [newPost, ...courses]

        // setAssignedCourses(initialCourses.push(res.data.assignedcourses));
        setAssignedCourses(prev => ([
          ...res.data.data,
          // ...initialCourses
        ]));

      })
      .catch((err) => {
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
  }

  return (
    <div>
      {/* <SideBar /> */}
      <div className={`p-4 md:ml-72 my-20 min-h-screen`}>
        {/* <div className="px-4 py-4 pb-20 my-32 md:px-8 lg:px-16 xl:px-20"> */}

        <h2 className="mt-6 text-xl font-bold md:text-4xl md:mt-10">
          Assigned Courses
        </h2>



        {/* Display courses */}
        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 md:grid-cols-3">
          {!assignedCourses.length && <p>You're yet to be assigned a course</p>}
          {assignedCourses.map((course) => (
            <div
              className="overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer"
              key={course._id}
            >
              <div className="overflow-hidden h-44">
                <img
                  className="object-cover w-full h-full"
                  src={course.image}
                  alt=""
                />
              </div>
              <div className="px-4 py-4">
                <div className="px-3 py-2 mb-3 text-xs rounded-full text-slate-600 bg-slate-300 w-max">
                  {course.category}
                </div>
                <h3 className="mb-5 text-lg font-bold text-gray-800">
                  {course.title}
                </h3>
                <div className="flex flex-row items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    {" "}
                    <LuCalendarClock className="text-xl " />
                    <span>{course.duration}</span>
                  </div>
                  <span
                    className="text-sm font-medium text-blue-500 transition duration-300 ease-in-out cursor-pointer hover:text-blue-600"
                    onClick={() => navigate(`/instructor/dashboard/assigned-course/${course._id}`)}
                  >
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignedCourses;