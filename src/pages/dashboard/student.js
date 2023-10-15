import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import cookies from "js-cookie";

import { BASEURL } from '../../App';
import course_img from '../../images/trd_img.png'
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {

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
            // url: `${BASEURL}/mycourses`,
            // url: `${BASEURL}/myData`,
            url: 'http://localhost:5001/api/myData',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res)
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
                if (err && err instanceof Error && !AxiosError) {
                    alert(err.response?.data.msg);
                } else if (err && err instanceof AxiosError) {
                    // err.response?.data ? alert(err.response?.data) : alert(err.message)
                    alert(err.message)
                } else {
                    alert('Error')
                }
            })
    }, []);

    return (
        <div className="container h-full gap-20 mx-auto mt-20 lg:flex">
            <section className="flex flex-col w-full gap-14 side_bar lg:w-96">
                <div className="flex flex-col items-center gap-12 p-10 rounded-lg h-96 bg-gray-50 profile w-96">
                    <div className="object-cover w-40 h-40 overflow-hidden rounded-full">
                        <img src={course_img} alt="course_img" />
                    </div>
                    <div className='flex flex-col items-center'>
                        <h2 className='text-3xl'>{data.firstName} {data.lastName} </h2>
                        <p>{data.userType}</p>
                    </div>
                </div>

                <div className="p-10 rounded-lg h-max bg-gray-50 profile">
                    <h2 className='text-3xl'>Dashboard</h2>
                    <ul className='leading-10'>
                        <li className='mt-8 text-2xl text-blue-500'>Dashboard</li>

                        <li className='mt-4 cursor-pointer hover:text-blue-500' onClick={() => navigate(`/student/${data.id}`)}>My Profile</li>
                        <li className='mt-4'>Enrolled Courses</li>
                        <li className='mt-4'>Reviews</li>

                        <li className='mt-8 text-2xl text-blue-500'>Account Setting</li>
                        <li className='mt-4'>Edit Profile</li>
                        <li className='mt-4'>Change Password</li>
                        <li className='mt-4'>Logout</li>
                    </ul>
                </div>
            </section>

            <section className='w-fit'>
                <div className="flex justify-between stat">
                    <div className="h-40 py-8 rounded-lg bg-gray-50 w-72">
                        <p className='mb-4 ml-8 text-2xl'>Enrolled Courses</p>
                        <h2 className='ml-8 text-4xl'>{data.courses.length}</h2>
                    </div>
                    <div className="h-40 py-8 rounded-lg bg-gray-50 w-72">
                        <p className='mb-4 ml-8 text-2xl'>Active Courses</p>
                        <h2 className='ml-8 text-4xl'>{data.courses.filter(course => course.progress == 'In-progress').length}</h2>
                    </div>
                    <div className="h-40 py-8 rounded-lg bg-gray-50 w-72">
                        <p className='mb-4 ml-8 text-2xl'>Completed Courses</p>
                        <h2 className='ml-8 text-4xl'>{data.courses.filter(course => course.progress == 'Completed').length}</h2>
                    </div>
                </div>

                <h2 className='my-10 text-3xl text-blue-500'>Recently Enrolled Courses</h2>

                <div className="grid gap-10 lg:grid-cols-2 courses gap-y-10 grid-col-1">

                    {data.courses.map(course => (
                        <div className="p-6 shadow-lg h-max rounded-xl bg-gray-50 profile w-[32rem] lg:w-auto">
                            <div className="overflow-hidden rounded-xl h-72">
                                <img src={course_img} alt="course_img" />
                            </div>
                            <div className="flex items-center justify-between">
                                {course.courseID?.instructors?.map(instructor => (
                                    <div className='flex items-center mt-6 instructor'>
                                        <img className='object-cover w-16 h-16 mr-4 rounded-full' src={course_img} alt="course_img" />
                                        <div>
                                            <h3 className='lg:text-2xl'>{instructor.instructor.lastName} {instructor.instructor.firstName}</h3>
                                            <p className='text-xs lg:text-base'>Instructor</p>

                                        </div>
                                    </div>
                                ))}
                                <div className='fav'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>

                                </div>
                            </div>
                            <h2 className="mt-6 text-3xl text-blue-500 title">{course.courseID.title}</h2>
                            <div className="flex justify-between mt-6 text-lg details">
                                <div>1O Lessons</div>
                                <div>{course.courseID.duration}</div>
                            </div>
                            <hr />
                            <div className='flex items-center justify-between mt-6'>
                                <div className="ratings">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 inline">
                                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 inline">
                                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 inline">
                                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>

                                    3.0 (1)
                                </div>
                                <span
                                    className="text-sm font-medium text-blue-500 transition duration-300 ease-in-out cursor-pointer hover:text-blue-600"
                                    onClick={() => navigate(`/course/${course.courseID._id}`)}
                                >
                                    View Details →
                                </span>

                            </div>
                        </div>
                    ))}

                </div>

            </section>
        </div>
    )
}

export default StudentDashboard;