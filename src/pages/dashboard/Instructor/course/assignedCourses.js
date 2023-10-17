import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { Form, Button } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import { BsSearch } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { LuCalendarClock } from "react-icons/lu";
import CourseHTML from "../../../../images/html.jpg";
import CourseExcel from "../../../../images/excel.png";
import CourseWord from "../../../../images/word.jpg";
import CourseDAP from "../../../../images/dapython.jpg";
import CoursePHP from "../../../../images/PHP.jpg";
import CoursePython from "../../../../images/python.jpg";
import CoursePPT from "../../../../images/powerpoint.jpg"
import CourseReact from "../../../../images/react.jpg";
import CourseDetails from "../../../../component/CourseDetails";
// import CourseCard from "../component/courseCard

import Cookies from "js-cookie";
import { BASEURL } from "../../../../App";

const AssignedCourses = () => {
    
    const initialCourses = [
      {
        _id: 1,
        title: "Microsoft Word for Beginners",
        category: "Introduction to I.C.T.",
        image: CourseWord,
        featured: true,
        duration: "2 weeks",
        description:
          "Master Microsoft Word basics to create and edit documents with confidence.",
      },
      {
        _id: 2,
        title: "HTML, CSS, and JavaScript Fundamentals",
        category: "Web Development",
        image: CourseHTML,
        featured: true,
        duration: "4 weeks",
        description:
          "Build web pages with HTML, style them with CSS, and add interactivity with JavaScript.",
      },
      {
        _id: 3,
        title: "Data Analysis with Python",
        category: "Data Science",
        image: CourseDAP,
        duration: "6 weeks",
        description:
          "Analyze data using Python, from data manipulation to visualization.",
      },
      {
        _id: 4,
        title: "Excel Mastery: Data Management and Analysis",
        category: "Introduction to I.C.T.",
        image: CourseExcel,
        featured: true,
        duration: "3 weeks",
        description:
          "Excel skills for data management, formulas, and generating insights.",
      },
    ];
    const [assignedCourses, setAssignedCourses] = useState(initialCourses);
    
    const navigate = useNavigate()

  useEffect(() => {
    getAssignedCourses()
    // setLoading(false);
  }, [])

  // closing of the pop up
  const handleOnClose = () => {
    // setShowAddPop(false);
  };


  const ref = useRef(true);

  console.log(assignedCourses)


  function getAssignedCourses() {
    const token = Cookies.get('token');
    axios({
      method: "get",
      url: `${BASEURL}/assigned-courses`,
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
          ...res.data.assignedcourses,
          ...initialCourses
        ]));

      })
      .catch((err) => {
        console.log(err);
        if(Array.isArray(err.response?.data.msg)){
          alert(err.response.data.msg[0].msg);
        } else if (err.response) {
          alert(err.response.data.msg);
        } else {
          // err.response?.data ? alert(err.response?.data) : alert(err.message)
          alert(err.message)
        }
        // props.handleAlert(false, e.response.data ? e.response.data : e.message, 'danger');
      });
  }

  return (
    <div className="px-4 py-4 pb-20 mt-10 md:px-8 lg:px-16 xl:px-20">

      <h2 className="mt-6 text-xl font-bold md:text-4xl md:mt-10">
        Assigned Courses
      </h2>

        

      {/* Display courses */}
      <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 md:grid-cols-3">
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
  );
};

export default AssignedCourses;