import { useEffect, useState, useContext } from 'react';
import MetricCard from '../../../component/MetricCard'
// import ApexCharts from 'apexcharts'
import Chart from "react-apexcharts";
// import SideBar from '../../../component/SideBar';
import axios from 'axios';
import { AlertContext, BASEURL } from '../../../App';
import Cookies from 'js-cookie';
import { useOutletContext } from 'react-router-dom';



const AdminDashboard = () => {

    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isSidebarOpen] = useOutletContext();
    const {notify} = useContext(AlertContext)

    const token = Cookies.get('token');

    useEffect(() => {
        axios({
            method: 'get',
            url: `${BASEURL}/users`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res, 'users');
                setUsers(res.data.users);
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
    }, [])

    useEffect(() => {
        axios({
            method: 'get',
            url: `${BASEURL}/courses`,
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                console.log(res, 'courses');
                setCourses(res.data.courses);
                setLoading(false);
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
    }, []);

    // The donot chart data
    const [chartData, setChartData] = useState({
        options: {},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E'],
    });

    // Responsible for the scrolling up of the nasted route in the dashboard
    useEffect(() => {


        window.scroll(0, 0)
    }, [])

    const curs = courses.filter(item => item.enrolled.length > 0)
    console.log(curs, 'curs');


    const options = {
        chart: {
            type: 'bar',
            height: 50,
            stacked: true,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'top',
                    offsetX: 10,
                    offsetY: 0
                }
            }
        }],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 10,
                dataLabels: {
                    total: {
                        enabled: false,
                        style: {
                            // display:'none',
                            //   fontSize: '1px',
                            //   fontWeight: 9,
                            //   color:'green',
                            // marginBottom: '10px'
                        }
                    }
                }
            },
        },
        xaxis: {
            type: 'datetime',
            categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
                '01/05/2011 GMT', '01/06/2011 GMT', "01/07/2011 GMT",
                "01/08/2011 GMT",
                "01/09/2011 GMT",
                "01/10/2011 GMT",
                "01/11/2011 GMT",
                "01/12/2011 GMT",
            ],
        },
        legend: {
            position: 'top',
            offsetY: 10,
            offsetX: 60,
            style: {
                padding: '1px',
                background: 'red'
            }
        },
        fill: {
            opacity: 1
        },
        colors: ["#0973CA", "#FFC11C"],


    };

    const series = [{
        name: 'Total signup',
        data: [80, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43]
    },
    {
        name: 'Registered Student',
        data: [20, 7, 25, 13, 22, 8, 21, 7, 25, 13, 22, 18]
    }]
    // let total = users.reduce((acc, user) => user.count + acc, 0);

    //     console.log(total);

    return (
        <>
            {/* <SideBar /> */}
            {/* <div className={`p-4 w-full ${isSidebarOpen ? '' : ''} md:ml-72 my-20`}> */}
            <div className={`p-4 w-full md:ml-64 my-20`}>
                {/* ... (rest of your content code start) */}
                <div className="w-full px-4 mb-16 leading-normal text-gray-800 md:px-0 md:mt-8">

                    {/* <!--Console Content--> */}

                    <div className="flex flex-wrap">
                        <MetricCard
                            title="total sign up"
                            value={
                                loading ? '....' : users.reduce((acc, user) => user.count + acc, 0)
                            }
                        />
                        <MetricCard
                            title="rergistered student"
                            value={
                                loading ? '....' : ((users.find(item => item._id === 'student') || {}).count || 0)
                            }
                        />
                        <MetricCard
                            title="no of instructor"
                            value={
                                loading ? '....' : ((users.find(item => item._id === 'instructor') || {}).count || 0)
                            }
                        />
                        <MetricCard title="No of courses" value={loading ? '....' : courses.length} />
                        <MetricCard
                            title="enrolled courses"
                            value={
                                loading ? '...' : (courses.filter(item => item.enrolled.length > 0)).length
                            }
                        />
                        <MetricCard
                            title="Ongoing courses"
                            value={
                                loading ? '...' : (courses.filter(item => item.status === 'In progress')).length
                            }
                        />
                        <MetricCard
                            title="Upcoming courses"
                            value={
                                loading ? '...' : (courses.filter(item => item.status === 'Upcomin')).length
                            }
                        />
                        <MetricCard
                            title="Completed courses"
                            value={
                                loading ? '...' : (courses.filter(item => item.status === 'Completed')).length
                            }
                        />
                        <MetricCard
                            title="No of Admin"
                            value={
                                loading ? '....' : ((users.find(item => item._id === 'admin') || {}).count || 0)
                            }
                        />
                    </div>

                    {/* <!--Divider--> */}
                    {/* <hr className="mx-4 my-8 border-b-2 border-gray-400"> */}
                    {/* <hr></hr> */}

                    <div className="flex flex-row flex-wrap flex-grow mt-2">

                        <div className="w-full p-3 md:w-1/2">
                            {/* <!--Graph Card--> */}
                            <div className="bg-white border rounded shadow">
                                <div className="p-3 border-b">
                                    <h5 className="font-bold text-gray-600 uppercase">Students</h5>
                                </div>
                                <div className="p-1">
                                    <Chart options={options} series={series} type="bar" width="100%" height="233" />

                                </div>
                            </div>
                            {/* <!--/Graph Card--> */}
                        </div>

                        <div className="w-full p-3 md:w-1/2">
                            {/* <!--Graph Card--> */}
                            <div className="bg-white border rounded shadow">
                                <div className="p-3 border-b">
                                    <h5 className="font-bold text-gray-600 uppercase">Courses</h5>
                                </div>
                                <div className="p-1">
                                    <Chart options={chartData.options} series={chartData.series} type="donut" width="380" />

                                </div>
                            </div>
                            {/* <!--/Graph Card--> */}
                        </div>






                        <div className="w-full p-3">
                            {/* <!--Table Card--> */}
                            <div className="bg-white border rounded shadow">
                                <div className="p-3 border-b">
                                    <h5 className="font-bold text-gray-600 uppercase">Table</h5>
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


                    </div>

                    {/* <!--/ Console Content--> */}

                </div>


                {/* ... (rest of your content code end) */}
            </div>
        </>
    )
}

export default AdminDashboard