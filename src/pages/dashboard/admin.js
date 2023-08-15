import { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios, { AxiosError } from 'axios';
import cookies from 'js-cookie';

import { useQuery } from '@tanstack/react-query';

import course_img from '../../images/trd_img.png'
import AddCourseForm from '../../forms/addCourseForm';
import StudentDetail from '../detail/student';

const AdminDashboard = () => {

    const [data, setData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        userType: '',
        courses: [],
        instructors: [],
        students: [],
        users: []
    });
    const [showForm, setShowForm] = useState("hidden");
    const [addForm, setAddForm] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);

    const navigate = useNavigate();
    console.log('sfdgh')

    useEffect(() => {
        async function fetchData() {
            try {
                const token = cookies.get('token');
                const res = await axios({
                    method: 'get',
                    // url: `${BASEURL}/mycourses`,
                    // url: `${BASEURL}/myData`,
                    url: 'http://localhost:5001/api/myData',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!res) return alert('Network Error')
                console.log(res)
                setData(prev => ({
                    ...prev,
                    id: res.data.details._id,
                    firstName: res.data.details.firstName,
                    lastName: res.data.details.lastName,
                    email: res.data.details.email,
                    phoneNumber: res.data.details.phoneNumber,
                    userType: res.data.details.userType,
                }))
            } catch (err) {
                console.log(err);
                if (err && err instanceof Error && !AxiosError) {
                    alert(err.response?.data.msg);
                } else if (err && err instanceof AxiosError) {
                    // err.response?.data ? alert(err.response?.data) : alert(err.message)
                    alert(err.message)
                } else {
                    alert('Error')
                }
            }

        }
        fetchData();

    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = cookies.get('token');
                const res = await axios({
                    method: 'get',
                    // url: `${BASEURL}/mycourses`,
                    // url: `${BASEURL}/myData`,
                    url: 'http://localhost:5001/api/courses',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!res) return alert('Network Error')
                console.log(res)
                setData(prev => ({
                    ...prev,
                    courses: res.data.courses
                }))
            } catch (err) {
                console.log(err);
                if (err && err instanceof Error && !AxiosError) {
                    alert(err.response?.data.msg);
                } else if (err && err instanceof AxiosError) {
                    // err.response?.data ? alert(err.response?.data) : alert(err.message)
                    alert(err.message)
                } else {
                    alert('Error')
                }
            }

        }
        fetchCourses();

    }, []);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = cookies.get('token');
                const res = await axios({
                    method: 'get',
                    // url: `${BASEURL}/mycourses`,
                    // url: `${BASEURL}/myData`,
                    url: 'http://localhost:5001/api/students',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!res) return alert('Network Error')
                console.log(res)
                setData(prev => ({
                    ...prev,
                    students: res.data.students
                }))
            } catch (err) {
                console.log(err);
                if (err && err instanceof Error && !AxiosError) {
                    alert(err.response?.data.msg);
                } else if (err && err instanceof AxiosError) {
                    // err.response?.data ? alert(err.response?.data) : alert(err.message)
                    alert(err.message)
                } else {
                    alert('Error')
                }
            }

        }
        fetchStudents();

    }, []);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const token = cookies.get('token');
                const res = await axios({
                    method: 'get',
                    // url: `${BASEURL}/mycourses`,
                    // url: `${BASEURL}/myData`,
                    url: 'http://localhost:5001/api/instructors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!res) return alert('Network Error')
                console.log(res)
                setData(prev => ({
                    ...prev,
                    instructors: res.data.instructors
                }))
            } catch (err) {
                console.log(err);
                if (err && err instanceof Error && !AxiosError) {
                    alert(err.response?.data.msg);
                } else if (err && err instanceof AxiosError) {
                    // err.response?.data ? alert(err.response?.data) : alert(err.message)
                    alert(err.message)
                } else {
                    alert('Error')
                }
            }

        }
        fetchInstructors();

    }, []);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const token = cookies.get('token');
                const res = await axios({
                    method: 'get',
                    // url: `${BASEURL}/mycourses`,
                    // url: `${BASEURL}/myData`,
                    url: 'http://localhost:5001/api/users',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!res) return alert('Network Error')
                console.log(res)
                setData(prev => ({
                    ...prev,
                    users: res.data.users
                }))
            } catch (err) {
                console.log(err);
                if (err && err instanceof Error && !AxiosError) {
                    alert(err.response?.data.msg);
                } else if (err && err instanceof AxiosError) {
                    // err.response?.data ? alert(err.response?.data) : alert(err.message)
                    alert(err.message)
                } else {
                    alert('Error')
                }
            }

        }
        fetchInstructors();

    }, []);
    // console.log(data.users[0].count)

    const logOutUser = () => {
        cookies.remove("token");
        navigate("/courses");
    };

    const handleViewForm = () => {
        setShowForm("block");
        setAddForm(!addForm)
        // document.body.style.overflow = "hidden";
    };
    
    const handleCloseForm = () => {
        setShowForm("hidden");
        setAddForm(!addForm)
        // document.body.style.overflow = "auto";
    };
