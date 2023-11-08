import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import instructor from "../../Data/Instructor";
import { AlertContext, BASEURL } from "../../../../App";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useOutletContext } from 'react-router-dom';

function InstructorsProfile() {
  // const { instructor, setinstructor } = useContext(AuthContext);
  const [instructor, setInstructor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  })

  // const [items, setItems] = useState(instructor);

  const { id } = useParams();
  console.log("params", id);
  const [isSidebarOpen] = useOutletContext();
  const {notify} = useContext(AlertContext)



  // const handleRemoveStudent = () => {
  //   const newItems = items.filter(item => item.id !== 2000);
  //   setItems(newItems);
  //   console.log("items",items);
  //   // console.log("student", id);
  //   console.log("newItems", newItems);
  // };
  // Fetch student details based on studentId
  // For simplicity, let's assume you have a students array somewhere
  // const instructor = [
  //   { id: 1, name: 'Student 1', details: 'Details about Student 1' },
  //   { id: 2, name: 'Student 2', details: 'Details about Student 2' },
  //   { id: 3, name: 'Student 3', details: 'Details about Student 3' },
  //   // Add more students...
  // ];

  useEffect(() => {
    const token = Cookies.get('token');
    axios({
      method: "get",
      url: `${BASEURL}/instructor/${id}`,
      headers: {
        // 'Content-Type': 'text/html',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      // withCredentials: true
    })
      .then((res) => {
        console.log("abc", res.data);
        setInstructor(prev => ({
          ...prev,
          firstName: res.data.instructor.firstName,
          lastName: res.data.instructor.lastName,
          email: res.data.instructor.email,
          phoneNumber: res.data.instructor.phoneNumber,
        }))
        // console.log("url", url)
        // const studentData = res.data.students
        // setItems(() => res.data.students)

      })
      .catch((err) => {
        console.log(err.message);
        if (Array.isArray(err.response?.data.msg)) {
          notify('error', err.response.data.msg[0].msg)
        } else if (err.response) {
          // This can happen when the required headers or options to access the endpoint r not provided
          if (err.response.data.msg) {
            notify('error', err.response.data.msg)
          } else {
            notify('error', err.response.data)
          }
        } else {
          notify('error', err.message)
        }
      });

  }, []);

  // const clickedInstructor = instructor.find(
  //   (eachInstructor) => eachInstructor._id === (id)
  // );
  // console.log("student",student);

  return (
    <div className={`p-4 w-full md:ml-72 my-20 min-h-screen`}>
      {/* <SideBar /> */}
      <div className="flex flex-col items-center min-h-screen p-6 bg-white">
        {instructor && (
          <div className="w-full p-8 bg-gray-100 rounded-lg shadow-lg sm:w-2/3 md:w-3/4 lg:w-1/2 xl:w-2/3">
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
                  {instructor.gender} {instructor.firstName} {instructor.lastName}{" "}
                </h1>
                <p className="text-lg text-gray-600">
                  student Front-end Developer
                </p>
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
            <div className="mt-6">
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
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
              <p className="mt-2 text-gray-600">Email: johndoe@example.com</p>
            </div>
          </div>
        )}
      </div>

      {/* second card start */}

      <div className="flex flex-col items-center p-6 bg-white">
        {instructor && (<div className="w-full p-8 bg-gray-100 rounded-lg shadow-lg sm:w-2/3 md:w-3/4 lg:w-1/2 xl:w-2/3">
          <div className="">
            <h2 className="text-xl font-semibold text-gray-900">More info</h2>
            <ul className="mt-2">
              <li className="mb-2">
                <span className="font-semibold text-indigo-600">No of courses taking:</span> 3 courses
              </li>
              <li className="mb-2">
                <span className="font-semibold text-indigo-600">No of student taking the course:</span> 25 students
              </li>
              <li className="mb-2">
                <span className="font-semibold text-indigo-600">Others:</span> I myself dont know
              </li>
            </ul>
          </div>

        </div>)}
      </div>
      {/* second card end */}

      {/* <h2>Student Detail</h2>
      {clickedInstructor && (
        <div>
          <h3>{clickedInstructor.name}</h3>
          <p>{clickedInstructor.details}</p>
        </div>
      )}
 */}
    </div>
  );
}

export default InstructorsProfile;
// export default StudentDetail;
