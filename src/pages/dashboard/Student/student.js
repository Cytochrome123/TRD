import { useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import cookies from "js-cookie";

import { AlertContext, BASEURL } from '../../../App';
import course_img from '../../../images/trd_img.png'
import { Link, useNavigate } from 'react-router-dom';
import MetricCard from '../../../component/MetricCard';
import { useOutletContext } from 'react-router-dom';

const StudentDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isSidebarOpen] = useOutletContext();
    const {notify} = useContext(AlertContext);


    const navigate = useNavigate()
    useEffect(() => {
        const token = cookies.get('token');
        axios({
            method: 'get',
            url: `${BASEURL}/enrolled_courses`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data.details)
                setCourses(res.data.details);
                setLoading(false)
            })
            .catch(err => {
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
            })
        setLoading(false)
    }, []);

    return (
        <div>
            {/* <SideBar /> */}
            {/* <div className={`p-4 w-full ${isSidebarOpen ? 'ml-72' : ''} md:ml-72 my-20 h-screen`}> */}
            <div className={`p-4 w-full ${isSidebarOpen ? '' : ''} md:ml-64 my-20 min-h-screen mx-auto`}>
                {/* ... (rest of your content code start) */}
                <div className="w-full px-4 mb-16 leading-normal text-gray-800 md:px-0 md:mt-8">

                    {/* <!--Console Content--> */}

                    <div className="flex flex-wrap justify-center">
                        <MetricCard title="Enrolled courses" value={loading ? '....' : courses.length} />
                        <MetricCard title="Active courses" value={loading ? '....' : courses.filter(course => course.progress == 'In-progress').length} />
                        <MetricCard title="Upcoming courses" value={loading ? '....' : courses.filter(course => course.progress == 'Not-started').length} />
                        <MetricCard title="Completed courses" value={loading ? '....' : courses.filter(course => course.progress == 'Completed').length} />
                    </div>


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
                                                    <th className="px-4 py-2">Instructor</th>
                                                    <th className="px-4 py-2">Co-Instructor</th>
                                                    <th className="px-4 py-2">Duration </th>
                                                    <th className="px-4 py-2">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {loading ? <p>Loading</p> : courses.length === 0 ? <h1 className='h-32 text-xl text-center'>No data yet</h1> :
                                                    courses.map(course => (
                                                        <tr key={course.id} className="hover:bg-gray-100 group">
                                                            <td className="px-4 py-2">{course.course_id.title}</td>
                                                            <td className="px-4 py-2">{course.course_id.instructors[0] ? `${course.course_id.instructors[0]?.instructor?.firstName} ${course.course_id.instructors[0]?.instructor?.lastName}` : `Not assigned`}</td>
                                                            <td className="px-4 py-2">{course.course_id.instructors[1] ? `${course.course_id.instructors[1]?.instructor?.firstName} ${course.course_id.instructors[1]?.instructor?.lastName}` : `Nil`}</td>
                                                            <td className="px-4 py-2">{course.course_id.duration}</td>
                                                            <td className="px-4 py-2 ">
                                                                <div className='relative flex justify-between'>
                                                                    <span onClick={() => navigate(`/student/dashboard/enrolled-courses/${course.course_id._id}`)} className="h-8 text-blue-500 cursor-pointer hover:underline">
                                                                        View Profile
                                                                    </span>
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

                                                {loading ? ('Loading') : courses.length === 0 ? <h1 className='h-32 text-xl text-center'>No data yet</h1> :
                                                courses.map(course => (
                                                    <tr key={course.id} className="hover:bg-gray-100 group">
                                                        <td className="px-4 py-2">{course.course}</td>
                                                        <td className="px-4 py-2">{course.coInstructor}</td>
                                                        <td className="px-4 py-2">{course.duration}</td>
                                                        <td className="px-4 py-2 ">
                                                            <div className='relative flex justify-between'>
                                                                <Link to={`${course.id}`} className="h-8 text-blue-500 hover:underline">
                                                                    View Profile
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {courses.length > 0 && <p class="py-2"><a href="#">See More Courses...</a></p>}

                                </div>
                            </div>
                            {/* <!--/table Card--> */}
                        </div>


                    </div>

                    {/* <!--/ Console Content--> */}

                </div>


                {/* ... (rest of your content code end) */}
            </div>
        </div>
    )
}

export default StudentDashboard;




















