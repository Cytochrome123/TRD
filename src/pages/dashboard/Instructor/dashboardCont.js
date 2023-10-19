import React from 'react'
import SideBar from '../../../component/header/instructor/navbar'
import { Outlet } from 'react-router-dom'

const DashboardCont = () => {
  return (
    <div>
        < SideBar/>
        <div>< Outlet/></div>
        {/* <Outlet/> */}
    </div>
  )
}

export default DashboardCont