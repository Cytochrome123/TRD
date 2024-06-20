import { useState, useEffect, useContext } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { GiBlackBook } from 'react-icons/gi';
import { PiStudentLight } from 'react-icons/pi';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../App';

const SideBar = ({ isSidebarOpen, handleSidebarToggle }) => {
  const { authenticatedUser } = useContext(AuthContext);
  const [isActive, setIsActive] = useState('home');

  const location = useLocation();

  // if((location.pathname).includes(item)) {
  //   setIsActive(item);
  // };

  useEffect(() => {
    if ((location.pathname).includes('instructors')) {
      setIsActive('instructors')
    } else if ((location.pathname).includes('students')) {
      setIsActive('students')
    } else if ((location.pathname).includes('courses')) {
      setIsActive('courses')
    } else if ((location.pathname).includes('quiz')) {
      setIsActive('quiz')
    } else {
      setIsActive('home')
    }
  }, [isActive])

  const handleButtonClick = (item) => {
    setIsActive(item);
    handleSidebarToggle();
  };

  return (
    <nav className="relative mt-20">
      {/* Hamburger button for small screens */}
      <button
        className={`md:hidden fixed z-10 text-white p-2 rounded-md ${isSidebarOpen ? 'transform rotate-90 z-50' : ''
          }`}
        onClick={handleSidebarToggle}
      >
        {/* <svg class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg> */}
        <svg class="h-8 w-8 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />  <line x1="20" y1="6" x2="9" y2="6" />  <line x1="20" y1="12" x2="13" y2="12" />  <line x1="20" y1="18" x2="9" y2="18" />  <path d="M4 8l4 4l-4 4" />
        </svg>
      </button>

      <div
        className={`hidden fixed h-full bg-blue-400 w-64 text-white transform transition-transform duration-300 md:block`}
      >
        {/* ... Desktop) */}

        <div className={`p-4`}>
          <div className="mt-12 text-center">
            <img
              className="w-40 h-40 mx-auto mb-4 rounded-full"
              src="http://i.pravatar.cc/300"
              alt="User Avatar"
            />
            <p className="font-semibold">{authenticatedUser.firstName} {authenticatedUser.lastName}</p>
          </div>
          <div className="mt-12">
            <ul className="flex flex-col gap-5">
              <li>
                <Link
                  to="/admin/dashboard"
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
                  to="students"
                  onClick={() => handleButtonClick('students')}
                  className={`block py-2 pl-4 items-center ${isActive === 'students' ? 'bg-blue-600' : 'hover:bg-blue-700'
                    }`}
                >
                  <div className='flex items-center gap-2'>
                    <PiStudentLight className="w-6 h-6" />
                    <p>Students</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="instructors"
                  onClick={() => handleButtonClick('instructors')}
                  className={`block py-2 pl-4 items-center ${isActive === 'instructors' ? 'bg-blue-600' : 'hover:bg-blue-700'
                    }`}
                >
                  <div className='flex items-center gap-2'>
                    <LiaChalkboardTeacherSolid className="w-6 h-6" />
                    <p> Instructors</p>
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
              <li>
                <Link
                  to="quiz"
                  onClick={() => handleButtonClick('quiz')}
                  className={`block py-2 pl-4 items-center ${isActive === 'quiz' ? 'bg-blue-600' : 'hover:bg-blue-700'
                    }`}
                >
                  <div className='flex items-center gap-2'>
                    <GiBlackBook className="w-6 h-6" />
                    <p>Quiz</p>
                  </div>
                </Link>
              </li>
              {/* Add more menu items as needed */}
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`fixed h-full bg-blue-400 w-64 text-white transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${isSidebarOpen ? 'block z-40' : 'hidden'} md:hidden`}
      >
        {/* ... Mobile */}

        <div className={`p-4`}>
          <div className="mt-12 text-center">
            <img
              className="w-40 h-40 mx-auto mb-4 rounded-full"
              src="http://i.pravatar.cc/300"
              alt="User Avatar"
            />
            <p className="font-semibold">{authenticatedUser.firstName} {authenticatedUser.lastName}</p>
          </div>
          <div className="mt-12">
            <ul className="flex flex-col gap-5">
              <li>
                <Link
                  to="/admin/dashboard"
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
                  to="students"
                  onClick={() => handleButtonClick('students')}
                  className={`block py-2 pl-4 items-center ${isActive === 'students' ? 'bg-blue-600' : 'hover:bg-blue-700'
                    }`}
                >
                  <div className='flex items-center gap-2'>
                    <PiStudentLight className="w-6 h-6" />
                    <p>Students</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="instructors"
                  onClick={() => handleButtonClick('instructors')}
                  className={`block py-2 pl-4 items-center ${isActive === 'instructors' ? 'bg-blue-600' : 'hover:bg-blue-700'
                    }`}
                >
                  <div className='flex items-center gap-2'>
                    <LiaChalkboardTeacherSolid className="w-6 h-6" />
                    <p> Instructors</p>
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
              <li>
                <Link
                  to="quiz"
                  onClick={() => handleButtonClick('quiz')}
                  className={`block py-2 pl-4 items-center ${isActive === 'quiz' ? 'bg-blue-600' : 'hover:bg-blue-700'
                    }`}
                >
                  <div className='flex items-center gap-2'>
                    <GiBlackBook className="w-6 h-6" />
                    <p>Quiz</p>
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