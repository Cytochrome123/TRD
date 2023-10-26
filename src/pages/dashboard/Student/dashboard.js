import React from 'react'
import Navbar from '../../../component/header/student/StudentNavbar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
        < Navbar/>
        <div>< Outlet/></div>
        {/* <Outlet/> */}
    </div>
  )
}

export default Dashboard