import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import instructor from "../../Data/Instructor";
import { AlertContext, AuthContext, BASEURL } from "../../../../App";
// import imgCallback from "../../images/profile.jpeg";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
// import SideBar from "../../../../component/SideBar";
import ModelContainer from "../../../../component/ModelContainer";
import AssignInstructors from "../../../../forms/AssignInstructors";
import { useOutletContext } from 'react-router-dom';




const CourseDetails = () => {
  // const { courses, setCourses } = useContext(AuthContext);
  const [showAddPop, setShowAddPop] = useState(false);

  const [course, setCourse] = useState({
    _id: '',
    title: '',
    description: '',
    duration: '',
    start_date: '',
    end_date: '',
    location: '',
    capacity: '',
    amount: '',
    image: null,
  })

  const navigate = useNavigate()

  const { id } = useParams();
  const [isSidebarOpen] = useOutletContext();
  const {notify} = useContext(AlertContext)


  // const {id}  = useParams();

  console.log("id object", id);
  const params = { id }
  console.log("params", params);




  // const clickedCourse = courses.find(
  //   (eachCourse) => eachCourse._id === (id)
  //   // (eachCourse) => eachCourse.id == (id)
  //   );
  const handleOnClose = () => {
    setShowAddPop(false);
  };


  useEffect(() => {
    const token = Cookies.get('token');
    axios({
      method: "get",
      url: `${BASEURL}/course/${id}`,
      headers: {
        // 'Content-Type': 'text/html',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      // withCredentials: true
    })
      .then((res) => {
        console.log("abc", res.data);
        setCourse(prev => ({
          ...prev,
          _id: res.data.course._id,
          title: res.data.course.title,
          description: res.data.course.description,
          duration: res.data.course.duration,
          start_date: res.data.course.start_date,
          end_date: res.data.course.end_date,
          location: res.data.course.location,
          capacity: res.data.course.capacity,
          amount: res.data.course.amount,
          image: `https://trd-server.onrender.com/api/file/${res.data.course.image?.path}`,
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

  //   const clickedInstructor = instructorList.find(
  //     (eachInstructor) => eachInstructor._id === (id)
  //   );
  // Responsible for the scrolling up of the nasted route in the dashboard
  useEffect(() => {


    window.scroll(0, 0)
  }, []);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStudents();
    setLoading(false);
  }, []);

  function getStudents() {
    const token = Cookies.get('token');
    axios({
      method: "get",
      url: `${BASEURL}/students`,
      headers: {
        // 'Content-Type': 'text/html',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      // withCredentials: true
    })
      .then((res) => {
        console.log("Students", res.data);
        // const allPost = [newPost, ...courses]

        setStudents(res.data.students);

      })
      .catch((err) => {
        console.log(err);
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
  }

  return (
    <div className={`p-4 w-full min-h-screen md:ml-72 my-20`} >
      {/* <SideBar /> */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:w-1/3 md:pr-4">
            <img
              src={course.image}
              alt={course.title}
              className="object-cover w-full mb-4 h-60"
            />
            <div className="flex items-center m-2 md:justify-between">

              {/* back button start */}
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-xs text-white bg-blue-500 rounded me-2 hover:bg-blue-600 md:text-base"
              >
                Back
              </button>
              {/* back button end */}

              {/* assign button start */}
              <div className="relative group">

                <button
                  onClick={() => setShowAddPop(true)}
                  className="px-4 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 md:text-base"
                >
                  Assign Instructor
                </button>
                <div className="absolute hidden p-2 text-sm text-gray-700 bg-gray-100 rounded shadow-md group-hover:block">
                  You can  Assign Instructor
                </div>

              </div>
              {/* assign button end */}
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="mb-2 text-2xl font-semibold text-blue-600">
              {course.title}
            </h2>
            <p className="mb-2 text-gray-600">Capacity: {course.capacity}</p>
            <p className="mb-2 text-gray-600">{course.description}</p>
            <p className="mb-2 text-gray-600">Duration: {course.duration}</p>
            <p className="mb-2 text-gray-600">Location: {course.location}</p>
            <p className="mb-2 text-gray-600">Start Date: {course.start_date}</p>
            <p className="mb-2 text-gray-600">End Date: {course.end_date}</p>
            <div className="flex justify-end m-2">
              <button
                className="px-4 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 md:text-base"
              >
                Delete Course
              </button>
              <div className="absolute hidden p-2 text-sm text-gray-700 bg-gray-100 rounded shadow-md group-hover:block">
                This Course will be deleted
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='overflow-x-auto '> */}
      <table className="w-full table-auto min-w-max x-overflow-scroll ">
        <thead>
          <tr className="text-white bg-blue-500">
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Enrollment Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? ('Loading') : students.length === 0 ? <h1 className='h-32 text-xl text-center'>No data yet</h1> :
            students.map((student, index) => (
              <tr key={index} className="hover:bg-gray-100 group">
                <td className="px-4 py-2">
                  <img src={`https://trd-server.onrender.com/api/file/${student.image?.path}`} alt={student.firstName} className="w-10 h-10 rounded-full" />

                </td>
                <td className="px-4 py-2">{student.firstName} {student.lastName}</td>
                <td className="px-4 py-2">{student._id}</td>
                <td className="px-4 py-2">{student.phoneNumber}</td>
                <td className="px-4 py-2">{(new Date(Date(student.createdDate))).toLocaleDateString()}</td>
                {/* <td className="px-4 py-2">{  (new Date(student.createdDate)).getFullYear() }</td> */}
                <td className="px-4 py-2 ">
                  <div className='relative flex justify-between h-8 text-blue-500 cursor-pointer hover:underline'>
                    {/* <Link to={`${student._id}`} className="h-8 text-blue-500 hover:underline"> */}
                    <span onClick={() => navigate(`/instructor/dashboard/assigned-course/${course._id}/student/${student._id}`)}>View Profile</span>

                    {/* </Link> */}
                    <div className='absolute bg-red-0 sm:-right-10 md:-right-16 lg:-right-5 '>
                      <svg className='hidden h-4 p-0 m-0 cursor-pointer group-hover:block animate-pulse ' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                        <path fill="#f44336" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"></path><line x1="16.9" x2="31.1" y1="16.9" y2="31.1" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="4"></line><line x1="31.1" x2="16.9" y1="16.9" y2="31.1" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="4"></line>
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* </div> */}
      <ModelContainer onClose={handleOnClose} visible={showAddPop}>
        <AssignInstructors
          //  onData={handleAddStudent}
          onClose={handleOnClose}
          id={course._id}
        />
      </ModelContainer>
    </div>
  )
}

export default CourseDetails








