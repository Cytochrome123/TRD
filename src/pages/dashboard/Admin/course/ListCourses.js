// import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext, BASEURL } from "../../../../App";
import axios, { AxiosError } from "axios";
import AddCourseForm from '../../../../forms/addCourseForm';
import ModelContainer from '../../../../component/ModelContainer';
import Cookies from 'js-cookie';
import imgCallback from "../../../../images/profile.jpeg";


// const img = `${BASEURL}/file/${student.image.file}`

const ListCourses = () => {
  const [showAddPop, setShowAddPop] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses()
    setLoading(false);
  }, [])

  const handleAddStudent = (childData, imgChild) => {

    // const id = Math.floor(Math.random() * 1000) + 1

    // const newPost = { id, title: childData.title, description : childData.description,  duration: childData.duration,start_date: childData.start_date, end_date: childData.end_date, location: childData.location, capacity: childData.capacity, amount: childData.amount, image: imgChild  }
    // console.log('new post newPost', newPost);
    // console.log('new post imgChild', imgChild);



    // setCourses([...courses, newPost])

    // axios({
    //   method: "post",
    //   url: `${BASEURL}/courses`,
    //   data: newPost,
    //   headers: {
    //     // 'Content-Type': 'text/html',
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`
    //   }
    //   // withCredentials: true
    // })
    // .then((res) => {
    //   console.log("xxx created-courses",res.data);
    //   // const allPost = [newPost, ...courses]

    //   setCourses(res.data.courses)



    // })
    // .catch((err) => {
    //       console.log(err);
    //       if(err && err instanceof Error) {
    //         alert(`${err.message} making the post`)
    //         // alert(err.response?.data.msg);
    //       } else if(err && err instanceof AxiosError) {
    //         alert(err.message)
    //       } else {
    //           alert('Error')
    //       }
    //       // props.handleAlert(false, e.response.data ? e.response.data : e.message, 'danger');
    //     });










    // e.preventDefault()
    // const newItems = items.filter(item => item.id !== id);




    // const id = Math.floor(Math.random() * 1000) + 1

    // console.log("id", id);


  };

  // closing of the pop up
  const handleOnClose = () => {
    setShowAddPop(false);
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

        setCourses(res.data.courses);
        




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

  // Responsible for the scrolling up of the nasted route in the dashboard
  useEffect(() => {

    window.scroll(0, 0)
  }, [])
  return (
    <div className="justify-center h-screen max-w-screen-xl p-6 mx-auto align-middle bg-white rounded shadow flex-colume justify-self-center">
      {/* button start */}
      <div className="flex justify-end m-2 ">
        <div className="relative group">
          <button
            onClick={() => setShowAddPop(true)}
            className="px-4 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 md:text-base"
          >
            Add Course
          </button>
          <div className="absolute hidden p-2 text-sm text-gray-700 bg-gray-100 rounded shadow-md group-hover:block">
            create a new course
          </div>
        </div>

      </div>
      {/* button end */}

      <h2 className="my-8 text-2xl font-semibold">All Courses</h2>


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
            {loading ? ('Loading') : courses.length === 0 ? ('No data yet') :
              courses.map((student, index) => (
                <tr key={index} className="hover:bg-gray-100 group">
                  <td className="px-4 py-2">
                    {/* <img src={img} alt={student.title}   className="w-10 h-10 rounded-full" /> */}
                    <img src={`https://trd-server.onrender.com/api/file/${student.image.path}`} alt={student.title} className="w-10 h-10 rounded-full" />
                    {/* <img src={imgCallback} alt={student.title}   className="w-10 h-10 rounded-full" /> */}

                  </td>
                  <td className="px-4 py-2">{student.title} </td>
                  <td className="px-4 py-2">{student.description}</td>
                  <td className="px-4 py-2">{student.duration}</td>
                  <td className="px-4 py-2">{student.capacity}</td>
                  <td className="px-4 py-2">{student.amount}</td>
                  <td className="px-4 py-2">{student.status ? student.status : "Upcoming"}</td>
                  <td className="px-4 py-2 ">
                    <div className='relative flex justify-between'>
                      <Link to={`${student._id}`} className="h-8 text-blue-500 hover:underline">
                        View Profile
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
          getCourses={getCourses}
        />
      </ModelContainer>
    </div>
  )
}

export default ListCourses