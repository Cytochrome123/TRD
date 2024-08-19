import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import cookies from 'js-cookie';

import { AlertContext } from '../../../App';
import { Link, useNavigate } from 'react-router-dom';
import MetricCard from '../../../component/MetricCard';
import { useOutletContext } from 'react-router-dom';

const StudentDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isSidebarOpen] = useOutletContext();
    const { notify } = useContext(AlertContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = cookies.get('token');
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVERURL}/enrolled_courses`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setCourses(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                if (Array.isArray(err.response?.data.message)) {
                    notify('error', err.response.data.errors[0].msg);
                } else if (err.response) {
                    notify('error', err.response.data.message || err.response.data);
                } else {
                    notify('error', err.message);
                }
                setLoading(false);
            });
    }, [notify]);

    return (
        <div className={`w-full sm:ml-64 my-20 min-h-screen mx-auto overflow-hidden`}>
            <div className="w-full px-4 mb-16 leading-normal text-gray-800 md:px-0 md:mt-8">
                <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center">
                    <MetricCard title="Enrolled courses" value={loading ? '....' : courses.length} />
                    <MetricCard title="Active courses" value={loading ? '....' : courses.filter(course => course.progress === 'In-progress').length} />
                    <MetricCard title="Upcoming courses" value={loading ? '....' : courses.filter(course => course.progress === 'Not-started').length} />
                    <MetricCard title="Completed courses" value={loading ? '....' : courses.filter(course => course.progress === 'Completed').length} />
                </div>

                <div className="flex flex-col mt-2">
                    <div className="w-full p-3">
                        <div className="bg-white border rounded shadow">
                            <div className="border-b p-3">
                                <h5 className="font-bold uppercase text-gray-600">Recently Enrolled Courses</h5>
                            </div>
                            <div className="p-5 overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="text-white bg-blue-500">
                                            <th className="px-4 py-2">Course</th>
                                            <th className="px-4 py-2">Instructor</th>
                                            <th className="px-4 py-2">Co-Instructor</th>
                                            <th className="px-4 py-2">Duration</th>
                                            <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? <tr><td colSpan="5">Loading</td></tr> : courses.length === 0 ? <tr><td colSpan="5" className="text-center">No data yet</td></tr> :
                                            courses.map(course => (
                                                <tr key={course._id} className="hover:bg-gray-100 group">
                                                    <td className="px-4 py-2">{course.course_id.title}</td>
                                                    <td className="px-4 py-2">{course.course_id.instructors[0] ? `${course.course_id.instructors[0]?.instructor?.firstName} ${course.course_id.instructors[0]?.instructor?.lastName}` : 'Not assigned'}</td>
                                                    <td className="px-4 py-2">{course.course_id.instructors[1] ? `${course.course_id.instructors[1]?.instructor?.firstName} ${course.course_id.instructors[1]?.instructor?.lastName}` : 'Nil'}</td>
                                                    <td className="px-4 py-2">{course.course_id.duration}</td>
                                                    <td className="px-4 py-2">
                                                        <span onClick={() => navigate(`/student/dashboard/enrolled-courses/${course.course_id._id}`)} className="h-8 text-blue-500 cursor-pointer hover:underline">
                                                            View Profile
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="w-full p-3">
                        <div className="bg-white border rounded shadow">
                            <div className="border-b p-3">
                                <h5 className="font-bold uppercase text-gray-600">Course Performances</h5>
                            </div>
                            <div className="p-5 overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="text-white bg-blue-500">
                                            <th className="px-4 py-2">Course</th>
                                            <th className="px-4 py-2">Co-Instructor</th>
                                            <th className="px-4 py-2">Duration</th>
                                            <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? <tr><td colSpan="4">Loading</td></tr> : courses.length === 0 ? <tr><td colSpan="4" className="text-center">No data yet</td></tr> :
                                            courses.map(course => (
                                                <tr key={course.id} className="hover:bg-gray-100 group">
                                                    <td className="px-4 py-2">{course.course}</td>
                                                    <td className="px-4 py-2">{course.coInstructor}</td>
                                                    <td className="px-4 py-2">{course.duration}</td>
                                                    <td className="px-4 py-2">
                                                        <Link to={`${course.id}`} className="h-8 text-blue-500 hover:underline">
                                                            View Profile
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                                {courses.length > 0 && <p className="py-2"><a href="#">See More Courses...</a></p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;
