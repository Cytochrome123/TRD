import React from 'react'
import { useState, useEffect, useRef } from "react";

import axios, { AxiosError } from 'axios';
import cookies from "js-cookie";
// import { Link } from "react-router-dom";
import MetricCard from './MetricCard'
// import ViewMoreDetails from './ViewMoreDetails'


const AdminMainBody = () => {

    const [ data , setData ] = useState([]);
    const [ courses, setCourses] = useState([]);

    const ref = useRef(true);
    
    useEffect( () => {
        if (ref.current) {

            const token = cookies.get('token')
            // if (token) {
            //     const decoded = jwtDecode(token);
            //     console.log(decoded)
            //     decoded.userType === 'admin' ? setIsAdmin(true) : setIsAdmin(false)
            // }
            axios({
                method: 'get',
                url: 'http://localhost:5001/api/users',
                // url: `${BASEURL}/examiner/exam`,
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${'token'}`
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                // handleAlert(true, res.data.msg, 'success');
                console.log(res.data.users)
                setData(res.data.users)
            })
            .catch(err => {
                console.log(err)
                if(err && err instanceof AxiosError) {
                    alert(err.message)
                } else if(err && err instanceof Error) {
                    alert(err.response?.data.message);
                } else {
                    alert('Error')
                }
            });

            axios({
                method: 'get',
                url: 'http://localhost:5001/api/courses',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                console.log(res.data.courses)
                setCourses(res.data.courses)
            })
            .catch(e => {
                console.log(e)
                // e.response.data.msg ? alert(e.response.data.msg) : alert(e.response.data.data.msg)
            });
        }

      return () => ref.current = false;
    })

  return (
    <>
        <div className="flex flex-col md:flex-row">
        <nav aria-label="alternative nav">
            <div className="bg-gray-800 shadow-xl h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center">

                <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
                    <ul className="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
                        <li className="mr-3 flex-1">
                            <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                                <i className="fas fa-tasks pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Dashboard</span>
                            </a>
                        </li>
                       
                        <li className="mr-3 flex-1">
                            <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-blue-600">
                                <i className="fas fa-chart-area pr-0 md:pr-3 text-blue-600"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Admin</span>
                            </a>
                        </li>
                    </ul>
                </div>


            </div>
        </nav>
        <section>
            <div id="main" className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">

                <div className="bg-gray-800 pt-3">
                    <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                        <h1 className="font-bold pl-2">Admin Dashboard</h1>
                    </div>
                </div>

                <div className="flex flex-wrap">
                    {data.map(( user) => (
                        <MetricCard colour='pink' caption={user._id} number={user.count} />
                    ))}
                    <MetricCard colour='pink' caption="course" number={courses.length} />
                    
                       {/* <MetricCard colour='pink' caption="total sign in" number="3249" />
                        
                       <MetricCard colour='green' caption="total number of student" number="249" />

                       <MetricCard colour='yellow' caption="NUMBER OF INSTRUCTORS" number="49" />

                       <MetricCard colour='blue' caption="NUMBER OF admins" number="2" /> */}
                        
                </div>


                <div className="flex flex-row flex-wrap flex-grow mt-2">

                    <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                        {/* <!--Table Card--> */}
                        <div className="bg-white border-transparent rounded-lg shadow-xl">
                            <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                <h2 className="font-bold uppercase text-gray-600"> details on Instructors</h2>
                            </div>
                            <div className="p-5">
                                <table className="w-full p-5 text-gray-700">
                                    <thead>
                                    <tr>
                                        <th className="text-left text-blue-900">Name</th>
                                        <th className="text-left text-blue-900">Side</th>
                                        <th className="text-left text-blue-900">Role</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        <td>Obi Wan Kenobi</td>
                                        <td>Light</td>
                                        <td>Jedi</td>
                                    </tr>
                                    <tr>
                                        <td>Greedo</td>
                                        <td>South</td>
                                        <td>Scumbag</td>
                                    </tr>
                                    <tr>
                                        <td>Darth Vader</td>
                                        <td>Dark</td>
                                        <td>Sith</td>
                                    </tr>
                                    </tbody>
                                </table>

                                <p className="py-2"><a href="#">See More issues...</a></p>

                            </div>
                        </div>
                        {/* <!--/table Card--> */}
                    </div>

                <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                    {/* <!--Advert Card--> */}
                    <div className="bg-white border-transparent rounded-lg shadow-xl">
                        <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                            <h2 className="font-bold uppercase text-gray-600">Advert</h2>
                        </div>
                        <div className="p-5 text-center">


                            <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CK7D52JJ&placement=wwwtailwindtoolboxcom" id="_carbonads_js"></script>


                        </div>
                    </div>
                    {/* <!--/Advert Card--> */}
                </div>


                </div>
            </div>
        </section>
    </div>
    </>
  )
}

export default AdminMainBody