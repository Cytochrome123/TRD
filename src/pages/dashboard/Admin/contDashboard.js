import React from 'react'
import SideBar from '../../../component/header/admin/navbar'
import { Outlet } from 'react-router-dom'

const ContDashboard = () => {
  return (
    <div>
        < SideBar/>

        <div className='mt-16'>
            < Outlet/>
         </div>
        {/* <Outlet/> */}
    </div>
  )
}

export default ContDashboard