import {useState} from 'react'
import SideBar from '../../../component/header/instructor/SideBar'
import { Outlet } from 'react-router-dom'

const Main = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className='flex'>
        < SideBar handleSidebarToggle={handleSidebarToggle} isSidebarOpen={isSidebarOpen}/>
        < Outlet context={[isSidebarOpen]}/>
    </div>
  )
}

export default Main