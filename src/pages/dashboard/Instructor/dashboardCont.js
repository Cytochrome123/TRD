import React from 'react'
import Navbar from '../../../component/header/instructor/navbar'
import { Outlet } from 'react-router-dom'

const DashboardCont = () => {
  return (
    <div>
        < Navbar/>
        <div>< Outlet/></div>
        {/* <Outlet/> */}
    </div>
  )
}

export default DashboardCont