import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import students from '../Data/User'
import { BASEURL } from "../../../../App";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import SideBar from '../../../../component/SideBar';

function StudentProfile() {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  })

  const { id } = useParams()

  console.log('id', id);

  useEffect(() => {
    const token = Cookies.get('token');
    axios({
      method: "get",
      url: `${BASEURL}/student/${id}`,
      headers: {
        // 'Content-Type': 'text/html',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      // withCredentials: true
    })
      .then((res) => {
        console.log("abc", res.data);
        setStudent(prev => ({
          ...prev,
          firstName: res.data.student.firstName,
          lastName: res.data.student.lastName,
          email: res.data.student.email,
          phoneNumber: res.data.student.phoneNumber,
        }))
        // console.log("url", url)
        // const studentData = res.data.students
        // setItems(() => res.data.students)

      })
      .catch((err) => {
        console.log(err.message);
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

  }, []);

  // const student = items.find(student => student._id === parseInt(id));
  console.log('student', student);

  return (
    <div>
      <SideBar />
      <div className='h-screen pt-32 my-32 bg-gray-100'>
        <div className="flex flex-col items-center p-6">
          {student && (<div className="w-full p-8 bg-white rounded-lg shadow-lg sm:w-2/3 md:w-3/4 lg:w-1/2 xl:w-2/3">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:mr-6">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-32 h-32 mx-auto rounded-full"
                />
              </div>
              <div className="mt-4 text-center md:mt-0">
                <h1 className="text-4xl font-semibold text-gray-900">{student.firstName} {student.lastName} </h1>
                <p className="text-lg text-gray-600">Front-end Developer</p>
                <p className="mt-2 text-sm text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra
                  scelerisque tortor ac posuere.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
              <ul className="mt-2">
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">Web Development:</span> HTML, CSS, JavaScript, React
                </li>
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">Design:</span> Adobe Photoshop, Figma
                </li>
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">Backend:</span> Node.js, Express.js
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
              <div className="mt-2">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Front-end Developer - Company A</h3>
                  <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Web Designer - Company B</h3>
                  <p className="text-gray-600">Sed viverra scelerisque tortor ac posuere.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Freelance Web Developer</h3>
                  <p className="text-gray-600">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
              <p className="mt-2 text-gray-600">
                Email: johndoe@example.com
              </p>
            </div>
          </div>)}

        </div>

        {/* second card start  */}

        <div className="flex flex-col items-center p-6">
          {student && (<div className="w-full p-8 bg-white rounded-lg shadow-lg sm:w-2/3 md:w-3/4 lg:w-1/2 xl:w-2/3">

            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-900">Status</h2>
              <ul className="mt-2">
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">Course 1:</span> Completed
                </li>
                <li className="mb-2">
                  <span className="font-semibold text-indigo-600">Course 2:</span> Ongoing
                </li>
              </ul>
              <br />
              <h2 className="text-2xl font-semibold text-gray-900">Others</h2>
            </div>


          </div>)}

        </div>
        {/* second card end */}


      </div>
    </div>


  );
}

export default StudentProfile;






// export default studentProfile