import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import instructor from "../../Data/Instructor";
import { AlertContext } from "../../../../App";
// import imgCallback from "../../images/profile.jpeg";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
// import MetricCard from "../../../../component/MetricCard";
// import { useOutletContext } from 'react-router-dom';
import Loader from "../../../../component/Loader";



const CourseDetail = () => {
    // const { courses, setCourses } = useContext(AuthContext);
    const [course, setCourse] = useState({
        id: '',
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

    const navigate = useNavigate();
    // const [isSidebarOpen] = useOutletContext();
    const { notify, call2Action } = useContext(AlertContext)


    const { id } = useParams();
    // const {id}  = useParams();

    console.log("id object", id);
    const params = { id }
    console.log("params", params);


    // const clickedCourse = courses.find(
    //   (eachCourse) => eachCourse._id === (id)
    //   // (eachCourse) => eachCourse.id == (id)
    //   );



    // test data fetch start
    useEffect(() => {
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
                console.log("abc", res.data);
                setCourse(prev => ({
                    ...prev,
                    id: res.data.data._id,
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
                // console.log("url", url)
                // const studentData = res.data.students
                // setItems(() => res.data.students)

            })
            .catch((err) => {
                console.log(err.message);
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
        setLoading(false);
    }, []);

    const handleRemoveStudent = (id) => {
        // notify('warning', 'Are you sure you want to remove the specified student');
        call2Action('warning', 'Are you sure you want to remove the specified student?', 'The student bhas been removed');
        const newStudents = students.filter(item => item.id !== id);
        setStudents(() => newStudents);
        // console.log("Students",Students);
        console.log("student", id);
        console.log("newStudents", newStudents);
    };

    function getStudents() {
        const token = Cookies.get('token');
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVERURL}/admin/assigned-courses/${id}/students`,
            // url: `${process.env.REACT_APP_SERVERURL}/assigned-course/64a983f6ea07003579ec2682/students`,
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

                // setStudents(res.data.courseDetails.enrolled);
                setStudents(res.data.data);

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
    }

    if (loading) return <Loader />;

    return (
        <div className={`w-full p-4 md:ml-64 my-20 min-h-screen`}>
            {/* <SideBar /> */}
            <div>
                {/* <MetricCard title="No of students" value="5" /> */}
                <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="md:w-1/3 md:pr-4">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="object-cover w-full mb-4 h-60"
                            />
                            <div className="flex items-center m-2 md:justify-between">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="border border-blue-500 bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
                                >
                                    Back
                                </button>
                                <div className="absolute hidden p-2 text-sm text-gray-700 bg-gray-100 rounded shadow-md group-hover:block">
                                    Go back to the previous page
                                </div>
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





                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center p-6">
                <div className="w-full p-8 bg-white rounded-lg shadow-lg sm:w-2/3 md:w-3/4 lg:w-1/2 xl:w-2/3">

                    <div className="">
                        <h2 className="text-2xl font-semibold text-gray-900">Requirments</h2>
                        <ul className="mt-2">
                            <li className="mb-2">
                                <span className="font-semibold text-indigo-600">*</span>
                            </li>
                            <li className="mb-2">
                                <span className="font-semibold text-indigo-600">*</span>
                            </li>
                        </ul>
                    </div>


                </div>

            </div>

            <br />
            <h1 className="m-3 text-2xl">Student List</h1>
            {/* <div className='overflow-x-auto '> */}
            <table className="w-full table-auto min-w-max x-overflow-scroll ">
                <thead>
                    <tr className="text-white bg-blue-500">
                        <th className="px-4 py-2">S/N</th>
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Name</th>
                        {/* <th className="px-4 py-2">ID</th> */}
                        <th className="px-4 py-2">Phone Number</th>
                        <th className="px-4 py-2">Enrollment Date</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? ('Loading') : students.length === 0 ? <h1 className='h-32 text-xl text-center'>No data yet</h1> :
                        students.map((student, index) => (
                            <tr key={index} className="hover:bg-gray-100 group">
                                <td className="px-4 py-2">{index+1}</td>
                                <td className="px-4 py-2">
                                    <img src={`https://trd-server.onrender.com/api/file/${student.image?.path}`} alt={student.firstName} className="w-10 h-10 rounded-full" />

                                </td>
                                <td className="px-4 py-2">{student.user_id.firstName} {student.user_id.lastName}</td>
                                {/* <td className="px-4 py-2">{student.user_id._id}</td> */}
                                <td className="px-4 py-2">{student.user_id.phoneNumber}</td>
                                <td className="px-4 py-2">{student.user_id.createdDate}</td>
                                <td className="px-4 py-2 ">
                                    <div className='relative flex justify-between h-8 text-blue-500 cursor-pointer hover:underline'>
                                        {/* <Link to={`${student._id}`} className="h-8 text-blue-500 hover:underline"> */}
                                        <span onClick={() => navigate(`/instructor/dashboard/assigned-course/${course.id}/student/${student.user_id._id}`)}>View Profile</span>
                                        {/* <span onClick={() => navigate(`/instructor/dashboard/assigned-course/64a983f6ea07003579ec2682/student/${student._id}`)}>View Profile</span> */}

                                        {/* </Link> */}
                                        <div onClick={() => handleRemoveStudent(student.user_id._id)} className='absolute bg-red-0 sm:-right-10 md:-right-16 lg:-right-5 '>
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
        </div>
    )
}

export default CourseDetail
