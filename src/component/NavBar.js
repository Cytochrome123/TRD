import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
        <button id={buttonId} className="flex items-center focus:outline-none mr-3" onClick={handleToggle}>
          {children}
          <h2>hello</h2>
        </button>
        <div
          id={menuId}
          className={`bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto ${
            isVisible ? '' : 'invisible'
          }`}
        >
          {isVisible && <ul className="list-reset">{children}</ul>}
        </div>
      </div>
    );
  }
  




const NavBar = () => {
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
        <nav id="header" className="bg-white mt-10 fixed w-full z-10 top-0 shadow">
        {/* ... (rest of your navigation code start) */}
        <div className="w-full container mx-auto  flex flex-wrap items-center mt-10 pt-3 pb-3 md:pb-0">

            <div className="w-1/2 pl-2 md:pl-0">
                <a className={`text-gray-900 text-base xl:text-xl no-underline hover:no-underline font-bold`} href="#">
                    <i className="fas fa-sun text-pink-600 pr-3"></i> Admin Dashboard
                </a>
            </div>
            <div className="w-1/2 pr-0">
                <div className="flex relative  float-right">

                    <div className="relative text-sm">
                        <button id="userButton" className="flex items-center focus:outline-none mr-3">
                            <img className="w-8 h-8 rounded-full mr-4" src="http://i.pravatar.cc/300" alt="Avatar of User"/> <span className="hidden md:inline-block">Hi, User </span>
                            <svg className="pl-2 h-2" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" >
                                <g>
                                    <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" />
                                </g>
                            </svg>
                        </button>
                        {/* <div id="userMenu" className="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible">
                            <ul className="list-reset">
                                <li><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">My account</a></li>
                                <li><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">Notifications</a></li>
                                <li>
                                    <hr className="border-t mx-2 border-gray-400"/>
                                </li>
                                <li><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">Logout</a></li>
                            </ul>
                        </div> */}
                    </div>


                        
                    <div className="block lg:hidden pr-4">
                        <button onClick={handleToggle}  id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>

                

            </div>

                {/* Drop down for small screen start */}
            {isVisible &&  <div className="w-full flex-grow lg:hidden  lg:items-center lg:w-auto  mt-2 lg:mt-0 bg-white z-20" id="nav-content">
                <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
                    <li className="mr-6 my-2 md:my-0">
                        <Link onClick={() =>handleButtonClick('home')} to="/admin" className={`block py-1 md:py-3 pl-1 align-middle  border-b-2  hover:border-blue-600 ${isActive === 'home' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}  >
                            <i className="fas fa-home fa-fw mr-3 text-pink-600"></i><span className="pb-1 md:pb-0 text-sm">Home</span>
                        </Link>
                    </li>
                    <li className="mr-6 my-2 md:my-0">
                        <Link onClick={() =>handleButtonClick('Student')} to="students" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Student' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                            <i className="fas fa-tasks fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Student</span>
                        </Link>
                    </li>
                    <li className="mr-6 my-2 md:my-0">
                        <Link onClick={() =>handleButtonClick('Instructors')} to="instructors" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Instructors' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                            <i className="fa fa-envelope fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Instructors</span>
                        </Link>
                    </li>
                    <li  className="mr-6 my-2 md:my-0">
                        <Link onClick={() =>handleButtonClick('Courses')} to="courses" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Courses' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                            <i className="fas fa-chart-area fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Courses</span>
                        </Link>
                    </li>
                    <li className="mr-6 my-2 md:my-0">
                        <Link onClick={() =>handleButtonClick('Completed course')} to="completed" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Completed course' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                         <i className="fa fa-wallet fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Completed course</span>
                        </Link>
                    </li>
                    <li className="mr-6 my-2 md:my-0">
                        <Link onClick={() =>handleButtonClick('placeholder')} to="#" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'placeholder' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`} >                           
                        <i className="fa fa-wallet fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">placeholder</span>
                        </Link>
                    </li>
              
                </ul>

                <div className="relative pull-right pl-4 pr-4 md:pr-0">
                    <input type="search" placeholder="Search" className="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-gray-700 rounded py-1 px-2 pl-10 appearance-none leading-normal"/>
                    <div className="absolute search-icon" style={{top: '0.375rem', left: '1.75rem',}}>
                        <svg className="fill-current pointer-events-none text-gray-800 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                        </svg>
                    </div>
                </div>
                

            </div>
}
                {/* Drop down for small screen end */}

                {/* Drop down for small screen start 2 */}
               <div className="w-full flex-grow lg:flex  lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white z-20" id="nav-content">
                <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
                    <li className="mr-6 my-2 md:my-0">
                        <Link onClick={() =>handleButtonClick('home')} to="/admin" className={`block py-1 md:py-3 pl-1 align-middle  border-b-2  hover:border-blue-600 ${isActive === 'home' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}  >
                            <i className="fas fa-home fa-fw mr-3 text-pink-600"></i><span className="pb-1 md:pb-0 text-sm">Home</span>
                        </Link>
                    </li>
                    <li className="mr-6 my-2 md:my-0">
                        <Link onClick={() =>handleButtonClick('Student')} to="students" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Student' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                            <i className="fas fa-tasks fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Student</span>
                        </Link>
                    </li>
                    <li className="mr-6 my-2 md:my-0">
                        <Link onClick={() =>handleButtonClick('Instructors')} to="instructors" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Instructors' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                            <i className="fa fa-envelope fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Instructors</span>
                        </Link>
                    </li>
                    <li  className="mr-6 my-2 md:my-0">
                        <Link onClick={() =>handleButtonClick('Courses')} to="courses" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Courses' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                            <i className="fas fa-chart-area fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Courses</span>
                        </Link>
                    </li>
                    <li className="mr-6 my-2 md:my-0">
                        <Link onClick={() =>handleButtonClick('Completed course')} to="completed" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'Completed course' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`}>
                         <i className="fa fa-wallet fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Completed course</span>
                        </Link>
                    </li>
                    <li className="mr-6 my-2 md:my-0">
                        <Link onClick={() =>handleButtonClick('placeholder')} to="#" className={`block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600 ${isActive === 'placeholder' ? 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600 ' : ''}`} >                           
                        <i className="fa fa-wallet fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">placeholder</span>
                        </Link>
                    </li>
              
                </ul>

                {/* <div className="relative pull-right pl-4 pr-4 md:pr-0">
                    <input type="search" placeholder="Search" className="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-gray-700 rounded py-1 px-2 pl-10 appearance-none leading-normal"/>
                    <div className="absolute search-icon" style={{top: '0.375rem', left: '1.75rem',}}>
                        <svg className="fill-current pointer-events-none text-gray-800 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
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
          <img className="w-8 h-8 rounded-full mr-4" src="http://i.pravatar.cc/300" alt="Avatar of User" />
          <span className="hidden md:inline-block">Hi,h User</span>
          <span className="hidden md:inline-block">Hi,h User</span>
          <svg
            className="pl-2 h-8"
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
      </nav>

    </>
  )
}

export default NavBar