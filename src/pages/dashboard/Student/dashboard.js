import React from 'react'
import SideBar from '../../../component/header/student/StudentSideBar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
        < SideBar/>
        <div>< Outlet/></div>
        {/* <Outlet/> */}
    </div>
  )
}

export default Dashboard