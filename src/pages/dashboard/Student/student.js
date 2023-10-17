import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import cookies from "js-cookie";

import { BASEURL } from '../../../App';
import course_img from '../../../images/trd_img.png'
import { Link, useNavigate } from 'react-router-dom';
import MetricCard from '../../../component/MetricCard';

const StudentDashboard = () => {
    const [courses, setCourses] = useState([])
    const [data, setData] = useState({
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        userType: '',
        courses: [],
    });


    const navigate = useNavigate()
    useEffect(() => {
        const token = cookies.get('token');
        axios({
            method: 'get',
            url: `${BASEURL}/myData`,
            // url: `${BASEURL}/myData`,
            // url: 'http://localhost:5001/api/myData',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data.details)
                setData(prev => ({
                    ...prev,
                    id: res.data.details._id,
                    firstName: res.data.details.firstName,
                    lastName: res.data.details.lastName,
                    email: res.data.details.email,
                    phoneNumber: res.data.details.phoneNumber,
                    userType: res.data.details.userType,
                    courses: res.data.details.courses
                }))
            })
            .catch(err => {
                console.log(err);
                if (Array.isArray(err.response?.data.msg)) {
                    alert(err.response.data.msg[0].msg);
                } else if (err.response) {
                    alert(err.response.data.msg);
                } else {
                    // err.response?.data ? alert(err.response?.data) : alert(err.message)
                    alert(err.message)
                }
            })
    }, []);

    return (
        <div className="container w-full pt-20 mx-auto">
            {/* ... (rest of your content code start) */}
            <div className="w-full px-4 mb-16 leading-normal text-gray-800 md:px-0 md:mt-8">

                {/* <!--Console Content--> */}

                <div className="flex flex-wrap-reverse justify-center">
                    <MetricCard title="Enrolled courses" value={data.courses.length} />
                    <MetricCard title="Active courses" value={data.courses.filter(course => course.progress == 'In-progress').length} />
                    <MetricCard title="Completed courses" value={data.courses.filter(course => course.progress == 'Completed').length} />
                    {/* <MetricCard title="active courses" value="50" />
                        <MetricCard title="no of instructor" value="5" />
                        <MetricCard title="total" value="5" /> */}
                </div>

                {/* <!--Divider--> */}
                {/* <hr className="mx-4 my-8 border-b-2 border-gray-400"> */}
                {/* <hr></hr> */}

                <div class="flex flex-row flex-wrap flex-grow mt-2">

                    <div class="w-full p-3">
                        {/* <!--Table Card--> */}
                        <div class="bg-white border rounded shadow">
                            <div class="border-b p-3">
                                <h5 class="font-bold uppercase text-gray-600">Recently Enrolled Courses</h5>
                            </div>
                            <div class="p-5">
                                <div className='overflow-x-auto '>
                                    <table className="w-full table-auto min-w-max x-overflow-scroll ">
                                        <thead>
                                            <tr className="text-white bg-blue-500">
                                                <th className="px-4 py-2">Course</th>
                                                <th className="px-4 py-2">Co-Instructor</th>
                                                <th className="px-4 py-2">Duration </th>
                                                <th className="px-4 py-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {courses.map(course => (
                                                <tr key={course.id} className="hover:bg-gray-100 group">
                                                    <td className="px-4 py-2">{course.course}</td>
                                                    <td className="px-4 py-2">{course.coInstructor}</td>
                                                    <td className="px-4 py-2">{course.duration}</td>
                                                    <td className="px-4 py-2 ">
                                                        <div className='relative flex justify-between'>
                                                            <Link to={`${course.id}`} className="h-8 text-blue-500 hover:underline">
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
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        {/* <!--/table Card--> */}
                    </div>


                    {/* Table two */}



                    <div class="w-full p-3">
                        {/* <!--Table Card--> */}
                        <div class="bg-white border rounded shadow">
                            <div class="border-b p-3">
                                <h5 class="font-bold uppercase text-gray-600">Course Pereformances</h5>
                            </div>
                            <div class="p-5">
                                <div className='overflow-x-auto '>
                                    <table className="w-full table-auto min-w-max x-overflow-scroll ">
                                        <thead>
                                            <tr className="text-white bg-blue-500">
                                                <th className="px-4 py-2">Course</th>
                                                <th className="px-4 py-2">Co-Instructor</th>
                                                <th className="px-4 py-2">Duration </th>
                                                <th className="px-4 py-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {courses.map(course => (
                                                <tr key={course.id} className="hover:bg-gray-100 group">
                                                    <td className="px-4 py-2">{course.course}</td>
                                                    <td className="px-4 py-2">{course.coInstructor}</td>
                                                    <td className="px-4 py-2">{course.duration}</td>
                                                    <td className="px-4 py-2 ">
                                                        <div className='relative flex justify-between'>
                                                            <Link to={`${course.id}`} className="h-8 text-blue-500 hover:underline">
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
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <p class="py-2"><a href="#">See More Courses...</a></p>

                            </div>
                        </div>
                        {/* <!--/table Card--> */}
                    </div>


                </div>

                {/* <!--/ Console Content--> */}

            </div>


            {/* ... (rest of your content code end) */}
        </div>
    )
}

export default StudentDashboard;




















