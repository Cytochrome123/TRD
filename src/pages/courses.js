import { useContext, useEffect, useRef, useState } from "react";
// import { useLoaderData, useNavigation } from "react-router-dom";
// import { useQuery } from '@tanstack/react-query';
// import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { LuCalendarClock } from "react-icons/lu";
import CourseHTML from "../images/html.jpg";
import CourseExcel from "../images/excel.png";
import CourseWord from "../images/word.jpg";
import CourseDAP from "../images/dapython.jpg";
import CoursePHP from "../images/PHP.jpg";
import CoursePython from "../images/python.jpg";
import CoursePPT from "../images/powerpoint.jpg";
import CourseReact from "../images/react.jpg";
import CourseDetails from "../component/CourseDetails";
// import CourseCard from "../component/courseCard

import { AlertContext } from "../App";

const Courses = () => {
  // const courses = useLoaderData();
  // const navigation = useNavigation();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (navigation.state === "loading") {
  //     setLoading(true);
  //     return;
  //   }

  //   setLoading(false);
  // }, [navigation.state]);

  // const token = cookies.get('token');
  


  const initialCourses = [
    {
      _id: 1,
      title: "Microsoft Word for Beginners",
      category: "Introduction to I.C.T.",
      // image: CourseWord,
      image: {
        imageID: 1,
        path: CourseWord
        
      },
      featured: true,
      duration: "2 weeks",
      description:
        "Master Microsoft Word basics to create and edit documents with confidence.",
    },
    {
      _id: 2,
      title: "HTML, CSS, and JavaScript Fundamentals",
      category: "Web Development",
      // image: CourseHTML,
      image: {
        imageID: 2,
        path: CourseHTML
        
      },
      featured: true,
      duration: "4 weeks",
      description:
        "Build web pages with HTML, style them with CSS, and add interactivity with JavaScript.",
    },
    {
      _id: 3,
      title: "Data Analysis with Python",
      category: "Data Science",
      // image: CourseDAP,
      image: {
        imageID: 3,
        path: CourseDAP
        
      },
      duration: "6 weeks",
      description:
        "Analyze data using Python, from data manipulation to visualization.",
    },
    {
      _id: 4,
      title: "Excel Mastery: Data Management and Analysis",
      category: "Introduction to I.C.T.",
      image: CourseExcel,
      image: {
        imageID: 4,
        path: CourseExcel
        
      },
      featured: true,
      duration: "3 weeks",
      description:
        "Excel skills for data management, formulas, and generating insights.",
    },
    {
      _id: 5,
      title: "PHP and MySQL: Dynamic Web Development",
      category: "Web Development",
      // image: CoursePHP,
      image: {
        imageID: 5,
        path: CoursePHP
        
      },
      duration: "5 weeks",
      description:
        "Create dynamic web apps using PHP and connect to MySQL databases.",
    },
    {
      _id: 6,
      title: "Introduction to Python Programming",
      category: "Data Science",
      // image: CoursePython,
      image: {
        imageID: 6,
        path: CoursePython
        
      },
      featured: true,
      duration: "4 weeks",
      description: "Learn Python basics for programming and problem-solving.",
    },
    {
      _id: 7,
      title: "Crafting Engaging Presentations with PowerPoint",
      category: "Introduction to I.C.T.",
      // image: CoursePPT,
      image: {
        imageID: 7,
        path: CoursePPT
        
      },
      duration: "2 weeks",
      description: "Design captivating presentations using PowerPoint.",
    },
    {
      _id: 8,
      title: "Introduction to React: Building Modern Web Apps",
      category: "Web Development",
      // image: CourseReact,
      image: {
        imageID: 8,
        path: CourseReact
        
      },
      featured: true,
      duration: "6 weeks",
      description:
        "Create interactive web apps with React's component-based architecture.",
    },
  ];

  // const [courses, setCourses] = useState(initialCourses);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Featured");
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCourse, setShowCourse] = useState("hidden");

  const [selectedCourse, setSelectedCourse] = useState(null);
  const ref = useRef(true);
  const { notify } = useContext(AlertContext)



  useEffect(() => {
    if(ref.current) {
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_SERVERURL}/courses`,
        // url: `http://localhost:5001/api/courses`,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`
        }
      }).then(res => {
        // console.log(res)
        // const p = [...courses];
        // p.unshift(...res.data.data)
        // setCourses(p)
        setCourses(prev => ([
          ...res.data.data,
          ...prev,
        ]))
      })
      .catch(err => {
        console.log(err);
        // if (err && err instanceof Error && !AxiosError) {
        //   alert(err.response?.data.msg);
        // } else if (err && err instanceof AxiosError) {
        //   // err.response?.data ? alert(err.response?.data) : alert(err.message)
        //   alert(err.message)
        // } else {
        //   alert('Error')
        // }
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
    return () => (ref.current = false);
  }, [])

  // console.log(courses);

  const fetchModule0 = () => {
    const moduleZero = courses.find(course => course.isModuleZero);
    console.log(moduleZero, 'MODULEZERO')
    setShowCourse("block");
    setSelectedCourse(moduleZero);
    document.body.style.overflow = "hidden";
  }
  
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

  const handleSearch = (event) => {
    const newSearchQuery = event.target.value || "";
    setSearchQuery(newSearchQuery);

    const filtered = initialCourses.filter((course) =>
      course.title.toLowerCase().includes(newSearchQuery.toLowerCase())
    );
    setCourses(filtered);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === "Featured" ? "Featured" : category);
  };

  let filteredCourses = selectedCategory
    ? selectedCategory === "Featured"
      ? courses.filter((course) => course.featured === true)
      : courses.filter((course) => course.category === selectedCategory)
    : courses;

  // filteredCourses = [...filteredCourses, ...courses]

  // if (loading) {
  //   return (
  //     <div>
  //       <p>All Courses</p>
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "space-between",
  //           gap: "10px",
  //         }}
  //       >
  //         <Form.Control
  //           type="email"
  //           placeholder="name@example.com"
  //           style={{ width: "10rem" }}
  //         />
  //         <Button variant="primary" onClick={handleSearch}>
  //           Find
  //         </Button>
  //         <Form.Select size="sm" style={{ width: "12rem" }}>
  //           <option>Upcoming</option>
  //         </Form.Select>
  //       </div>
  //       <h1>Loading....</h1>
  //     </div>
  //   );
  // }

  return (
    <div className="px-4 py-4 pb-20 my-16 md:px-8 lg:px-16 xl:px-20 min-h-screen">
      {selectedCourse && (
        <CourseDetails
          id={selectedCourse._id}
          title={selectedCourse.title}
          className={showCourse}
          image={selectedCourse.image.path}
          description={selectedCourse.description}
          duration={selectedCourse.duration}
          onClose={handleCloseDetails}
          isModuleZero={selectedCourse.isModuleZero}
          fetchModule0={fetchModule0}
        />
      )}

      <h2 className="mt-6 text-xl font-bold text-center md:text-4xl md:mt-10">
        Courses
      </h2>
      {/* Search bar */}
      <div className="flex justify-center w-full mt-6">
        <form
          className="flex flex-row items-center w-4/5 p-2 bg-gray-100 border border-gray-300 rounded-lg md:w-3/5 md:p-3"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            className="flex-1 bg-transparent outline-none"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(event) => {
              handleSearch(event);
            }}
          />
          <BsSearch className="ml-2 text-2xl text-blue-600" />
        </form>
      </div>

      {/* Category buttons */}
      <div className="flex flex-wrap mt-6 space-x-2 space-y-2 align-middle md:space-y-0">
        {/* Weird fix */}
        <div className="hidden"></div>

        <button
          className={`px-3 py-2 md:text-sm text-xs rounded-full text-blue-600 ${selectedCategory === "Featured"
              ? "bg-blue-600 text-white hover:bg-blue-500 transition duration-300 ease-in-out"
              : "border border-blue-500"
            }`}
          onClick={() => handleCategoryClick("Featured")}
        >
          <AiFillStar />
        </button>
        <button
          className={`px-3 py-2 md:text-sm text-xs rounded-full  ${selectedCategory === null
              ? "bg-blue-600 text-white hover:bg-blue-500 transition duration-300 ease-in-out"
              : "border border-blue-500 text-gray-700"
            }`}
          onClick={() => handleCategoryClick(null)}
        >
          All Categories
        </button>
        {Array.from(new Set(courses.map((course) => course.category))).map(
          (category, i) => (
            <button
              key={i}
              className={`py-2 px-4 md:text-sm text-xs rounded-full  ${selectedCategory === category
                  ? "bg-blue-600 text-white hover:bg-blue-500 transition duration-300 ease-in-out"
                  : "border border-blue-500 text-slate-500"
                }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* Display courses */}
      <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 md:grid-cols-3">
        {filteredCourses.map((course, i) => (
          <div
            className="overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleViewDetails(course)}
            key={i}
          >
            <div className="overflow-hidden h-44">
            {console.log(course.image)}
              <img
                className="object-cover w-full h-full"
                // src={course.image}
                src={`${course.image?.path}`.includes('/s') ? `${course.image?.path}` : `${process.env.REACT_APP_SERVERURL}/file/${course.image?.path}`}
                alt="Pic"
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
                  onClick={() => handleViewDetails(course)}
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

export default Courses;

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
//       alert(error.request.response)
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error('Error:', error.message);
//       alert(error.message)
//     }
//     return Promise.reject(error);
//   }
// );

// export const loadCourses = async () => {
//   try {
//     const token = cookies.get("token");
//     if (!token) {
//       // Redirect to the login page or handle unauthorized access
//       return [];
//     }

//     const res = await axios.get("http://localhost:5001/api/courses", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return res.data.courses;
//   } catch (err) {
//     console.log(err);
//     if (err && err instanceof AxiosError) {
//       alert(err.message);
//     } else if (err && err.response && err.response.data) {
//       alert(err.response.data.message);
//     } else {
//       alert("Error");
//     }
//     return [];
//   }
// };
