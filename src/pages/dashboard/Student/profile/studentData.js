import { useContext, useEffect, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";

// import { process.env.REACT_APP_SERVERURL } from "../../../App";
import { AlertContext } from "../../../../App";
// import course_img from "../../../images/trd_img.png";
// import { useNavigate } from "react-router-dom";
// import { useOutletContext } from 'react-router-dom';


const StudentData = () => {
  // const [courses, setCourses] = useState([]);
  const [data, setData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    userType: "",
    courses: [],
  });

  // const [isSidebarOpen] = useOutletContext();
  const { notify } = useContext(AlertContext)


  // const navigate = useNavigate();
  useEffect(() => {
    const token = cookies.get("token");
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVERURL}/me`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data.data, 'data');
        setData((prev) => ({
          ...prev,
          // id: res.data.data._doc._id,
          id: res.data.data._id,
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          email: res.data.data.email,
          phoneNumber: res.data.data.phoneNumber,
          userType: res.data.data.userType,
          courses: res.data.data.enrolled_courses,
        }));
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
  }, []);

  return (
    <div>
      {/* <SideBar /> */}
      <div className={`flex flex-col items-center min-h-screen p-6 md:ml-64 my-20`}>
        {data && (
          // <div className="w-full p-8 bg-white rounded-lg shadow-lg sm:w-2/3 md:w-3/4 lg:w-1/2 xl:w-2/3">
          <div className="w-full p-8 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:mr-6">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-32 h-32 mx-auto rounded-full"
                />
              </div>
              <div className="mt-4 text-center md:mt-0">
                <h1 className="text-4xl font-semibold text-gray-900">
                  {data.firstName} {data.lastName}{" "}
                </h1>
                <p className="text-lg text-gray-600">Front-end Developer</p>
                <p className="mt-2 text-sm text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  viverra scelerisque tortor ac posuere.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
              <ul className="mt-2">
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">
                    Web Development:
                  </span>{" "}
                  HTML, CSS, JavaScript, React
                </li>
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">Design:</span>{" "}
                  Adobe Photoshop, Figma
                </li>
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">
                    Backend:
                  </span>{" "}
                  Node.js, Express.js
                </li>
              </ul>
            </div>
            {/* <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Experience
              </h2>
              <div className="mt-2">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">
                    Front-end Developer - Company A
                  </h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">
                    Web Designer - Company B
                  </h3>
                  <p className="text-gray-600">
                    Sed viverra scelerisque tortor ac posuere.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Freelance Web Developer
                  </h3>
                  <p className="text-gray-600">
                    Pellentesque habitant morbi tristique senectus et netus et
                    malesuada fames ac turpis egestas.
                  </p>
                </div>
              </div>
            </div> */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
              <p className="mt-2 text-gray-600">Email: {data.email}</p>
              <p className="mt-2 text-gray-600">Phone Number: {data.phoneNumber}</p>
            </div>
          </div>
        )}
      </div>

      {/* second card start  */}

      {/* <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
        {data && (
          <div className="w-full p-8 bg-white rounded-lg shadow-lg sm:w-2/3 md:w-3/4 lg:w-1/2 xl:w-2/3">
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Other info
              </h2>
              <ul className="mt-2">
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">
                    Enrolled courses:
                  </span>{" "}
                  3 courses
                </li>
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">
                    Completed courses:
                  </span>{" "}
                  1 courses
                </li>
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">
                    Ongoing courses:
                  </span>{" "}
                  2 courses
                </li>
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">
                    Other info:
                  </span>{" "}
                  I don't know yet o
                </li>
              </ul>
            </div>
          </div>
        )}
      </div> */}
      {/* second card end */}
    </div>
  );
};

export default StudentData;