console.log(data.userType);
    // console.log(dataQuery.data.details.firstName, 'jkkj')
    return (
        <div>
            <div className="container flex h-full gap-20 mx-auto mt-20 bg-white-400">
                <section className="flex flex-col w-1/2 gap-14 side_bar">
                    <div className="flex flex-col items-center gap-12 p-10 rounded-lg bg-gray-50 profile h-max">
                        <div className="object-cover w-40 h-40 overflow-hidden rounded-full">
                            <img src={course_img} alt="course_img" />
                        </div>
                        <div className='flex flex-col items-center text-blue-950'>
                            <h2 className='text-3xl'>{data.firstName} {data.lastName} </h2>
                            <p>{data.userType}</p>
                        </div>
                        <button className='w-5/6 p-6 text-xl font-medium text-blue-900 bg-blue-400 rounded-xl' onClick={handleViewForm}>Add New Course</button>
                    </div>

                    <div className="p-10 rounded-lg h-max bg-gray-50 profile">
                        <h2 className='text-3xl'>Dashboard</h2>
                        <ul className='leading-10'>
                            <li className='mt-8 text-2xl text-blue-950'>Dashboard</li>

                            <li className='mt-4 cursor-pointer hover:text-blue-500' onClick={() => navigate(`/student/${data.id}`)}>My Profile</li>
                            <li className='mt-4'>Enrolled Courses</li>
                            <li className='mt-4'>Whislist</li>
                            <li className='mt-4'>Reviews</li>
                            <li className='mt-4'>Order History</li>

                            <li className='mt-8 text-2xl text-blue-950'>Account Setting</li>
                            <li className='mt-4'>Edit Profile</li>
                            <li className='mt-4'>Change Password</li>
                            <li className='mt-4 cursor-pointer' onClick={logOutUser}>Logout</li>
                        </ul>
                    </div>
                </section>

                <section className='w-fit'>
                    <div className="grid grid-cols-3 gap-8 stat">
                        <div className="h-40 py-8 rounded-lg bg-gray-50 w-72">
                            <p className='mb-4 ml-8 text-2xl'>Active Courses</p>
                            <h2 className='ml-8 text-4xl'>12</h2>
                        </div>
                        <div className="h-40 py-8 rounded-lg bg-gray-50 w-72">
                            <p className='mb-4 ml-8 text-2xl'>Enrolled Courses</p>
                            {/* {data.courses.length >= 1 && data.courses.reduce((accumulator, currentValue) => {
                            console.log(accumulator, 'uyjf')
                            console.log(accumulator?.enrolled.length)
                        })} */}
                            <h2 className='ml-8 text-4xl'></h2>
                        </div>
                        <div className="h-40 py-8 rounded-lg bg-gray-50 w-72">
                            <p className='mb-4 ml-8 text-2xl'>Completed Courses</p>
                            <h2 className='ml-8 text-4xl'>12</h2>
                        </div>
                        <div className="h-40 py-8 rounded-lg bg-gray-50 w-72">
                            <p className='mb-4 ml-8 text-2xl'>No of instructor</p>
                            <h2 className='ml-8 text-4xl'>{data.instructors.length}</h2>
                        </div>
                        <div className="h-40 py-8 rounded-lg bg-gray-50 w-72">
                            <p className='mb-4 ml-8 text-2xl'>No of Student</p>
                            <h2 className='ml-8 text-4xl'>{data.students.length}</h2>
                        </div>
                        <div className="h-40 py-8 rounded-lg bg-gray-50 w-72">
                            <p className='mb-4 ml-8 text-2xl'>All Users</p>
                            {/* <h2 className='ml-8 text-4xl'>{data.users[3]._id}</h2> */}
                        </div>
                    </div>

                    <h2 className='my-10 text-3xl text-blue-950'>All Courses</h2>
                    <div className={`${data.courses.length > 3 && 'overflow-auto h-[32rem]'}`}>
                        <table className='w-full text-left bg-white rounded-lg shadow-md'>
                            <thead >
                                <tr className='bg-gray-50'>
                                    <th className='px-4 py-8'>S/N</th>
                                    <th className='px-4 py-8'>Courses</th>
                                    <th className='px-4 py-8'>Enrolled</th>
                                    <th className='px-4 py-8'>Status</th>
                                    <th className='px-4 py-8'>Action</th>
                                </tr>
                            </thead>
                            {/* {(dataQuery.isLoading) ? <h1>Is loading...</h1> : */}

                            <tbody>
                                {data.courses.map((course, index) => (
                                    <tr className='border-b-2'>
                                        <td className='px-4 py-8'>{index + 1}</td>
                                        <td className='flex items-center px-4 py-8'>
                                            <img className='object-cover w-16 h-16 mr-4 rounded-lg' src={course_img} alt="course_img" />
                                            {course.name}
                                        </td>
                                        <td className='px-4 py-8'>{course.enrolled.length}</td>
                                        <td className='px-4 py-8'>{course.status}</td>
                                        <td className='px-4 py-8' onClick={() => navigate(`/course/${course._id}`)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>

                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                            {/* } */}
                        </table>
                    </div>


                    <h2 className='my-10 text-3xl text-blue-950'>All Student</h2>
                    <div className={`${data.students.length > 3 && 'overflow-auto h-[32rem]'}`}>
                        <table className='w-full text-left bg-white rounded-lg shadow-md table-auto'>
                            <thead >
                                <tr className='bg-gray-50'>
                                    <th className='px-4 py-8'>S/N</th>
                                    <th className='px-4 py-8'>Image</th>
                                    <th className='px-4 py-8'>First Name</th>
                                    <th className='px-4 py-8'>last Name</th>
                                    <th className='px-4 py-8'>Email</th>
                                    <th className='px-4 py-8'>No of courses</th>
                                    <th className='px-4 py-8'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.students.map((student, index) => (
                                    <tr className='border-b-2'>
                                        <td className='px-4 py-8'>{index + 1}</td>
                                        <td className='flex items-center px-4 py-8'>
                                            <img className='object-cover w-16 h-16 mr-4 rounded-lg' src={course_img} alt="course_img" />
                                            {/* {student.firstName} */}
                                        </td>
                                        <td className='px-4 py-8'>{student.firstName}</td>
                                        <td className='px-4 py-8'>{student.lastName}</td>
                                        <td className='px-4 py-8'>{student.email}</td>
                                        <td className='px-4 py-8'>{student.courses.length}</td>
                                        <td className='px-4 py-8' onClick={() => navigate(`/student/${student._id}`)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>

                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h2 className='my-10 text-3xl text-blue-950'>All Instructors</h2>
                    <div className={`${data.instructors.length > 3 && 'overflow-auto h-[32rem]'}`}>
                        <table className='w-full text-left bg-white rounded-lg shadow-md table-fixed'>
                            <thead >
                                <tr className='bg-gray-50'>
                                    <th className='px-4 py-8'>S/N</th>
                                    <th className='px-4 py-8'>Image</th>
                                    <th className='px-4 py-8'>First Name</th>
                                    <th className='px-4 py-8'>last Name</th>
                                    <th className='px-4 py-8'>Email</th>
                                    <th className='px-4 py-8'>No of courses</th>
                                    <th className='px-4 py-8'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.instructors.map((instructor, index) => (
                                    <tr className='border-b-2'>
                                        <td className='px-4 py-8'>{index + 1}</td>
                                        <td className='flex items-center px-4 py-8'>
                                            <img className='object-cover w-16 h-16 mr-4 rounded-lg' src={course_img} alt="course_img" />
                                            {/* {instructor.firstName} */}
                                        </td>
                                        <td className='px-4 py-8'>{instructor.firstName}</td>
                                        <td className='px-4 py-8'>{instructor.lastName}</td>
                                        <td className='px-4 py-8'>{instructor.email}</td>
                                        <td className='px-4 py-8'>{instructor.courses.length}</td>
                                        <td className='px-4 py-8' onClick={() => navigate(`/instructor/${instructor._id}`)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>

                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>


                </section>
            </div>
        </div>
    )
}

export default AdminDashboard;