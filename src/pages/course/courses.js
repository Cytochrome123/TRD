import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { Form, Button } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import { BsSearch } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { LuCalendarClock } from "react-icons/lu";
import CourseHTML from "../../images/html.jpg";
import CourseExcel from "../../images/excel.png";
import CourseWord from "../../images/word.jpg";
import CourseDAP from "../../images/dapython.jpg";
import CoursePHP from "../../images/PHP.jpg";
import CoursePython from "../../images/python.jpg";
import CoursePPT from "../../images/powerpoint.jpg";
import CourseReact from "../../images/react.jpg";
import CourseDetails from "../../component/CourseDetails";
// import CourseCard from "../component/courseCard

import cookies from "js-cookie";
import { BASEURL } from "../../App";

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
      id: 1,
      title: "Microsoft Word for Beginners",
      category: "Introduction to I.C.T.",
      image: CourseWord,
      featured: true,
      duration: "2 weeks",
      description:
        "Master Microsoft Word basics to create and edit documents with confidence.",
    },
    {
      id: 2,
      title: "HTML, CSS, and JavaScript Fundamentals",
      category: "Web Development",
      image: CourseHTML,
      featured: true,
      duration: "4 weeks",
      description:
        "Build web pages with HTML, style them with CSS, and add interactivity with JavaScript.",
    },
    {
      id: 3,
      title: "Data Analysis with Python",
      category: "Data Science",
      image: CourseDAP,
      duration: "6 weeks",
      description:
        "Analyze data using Python, from data manipulation to visualization.",
    },
    {
      id: 4,
      title: "Excel Mastery: Data Management and Analysis",
      category: "Introduction to I.C.T.",
      image: CourseExcel,
      featured: true,
      duration: "3 weeks",
      description:
        "Excel skills for data management, formulas, and generating insights.",
    },
    {
      id: 5,
      title: "PHP and MySQL: Dynamic Web Development",
      category: "Web Development",
      image: CoursePHP,
      duration: "5 weeks",
      description:
        "Create dynamic web apps using PHP and connect to MySQL databases.",
    },
    {
      id: 6,
      title: "Introduction to Python Programming",
      category: "Data Science",
      image: CoursePython,
      featured: true,
      duration: "4 weeks",
      description: "Learn Python basics for programming and problem-solving.",
    },
    {
      id: 7,
      title: "Crafting Engaging Presentations with PowerPoint",
      category: "Introduction to I.C.T.",
      image: CoursePPT,
      duration: "2 weeks",
      description: "Design captivating presentations using PowerPoint.",
    },
    {
      id: 8,
      title: "Introduction to React: Building Modern Web Apps",
      category: "Web Development",
      image: CourseReact,
      featured: true,
      duration: "6 weeks",
      description:
        "Create interactive web apps with React's component-based architecture.",
    },
  ];

  const [courses, setCourses] = useState(initialCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Featured");
  const [showCourse, setShowCourse] = useState("hidden");

  const [selectedCourse, setSelectedCourse] = useState(null);
  const ref = useRef(true);

  useEffect(() => {
    if(ref.current) {
      axios({
        method: 'get',
        url: `${BASEURL}/courses`,
        // url: `http://localhost:5001/api/courses`,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res)
        setCourses(prev => ([
          ...prev,
          ...res.data.courses
        ]))
      })
      .catch(err => {
        console.log(err);
        if (err && err instanceof Error && !AxiosError) {
          alert(err.response?.data.msg);
        } else if (err && err instanceof AxiosError) {
          // err.response?.data ? alert(err.response?.data) : alert(err.message)
          alert(err.message)
        } else {
          alert('Error')
        }
      });
      
    }
    return () => (ref.current = false);
  }, [])
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

  const filteredCourses = selectedCategory
    ? selectedCategory === "Featured"
      ? courses.filter((course) => course.featured === true)
      : courses.filter((course) => course.category === selectedCategory)
    : courses;

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
    <div className="px-4 py-4 pb-20 md:px-8 lg:px-16 xl:px-20">
      {selectedCourse && (
        <CourseDetails
          id={selectedCourse._id}
          title={selectedCourse.title}
          className={showCourse}
          image={selectedCourse.image}
          description={selectedCourse.description}
          duration={selectedCourse.duration}
          onClose={handleCloseDetails}
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
          (category) => (
            <button
              key={category}
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
        {filteredCourses.map((course) => (
          <div
            className="overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleViewDetails(course)}
            key={course.id}
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
