import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai';
import { GiBlackBook } from 'react-icons/gi';
import { PiStudentLight } from 'react-icons/pi';


const SideBar = ({ isSidebarOpen, handleSidebarToggle }) => {
  const [isActive, setIsActive] = useState('home');


  const handleButtonClick = (item) => {
    setIsActive(item);
    handleSidebarToggle();
  };
  const location = useLocation();

  useEffect(() => {
    if ((location.pathname).includes('instructors')) {
      setIsActive('instructors')
    } else if ((location.pathname).includes('student/s')) {
      setIsActive('student/s')
    } else if ((location.pathname).includes('courses')) {
      setIsActive('courses')
    } else {
      setIsActive('home')
    }
  })

  const linkStyles = {
    base: 'block py-1 md:py-3 pl-1 align-middle border-b-2 hover:border-blue-600',
    active: 'text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600',
  };

  return (
    <nav className="mt-20">
      {/* Hamburger button for small screens */}
      <button
        className={`md:hidden fixed z-10 text-white p-2 rounded-md ${isSidebarOpen ? 'transform rotate-90 z-50' : ''
          }`}
        onClick={handleSidebarToggle}
      >
        <svg class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>

      </button>

      <div
        className={`hidden fixed h-full bg-blue-400 w-64 text-white transform transition-transform duration-300 md:block`}
      >
        {/* ... Desktop */}
        <div className={`p-4`}>
          <div className="mt-12 text-center">
            <img
              className="w-40 h-40 mx-auto mb-4 rounded-full"
              src="http://i.pravatar.cc/300"
              alt="User Avatar"
            />
            <p className="font-semibold">User Name</p>
          </div>
          <div className="mt-12">
            <ul className="flex flex-col gap-5">
              <li className='text-blue-100 justify-self-center'>
                <Link
                  to="/student/dashboard"
                  onClick={() => handleButtonClick('home')}
                  className={`block py-2 pl-4 items-center ${isActive === 'home' ? 'bg-blue-600' : 'hover:bg-blue-700'
                    }`}
                >
                  <div className='flex items-center gap-2'>
                    <AiOutlineHome className="w-6 h-6" />
                    <p>Dashboard</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="student/studentData"
                  onClick={() => handleButtonClick('student')}
                  className={`block py-2 pl-4 items-center ${isActive === 'student/s' ? 'bg-blue-600' : 'hover:bg-blue-700'
                    }`}
                >
                  <div className='flex items-center gap-2'>
                    <PiStudentLight className="w-6 h-6" />
                    <p>Student</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="courses"
                  onClick={() => handleButtonClick('courses')}
                  className={`block py-2 pl-4 items-center ${isActive === 'courses' ? 'bg-blue-600' : 'hover:bg-blue-700'
                    }`}
                >
                  <div className='flex items-center gap-2'>
                    <GiBlackBook className="w-6 h-6" />
                    <p>Courses</p>
                  </div>
                </Link>
              </li>
              {/* Add more menu items as needed */}
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`fixed h-full bg-purple-400 w-64 text-white transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${isSidebarOpen ? 'block z-40' : 'hidden'} md:hidden`}
      >
        {/*  Mobile */}

        <div className={`p-4`}>
          <div className="mt-12 text-center">
            <img
              className="w-40 h-40 mx-auto mb-4 rounded-full"
              src="http://i.pravatar.cc/300"
              alt="User Avatar"
            />
            <p className="font-semibold">User Name</p>
          </div>
          <div className="mt-12">
            <ul className="flex flex-col gap-5">
              <li>
                <Link
                  to="/student/dashboard"
                  onClick={() => handleButtonClick('home')}
                  className={`block py-2 pl-4 items-center ${isActive === 'home' ? 'bg-blue-600' : 'hover:bg-blue-700'
                    }`}
                >
                  <div className='flex items-center gap-2'>
                    <AiOutlineHome className="w-6 h-6" />
                    <p>Dashboard</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="student/studentData"
                  onClick={() => handleButtonClick('student/s')}
                  className={`block py-2 pl-4 items-center ${isActive === 'student/s' ? 'bg-blue-600' : 'hover:bg-blue-700'
                    }`}
                >
                  <div className='flex items-center gap-2'>
                    <PiStudentLight className="w-6 h-6" />
                    <p>Student</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="courses"
                  onClick={() => handleButtonClick('courses')}
                  className={`block py-2 pl-4 items-center ${isActive === 'courses' ? 'bg-blue-600' : 'hover:bg-blue-700'
                    }`}
                >
                  <div className='flex items-center gap-2'>
                    <GiBlackBook className="w-6 h-6" />
                    <p>Courses</p>
                  </div>
                </Link>
              </li>
              {/* Add more menu items as needed */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};



export default SideBar;