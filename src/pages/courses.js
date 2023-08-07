import { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import { BsSearch } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import CourseHTML from "../images/html.jpg";
import CourseExcel from "../images/excel.png";
import CourseIMG from "../images/excel.png";
import CourseWord from "../images/word.jpg";
import CourseDAP from "../images/dapython.jpg";
import CoursePHP from "../images/PHP.jpg";
import CoursePython from "../images/python.jpg";
import CoursePPT from "../images/powerpoint.jpg";
import CourseReact from "../images/react.jpg";

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
      title: "Microsoft word for beginners",
      category: "Introduction to I.C.T.",
      image: CourseWord,
      featured: true,
    },
    {
      id: 2,
      title: "HTML, CSS and Javascript",
      category: "Web development",
      image: CourseHTML,
      featured: true,
    },
    {
      id: 3,
      title: "Data analysis with python",
      category: "Data science",
      image: CourseDAP,
    },
    {
      id: 4,
      title: "Working with microsoft excel",
      category: "Introduction to I.C.T.",
      image: CourseExcel,
      featured: true,
    },
    {
      id: 5,
      title: "PHP and MySQL",
      category: "Web development",
      image: CoursePHP,
    },
    {
      id: 6,
      title: "Introduction to python",
      category: "Data science",
      image: CoursePython,
      featured: true,
    },
    {
      id: 7,
      title: "Powerpoint presentation",
      category: "Introduction to I.C.T.",
      image: CoursePPT,
    },
    {
      id: 8,
      title: "Introduction to react",
      category: "Web development",
      image: CourseReact,
      featured: true,
    },
  ];

  const [courses, setCourses] = useState(initialCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Featured");

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
    <div className="px-8 py-8 lg:px-16 xl:px-20 pb-20">
      <h2 className="text-2xl md:text-4xl w-full text-slate-900 flex justify-center font-bold mt-10 md:mt-16">
        Courses
      </h2>
      {/* Search bar */}
      <div className="w-full flex justify-center mt-10">
        <form
          className="w-3/6 p-3 flex flex-row gap-23justify-between bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            className="focus:outline-none bg-transparent w-full"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(event) => {
              handleSearch(event);
            }}
          />

          <BsSearch className="text-2xl text-blue-600" />
        </form>
      </div>

      <div className="flex mt-8 space-x-4">
        <button
          className={`p-3 text-sm rounded-full text-blue-600 ${
            selectedCategory === "Featured"
              ? "bg-blue-600 text-white hover:bg-blue-500 transition duration-300 ease-in-out"
              : "border border-blue-500"
          }`}
          onClick={() => handleCategoryClick("Featured")}
        >
          <span>
            <AiFillStar />
          </span>
        </button>
        <button
          className={`py-2 px-4 text-sm rounded-full  ${
            selectedCategory === null
              ? "bg-blue-600 text-white hover:bg-blue-500 transition duration-300 ease-in-out"
              : "border border-blue-500 text-slate-500"
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          All Categories
        </button>
        {Array.from(new Set(courses.map((course) => course.category))).map(
          (category) => (
            <button
              key={category}
              className={`py-2 px-4 text-sm rounded-full  ${
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
      <div className="grid grid-cols-3 gap-6 mt-16">
        {filteredCourses.map((course) => (
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            key={course.id}
          >
            <div className="overflow-hidden h-44">
              <img className="" src={course.image} alt="" />
            </div>
            <div className="px-4 py-4">
              <h3 className="text-gray-800 text-xl font-bold">
                {course.title}
              </h3>
              <p className="mt-1 text-gray-600 text-sm">{course.category}</p>
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
