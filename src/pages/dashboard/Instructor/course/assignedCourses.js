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
    getCourses()
    // setLoading(false);
  }, [])

  // closing of the pop up
  const handleOnClose = () => {
    // setShowAddPop(false);
  };


  function getCourses() {
    const token = Cookies.get('token');
    axios({
      method: "get",
      url: `${BASEURL}/courses`,
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

        setAssignedCourses(res.data.courses);
        




      })
      .catch((err) => {
        console.log(err);
        if (err && err instanceof Error) {
          alert(`${err.message} making the request`)
          // alert(err.response?.data.msg);
        } else if (err && err instanceof AxiosError) {
          alert(err.message)
        } else {
          alert('Error')
        }
        // props.handleAlert(false, e.response.data ? e.response.data : e.message, 'danger');
      });
  }

  const [courses, setCourses] = useState(initialCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Featured");
  const [showCourse, setShowCourse] = useState("hidden");

  const [selectedCourse, setSelectedCourse] = useState(null);
  const ref = useRef(true);

//   useEffect(() => {
//     if(ref.current) {
//       axios({
//         method: 'get',
//         url: `${BASEURL}/courses`,
//         // url: `http://localhost:5001/api/courses`,
//         headers: {
//           'Content-Type': 'application/json',
//           // Authorization: `Bearer ${token}`
//         }
//       }).then(res => {
//         console.log(res)
//         setCourses(prev => ([
//           ...prev,
//           ...res.data.courses
//         ]))
//       })
//       .catch(err => {
//         console.log(err);
//         if (err && err instanceof Error && !AxiosError) {
//           alert(err.response?.data.msg);
//         } else if (err && err instanceof AxiosError) {
//           // err.response?.data ? alert(err.response?.data) : alert(err.message)
//           alert(err.message)
//         } else {
//           alert('Error')
//         }
//       });
      
//     }
//     return () => (ref.current = false);
//   }, [])
console.log(courses)
  const handleViewDetails = (course) => {
    setShowCourse("block");
    setSelectedCourse(course);
    document.body.style.overflow = "hidden";
  };

  const handleCloseDetails = () => {
    setShowCourse("hidden");
    setSelectedCourse(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="px-4 py-4 pb-20 md:px-8 lg:px-16 xl:px-20">

      <h2 className="mt-6 text-xl font-bold text-center md:text-4xl md:mt-10">
        Assigned Courses
      </h2>

        

      {/* Display courses */}
      <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 md:grid-cols-3">
        {assignedCourses.map((course) => (
          <div
            className="overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleViewDetails(course)}
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