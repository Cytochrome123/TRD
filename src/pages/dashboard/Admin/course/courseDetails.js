import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import instructor from "../../Data/Instructor";
import { AlertContext } from "../../../../App";
// import imgCallback from "../../images/profile.jpeg";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { IoMdOptions } from 'react-icons/io';

import ModelContainer from "../../../../component/ModelContainer";
import AssignInstructors from "../../../../forms/AssignInstructors";
// import { useOutletContext } from 'react-router-dom';
// import AddQuiz from "../../../../forms/AddQuiz";
import DropdownItem from "../../../../component/DropdownItem";
import UpdateCourseStatusForm from "../../../../forms/updateCourseStatus";
import Loader from "../../../../component/Loader";




const CourseDetails = () => {
  // const { courses, setCourses } = useContext(AuthContext);
  const [showAddPop, setShowAddPop] = useState(false);
  const [modal, setModal] = useState({
    addQuiz: false,
    shQuiz: 'hidden',
    updateStatusForm: 'hidden',
  })
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
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate()

  const { id } = useParams();
  // const [isSidebarOpen] = useOutletContext();
  const { notify } = useContext(AlertContext);
  // const ref = useRef(true)
  const token = Cookies.get('token');


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
    // if(ref.current) {
      const token = Cookies.get('token');
      axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVERURL}/course/${id}`,
        headers: {
          // 'Content-Type': 'text/html',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        // withCredentials: true
      })
        .then((res) => {
          // console.log("abc", res.data);
          setCourse(prev => ({
            ...prev,
            _id: res.data.data._id,
            title: res.data.data.title,
            description: res.data.data.description,
            duration: res.data.data.duration,
            start_date: res.data.data.start_date,
            end_date: res.data.data.end_date,
            location: res.data.data.location,
            capacity: res.data.data.capacity,
            amount: res.data.data.amount,
            image: `${process.env.REACT_APP_SERVERURL}/file/${res.data.data.image?.path}`,
          }))
          // const studentData = res.data.students
          // setItems(() => res.data.students)
  
        })
        .catch((err) => {
          console.log(err.message);
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
        });
    // }

    // return () => ref.current = false;
  }, []);

  //   const clickedInstructor = instructorList.find(
  //     (eachInstructor) => eachInstructor._id === (id)
  //   );
  // Responsible for the scrolling up of the nasted route in the dashboard
  useEffect(() => {


    window.scroll(0, 0)
  }, []);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudents();
  }, []);

  function getStudents() {

    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVERURL}/admin/course/${id}/students`,
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

        setStudents(res.data.data);

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
        setLoading(false);
      })
  }

  // const handleCloseQuizForm = () => {
  //   setModal(prev => ({
  //     ...prev,
  //     shQuiz: 'hidden'
  //   }))
  //   document.body.style.overflow = "auto";
  // };

  const handleCloseUpdateForm = () => {
    // setShQuiz("hidden");
    setModal(prev => ({
      ...prev,
      updateStatusForm: 'hidden'
    }))
    document.body.style.overflow = "auto";
  };

  const hanndleDownloadStudent = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVERURL}/admin/course/${id}/students/download`,
        headers: {
          // 'Content-Type': 'text/html',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob',
      });

      if (!res) throw new Error('Error occured while trying to download resource')

      console.log(res);
      // const blbUrl = await res.data.blob()

      // // const url = window.URL.createObjectURL(new Blob([res.data]));
      // console.log(blbUrl)
      // window.location.href = url;


      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${course.title}.xlsx`); // Specify the filename here
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);

      if (err.response && err.response.data) {
        const contentType = err.response.headers['content-type'];

        if (contentType && contentType.includes('application/json')) {
          // Convert blob to JSON to read the error message
          const reader = new FileReader();
          reader.onload = () => {
            const error = JSON.parse(reader.result);
            if (Array.isArray(error.message)) {
              notify('error', error.message[0].msg);
            } else if (error.message) {
              notify('error', error.message);
            } else {
              notify('error', 'An unknown error occurred');
            }
          };
          reader.readAsText(err.response.data);
        } else {
          // Handle other types of error responses
          notify('error', 'An error occurred while processing your request.');
        }
      } else {
        notify('error', err.message);
      }
    }
  }

  const handleUpdateStatus = () => {
    setModal(prev => ({
      ...prev,
      addQuiz: true,
      updateStatusForm: 'block'
    }))
    setIsOpen(!isOpen)
  }

  if(loading) return <Loader />

  return (
    <div className={`p-4 w-full min-h-screen md:ml-72 my-20`} >
      {/* <SideBar /> */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:w-1/3 md:pr-4">
            {console.log(course.image)}
            <img
              src={course.image}
              // src={`http://localhost:5001/api/v2/file/${course.image?.path}`}
              alt={course.title}
              className="object-cover w-full mb-4 h-60"
            />
            <div className="flex items-center m-2 md:justify-between">

              {/* back button start */}
              <button
                onClick={() => navigate(-1)}
                className="border border-blue-500 bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
              >
                Back
              </button>
              {/* back button end */}

              {/* assign button start */}
              <div className="relative group">

                <button
                  onClick={() => setShowAddPop(true)}
                  // className="px-4 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 md:text-base"
                  className="border border-blue-500 bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
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
            <div className="flex justify-between">
              <div className="content">
                <h2 className="mb-2 text-2xl font-semibold text-blue-600">
                  {course.title}
                </h2>
                <p className="mb-2 text-gray-600">Capacity: {course.capacity}</p>
                <p className="mb-2 text-gray-600">{course.description}</p>
                <p className="mb-2 text-gray-600">Duration: {course.duration}</p>
                <p className="mb-2 text-gray-600">Location: {course.location}</p>
                <p className="mb-2 text-gray-600">Start Date: {course.start_date}</p>
                <p className="mb-2 text-gray-600">End Date: {course.end_date}</p>

              </div>

              {/* Quiz button start */}
              {/* <div className="relative group">

                <button
                  onClick={handleAddQz}
                  className="px-4 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 md:text-base"
                >
                  Add Quiz
                </button>
                <div className="absolute hidden p-2 text-sm text-gray-700 bg-gray-100 rounded shadow-md group-hover:block">
                  Add a preliminary quiz to the course
                </div>
              </div> */}
              {/* Quiz button end */}

              <div className="relative">
                {/* Button to toggle dropdown */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
                >
                  <IoMdOptions />
                </button>

                {/* Dropdown Content */}
                {isOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-56 bg-white shadow-lg rounded">
                    <DropdownItem description="" fire={hanndleDownloadStudent}>Download student</DropdownItem>
                    <DropdownItem description="update course status" fire={handleUpdateStatus}>Status</DropdownItem>
                    <DropdownItem description="" fire={() => setIsOpen(!isOpen)}>Delete</DropdownItem>
                  </div>
                )}
              </div>

            </div>
            {/* <div className="flex justify-end m-2">
              <button
                className="px-4 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 md:text-base"
              >
                Delete Course
              </button>
              <div className="absolute hidden p-2 text-sm text-gray-700 bg-gray-100 rounded shadow-md group-hover:block">
                This Course will be deleted
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* <div className='overflow-x-auto '> */}
      <table className="w-full table-auto min-w-max x-overflow-scroll ">
        <thead>
          <tr className="text-white bg-blue-500">
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
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
                  <img src={`${process.env.REACT_APP_SERVERURL}/file/${student.image?.path}`} alt={student.firstName} className="w-10 h-10 rounded-full" />

                </td>
                <td className="px-4 py-2">{student.user_id.firstName} {student.user_id.lastName}</td>
                <td className="px-4 py-2">{student.user_id.email}</td>
                <td className="px-4 py-2">{student.user_id.phoneNumber}</td>
                <td className="px-4 py-2">{(new Date(Date(student.user_id.createdDate))).toLocaleDateString()}</td>
                {/* <td className="px-4 py-2">{  (new Date(student.createdDate)).getFullYear() }</td> */}
                <td className="px-4 py-2 ">
                  <div className='relative flex justify-between h-8 text-blue-500 cursor-pointer hover:underline'>
                    {/* <Link to={`${student._id}`} className="h-8 text-blue-500 hover:underline"> */}
                    <span onClick={() => navigate(`/instructor/dashboard/assigned-course/${course._id}/student/${student.user_id._id}`)}>View Profile</span>

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

      {/* {addQuiz && */}
      {/* <AddQuiz
          className={modal.shQuiz}
          onClose={handleCloseQuizForm}
        /> */}
      {/* } */}

      <UpdateCourseStatusForm
        className={modal.updateStatusForm}
        onClose={handleCloseUpdateForm}
      />
    </div>
  )
}

export default CourseDetails








