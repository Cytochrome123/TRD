// import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertContext } from "../../../../App";
import axios from "axios";
import AddCourseForm from '../../../../forms/addCourseForm';
import ModelContainer from '../../../../component/ModelContainer';
import Cookies from 'js-cookie';
// import imgCallback from "../../../../images/profile.jpeg";
// import { useOutletContext } from 'react-router-dom';
import Loader from '../../../../component/Loader';


// const img = `${process.env.REACT_APP_SERVERURL}/file/${student.image.file}`

const ListCourses = () => {
  const [showAddPop, setShowAddPop] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [isSidebarOpen] = useOutletContext();
  const { notify } = useContext(AlertContext)



  useEffect(() => {
    getCourses()
    setLoading(false);
  }, [showAddPop])

  const handleAddStudent = (childData, imgChild) => {

  };

  // closing of the pop up
  const handleOnClose = () => {
    setShowAddPop(false);
  };


  function getCourses() {
    const token = Cookies.get('token');
    axios({
      method: "get",
      // url: `${process.env.REACT_APP_SERVERURL}/courses`,
      url: `${process.env.REACT_APP_SERVERURL}/courses`,
      headers: {
        // 'Content-Type': 'text/html',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      // withCredentials: true
    })
      .then((res) => {
        console.log("courses", res.data.data);
        // const allPost = [newPost, ...courses]

        setCourses(res.data.data);

      })
      .catch((err) => {
        console.log(err);
        if (Array.isArray(err.response?.data.message)) {
          notify('error', err.response.data.errors[0].msg);
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
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // Responsible for the scrolling up of the nasted route in the dashboard
  useEffect(() => {

    window.scroll(0, 0)
  }, []);

  if(loading) return <Loader />

  return (
    <div className={`p-4 min-w-[300px] md:ml-[270px] my-20 min-h-screen`}>
      {/* <SideBar /> */}
      <div className={`flex-col flex-wrap justify-center min-h-screen max-w-screen-xl p-6 mx-auto align-middle justify-self-center`}>
        {/* button start */}
        <h2 className="text-2xl font-semibold">All Courses</h2>

        <div className="flex justify-end m-2 ">
          <div className="relative group">
            <button
              onClick={() => setShowAddPop(true)}
              className="px-4 py-2 mb-4 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 md:text-base"
            >
              Add Course
            </button>
            <div className="absolute hidden p-2 text-sm text-gray-700 bg-gray-100 rounded shadow-md group-hover:block">
              create a new course
            </div>
          </div>

        </div>
        {/* button end */}



        <div className='overflow-x-auto '>
          <table className="w-full table-auto min-w-max x-overflow-scroll ">
            <thead>
              <tr className="text-white bg-blue-500">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Description</th>
                {/* <th className="px-4 py-2">Instructors</th> */}
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Capacity</th>
                <th className="px-4 py-2">Student Enrolled</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? ('Loading') : courses.length === 0 ? <h1 className='h-32 text-xl text-center'>No data yet</h1> :
                courses.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-100 group">
                    <td className="px-4 py-2">
                      {/* <img src={img} alt={course.title}   className="w-10 h-10 rounded-full" /> */}
                      <img src={`${process.env.REACT_APP_SERVERURL}/file/${course.image?.path}`} alt={course.title} className="w-10 h-10 rounded-full" />
                      {/* <img src={imgCallback} alt={course.title}   className="w-10 h-10 rounded-full" /> */}

                    </td>
                    <td className="px-4 py-2">{course.title} </td>
                    <td className="px-4 py-2">{course.description}</td>
                    <td className="px-4 py-2">{course.duration}</td>
                    <td className="px-4 py-2">{course.capacity}</td>
                    <td className="px-4 py-2">{course.amount}</td>
                    <td className="px-4 py-2">{course.status ? course.status : "Upcoming"}</td>
                    <td className="px-4 py-2 ">
                      <div className='relative flex justify-between'>
                        <Link to={`${course._id}`} className="h-8 text-blue-500 hover:underline">
                          View
                        </Link>
                        {/* <div onClick={() => handleRemoveStudent(student.id)} className='absolute bg-red-0 sm:-right-10 md:-right-16 lg:-right-5 '>
                  <svg className='hidden h-4 p-0 m-0 cursor-pointer group-hover:block animate-pulse ' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                    <path fill="#f44336" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"></path><line x1="16.9" x2="31.1" y1="16.9" y2="31.1" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="4"></line><line x1="31.1" x2="16.9" y1="16.9" y2="31.1" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="4"></line>
                  </svg>
                  </div> */}
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <ModelContainer onClose={handleOnClose} visible={showAddPop}>
          <AddCourseForm
            onData={handleAddStudent}
            onClose={handleOnClose}
          // getCourses={getCourses}
          // courses={courses}
          />
        </ModelContainer>
      </div>
    </div>
  )
}

export default ListCourses