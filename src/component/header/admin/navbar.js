import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
// import {  } from "react-router-dom";


function DropdownMenuToggle({ children, menuId, buttonId }) {
    const [isVisible, setIsVisible] = useState(true);

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };

    const handleClickOutside = (e) => {
        if (!document.getElementById(menuId).contains(e.target) && !document.getElementById(buttonId).contains(e.target)) {
            setIsVisible(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block float-right">
            <button id={buttonId} className="flex items-center mr-3 focus:outline-none" onClick={handleToggle}>
                {children}
                <h2>hello</h2>
            </button>
            <div
                id={menuId}
                className={`bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto ${isVisible ? '' : 'invisible'
                    }`}
            >
                {isVisible && <ul className="list-reset">{children}</ul>}
            </div>
        </div>
    );
}





const SideBar = () => {
    const [isActive, setIsActive] = useState('home')


    // const [removeActive, setRermoveActive] = useState(false)
    const [isVisible, setIsVisible] = useState(false);
  
    const handleToggle = () => {
      setIsVisible(!isVisible);
    };
    // 
    // style={isActive ? {color:"blue", border:"none"} :{color:'initial'}}
    // 

    const handleButtonClick = (item)=>{
      setIsVisible(!isVisible);

        // setIsActive(false);
        setIsActive(item);
        
    }

    // buttons content
    // const buttonsContent = ["Home","Students","Instructors","Courses", "PlaceHolder"]
  return (
    <>
        <nav id="header" className="fixed top-0 z-10 w-full mt-10 bg-white shadow">
        {/* ... (rest of your navigation code start) */}
        <div className="container flex flex-wrap items-center w-full pt-3 pb-3 mx-auto mt-10 md:pb-0">

            {/* <div className="w-1/2 pl-2 md:pl-0">
                <a className={`text-gray-900 text-base xl:text-xl no-underline hover:no-underline font-bold`} href="#">
                    <i className="pr-3 text-pink-600 fas fa-sun"></i> Admin Dashboard
                </a>
            </div> */}
            <div className="w-full pr-0">
                <div className="relative flex float-right">

                    <div className="relative text-sm">
                        <button id="userButton" className="flex items-center mr-3 focus:outline-none">
                            <img className="w-8 h-8 mr-4 rounded-full" src="http://i.pravatar.cc/300" alt="Avatar of User"/> <span className="hidden md:inline-block">Hi, User </span>
                            <svg className="h-2 pl-2" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" >
                                <g>
                                    <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" />
                                </g>
                            </svg>
                        </button>
                        {/* <div id="userMenu" className="absolute top-0 right-0 z-30 invisible min-w-full mt-2 mt-12 overflow-auto bg-white rounded shadow-md">
                            <ul className="list-reset">
                                <li><a href="#" className="block px-4 py-2 text-gray-900 no-underline hover:bg-gray-400 hover:no-underline">My account</a></li>
                                <li><a href="#" className="block px-4 py-2 text-gray-900 no-underline hover:bg-gray-400 hover:no-underline">Notifications</a></li>
                                <li>
                                    <hr className="mx-2 border-t border-gray-400"/>
                                </li>
                                <li><a href="#" className="block px-4 py-2 text-gray-900 no-underline hover:bg-gray-400 hover:no-underline">Logout</a></li>
                            </ul>
                        </div> */}
                    </div>


                        
                    <div className="block pr-4 lg:hidden">
                        <button onClick={handleToggle}  id="nav-toggle" className="flex items-center px-3 py-2 text-gray-500 border border-gray-600 rounded appearance-none hover:text-gray-900 hover:border-teal-500 focus:outline-none">
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>

                

            </div>

                {/* Drop down for small screen start */}
            {isVisible &&  <div className="z-20 flex-grow w-full mt-2 bg-white lg:hidden lg:items-center lg:w-auto lg:mt-0" id="nav-content">
                <ul className="items-center flex-1 px-4 list-reset lg:flex md:px-0">
                    <li className="my-2 mr-6 md:my-0">
                        <Link onClick={() =>handleButtonClick('home')} to="/admin/dashboard" className={`block py-1 md:py-3 pl-1 align-middle  border-b-2  hover:border-blue-600 ${isActive === 'home' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}  >
                            <i className="mr-3 text-pink-600 fas fa-home fa-fw"></i><span className="pb-1 text-sm md:pb-0">Home</span>
                        </Link>
                    </li>
                    <li className="my-2 mr-6 md:my-0">
                        <Link onClick={() =>handleButtonClick('Student')} to="students" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Student' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                            <i className="mr-3 fas fa-tasks fa-fw"></i><span className="pb-1 text-sm md:pb-0">Student</span>
                        </Link>
                    </li>
                    <li className="my-2 mr-6 md:my-0">
                        <Link onClick={() =>handleButtonClick('Instructors')} to="instructors" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Instructors' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                            <i className="mr-3 fa fa-envelope fa-fw"></i><span className="pb-1 text-sm md:pb-0">Instructors</span>
                        </Link>
                    </li>
                    <li  className="my-2 mr-6 md:my-0">
                        <Link onClick={() =>handleButtonClick('Courses')} to="courses" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Courses' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                            <i className="mr-3 fas fa-chart-area fa-fw"></i><span className="pb-1 text-sm md:pb-0">Courses</span>
                        </Link>
                    </li>
                    {/* <li className="my-2 mr-6 md:my-0">
                        <Link onClick={() =>handleButtonClick('Completed course')} to="completed" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Completed course' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                         <i className="mr-3 fa fa-wallet fa-fw"></i><span className="pb-1 text-sm md:pb-0">Completed course</span>
                        </Link>
                    </li>
                    <li className="my-2 mr-6 md:my-0">
                        <Link onClick={() =>handleButtonClick('placeholder')} to="#" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'placeholder' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`} >                           
                        <i className="mr-3 fa fa-wallet fa-fw"></i><span className="pb-1 text-sm md:pb-0">placeholder</span>
                        </Link>
                    </li> */}
              
                </ul>

                <div className="relative pl-4 pr-4 pull-right md:pr-0">
                    <input type="search" placeholder="Search" className="w-full px-2 py-1 pl-10 text-sm leading-normal text-gray-800 transition bg-gray-100 border rounded appearance-none focus:outline-none focus:border-gray-700"/>
                    <div className="absolute search-icon" style={{top: '0.375rem', left: '1.75rem',}}>
                        <svg className="w-4 h-4 text-gray-800 pointer-events-none fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                        </svg>
                    </div>
                </div>
                

            </div>
}
                {/* Drop down for small screen end */}

                {/* Drop down for small screen start 2 */}
               <div className="z-20 flex-grow hidden w-full mt-2 bg-white lg:flex lg:items-center lg:w-auto lg:mt-0" id="nav-content">
                <ul className="items-center flex-1 px-4 list-reset lg:flex md:px-0">
                    <li className="my-2 mr-6 md:my-0">
                        <Link onClick={() =>handleButtonClick('home')} to="/admin/dashboard" className={`block py-1 md:py-3 pl-1 align-middle  border-b-2  hover:border-blue-600 ${isActive === 'home' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}  >
                            <i className="mr-3 text-pink-600 fas fa-home fa-fw"></i><span className="pb-1 text-sm md:pb-0">Home</span>
                        </Link>
                    </li>
                    <li className="my-2 mr-6 md:my-0">
                        <Link onClick={() =>handleButtonClick('Student')} to="students" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Student' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                            <i className="mr-3 fas fa-tasks fa-fw"></i><span className="pb-1 text-sm md:pb-0">Student</span>
                        </Link>
                    </li>
                    <li className="my-2 mr-6 md:my-0">
                        <Link onClick={() =>handleButtonClick('Instructors')} to="instructors" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Instructors' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                            <i className="mr-3 fa fa-envelope fa-fw"></i><span className="pb-1 text-sm md:pb-0">Instructors</span>
                        </Link>
                    </li>
                    <li  className="my-2 mr-6 md:my-0">
                        <Link onClick={() =>handleButtonClick('Courses')} to="courses" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Courses' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                            <i className="mr-3 fas fa-chart-area fa-fw"></i><span className="pb-1 text-sm md:pb-0">Courses</span>
                        </Link>
                    </li>
                    {/* <li className="my-2 mr-6 md:my-0">
                        <Link onClick={() =>handleButtonClick('Completed course')} to="completed" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Completed course' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                         <i className="mr-3 fa fa-wallet fa-fw"></i><span className="pb-1 text-sm md:pb-0">Completed course</span>
                        </Link>
                    </li>
                    <li className="my-2 mr-6 md:my-0">
                        <Link onClick={() =>handleButtonClick('placeholder')} to="#" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'placeholder' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`} >                           
                        <i className="mr-3 fa fa-wallet fa-fw"></i><span className="pb-1 text-sm md:pb-0">placeholder</span>
                        </Link>
                    </li> */}
              
                </ul>

                {/* <div className="relative pl-4 pr-4 pull-right md:pr-0">
                    <input type="search" placeholder="Search" className="w-full px-2 py-1 pl-10 text-sm leading-normal text-gray-800 transition bg-gray-100 border rounded appearance-none focus:outline-none focus:border-gray-700"/>
                    <div className="absolute search-icon" style={{top: '0.375rem', left: '1.75rem',}}>
                        <svg className="w-4 h-4 text-gray-800 pointer-events-none fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                        </svg>
                    </div>
                </div>
                 */}

            </div>
                {/* Drop down for small screen end 2 */}



            
        </div>
        {/* ... (rest of your navigation code end) */}
        {/* <DropdownMenuToggle menuId="userMenu" buttonId="userButton"> */}
          {/* <div className='bg-red-200'>
          <img className="w-8 h-8 mr-4 rounded-full" src="http://i.pravatar.cc/300" alt="Avatar of User" />
          <span className="hidden md:inline-block">Hi,h User</span>
          <span className="hidden md:inline-block">Hi,h User</span>
          <svg
            className="h-8 pl-2"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 129 129"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            enableBackground="new 0 0 129 129"
          > */}
            {/* ... (SVG path code) */}
          {/* </svg>
          </div> */}
        {/* </DropdownMenuToggle> */}
        {/* <Outlet/> */}

      </nav>

    </>
  )
}

export default SideBar;