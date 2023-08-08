import { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios, { AxiosError } from "axios";
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
// import CourseCard from "../component/courseCard";

import cookies from "js-cookie";

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
    <div className="px-4 py-4 md:px-8 lg:px-16 xl:px-20 pb-20">
      {selectedCourse && (
        <CourseDetails
          title={selectedCourse.title}
          className={showCourse}
          image={selectedCourse.image}
          description={selectedCourse.description}
          duration={selectedCourse.duration}
          onClose={handleCloseDetails}
        />
      )}

      <h2 className="text-xl md:text-4xl text-center font-bold mt-6 md:mt-10">
        Courses
      </h2>
      {/* Search bar */}
      <div className="w-full flex justify-center mt-6">
        <form
          className="w-4/5 md:w-3/5 p-2 md:p-3 flex flex-row items-center bg-gray-100 border border-gray-300 rounded-lg"
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
          <BsSearch className="text-2xl text-blue-600 ml-2" />
        </form>
      </div>

      {/* Category buttons */}
      <div className="flex flex-wrap align-middle mt-6 space-y-2 md:space-y-0 space-x-2">
        {/* Weird fix */}
        <div className="hidden"></div>

        <button
          className={`px-3 py-2 md:text-sm text-xs rounded-full text-blue-600 ${
            selectedCategory === "Featured"
              ? "bg-blue-600 text-white hover:bg-blue-500 transition duration-300 ease-in-out"
              : "border border-blue-500"
          }`}
          onClick={() => handleCategoryClick("Featured")}
        >
          <AiFillStar />
        </button>
        <button
          className={`px-3 py-2 md:text-sm text-xs rounded-full  ${
            selectedCategory === null
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
              className={`py-2 px-4 md:text-sm text-xs rounded-full  ${
                selectedCategory === category
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {filteredCourses.map((course) => (
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onClick={() => handleViewDetails(course)}
            key={course.id}
          >
            <div className="overflow-hidden h-44">
              <img
                className="w-full h-full object-cover"
                src={course.image}
                alt=""
              />
            </div>
            <div className="px-4 py-4">
              <div className="text-xs text-slate-600 mb-3 rounded-full bg-slate-300 w-max py-2 px-3">
                {course.category}
              </div>
              <h3 className="text-gray-800 text-lg font-bold mb-5">
                {course.title}
              </h3>
              <div className="flex flex-row justify-between items-center space-x-2">
                <div className="flex items-center space-x-2 text-slate-700 text-sm">
                  {" "}
                  <LuCalendarClock className=" text-xl" />
                  <span>{course.duration}</span>
                </div>
                <span
                  className="text-sm font-medium text-blue-500 hover:text-blue-600 cursor-pointer transition duration-300 ease-in-out"
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
