import React, { useEffect, useState } from 'react'
import MetricCard from '../../../component/MetricCard';
// import ApexCharts from 'apexcharts'
import Chart from "react-apexcharts";
import SideBar from '../../../component/SideBar';


const InstructorDashboard = () => {
    // The donot chart data
    const [chartData, setChartData] = useState({
        options: {},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E'],
      });

    // Responsible for the scrolling up of the nasted route in the dashboard
    useEffect(() => {
      

        window.scroll(0,0)
    }, [])
    



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
            padding:'1px',
            background:'red'
          }
        },
        fill: {
          opacity: 1
        },
        colors: [ "#0973CA","#FFC11C"],
    
    
      };
    
      const series =  [{
        name: 'Cases reported',
        data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43]
      },
      {
        name: 'Cases solved',
        data: [21, 7, 25, 13, 22, 8, 21, 7, 25, 13, 22, 18]
      }]

  return (
    <>
      <SideBar />
         <div className="container w-full pt-20 mx-auto my-32">
        {/* ... (rest of your content code start) */}
        <div className="w-full px-4 mb-16 leading-normal text-gray-800 md:px-0 md:mt-8">

            {/* <!--Console Content--> */}

            <div className="flex flex-wrap">
               <MetricCard title="No of Assigned courses" value="500" />
               <MetricCard title="Active courses" value="50" />
               <MetricCard title="Completed courses" value="5" />
               <MetricCard title="No of students" value="50" />
            </div>

            {/* <!--Divider--> */}
            {/* <hr className="mx-4 my-8 border-b-2 border-gray-400"> */}
            {/* <hr></hr> */}

            <div className="flex flex-row flex-wrap flex-grow mt-2">

                <div className="w-full p-3 md:w-1/2">
                    {/* <!--Graph Card--> */}
                    <div className="bg-white border rounded shadow">
                        <div className="p-3 border-b">
                            <h5 className="font-bold text-gray-600 uppercase">Graph</h5>
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
                            <h5 className="font-bold text-gray-600 uppercase">Graph</h5>
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

export default InstructorDashboard;