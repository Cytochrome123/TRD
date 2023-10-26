import React from 'react'
import Navbar from '../../../component/header/admin/navbar'
import { Outlet } from 'react-router-dom'

const ContDashboard = () => {
  return (
    <div>
        < Navbar/>

        <div className='mt-16'>
            < Outlet/>
         </div>
        {/* <Outlet/> */}
    </div>
  )
}

export default ContDashboard