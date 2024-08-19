import { useContext, useRef } from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
// import jwtDecode from "jwt-decode";
import cookies from "js-cookie";
import { VscClose } from "react-icons/vsc";
import { CiMenuBurger } from "react-icons/ci";
import LOGO from "../../images/logo.png";
import { AuthContext } from "../../App";
import { isTokenExpiredv1 } from "../../utils";
import SearchModal from './SearchModal';

const Navbarr = () => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation()
  // const [authenticatedUser, setAuthenticatedUser] = useState({
  //   authenticated: false,
  //   firstName: "",
  //   lastName: "",
  //   role: "",
  // });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef(null);

  const openSearchModal = () => {
    setIsSearchOpen(true);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const closeSearchModal = () => {
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === '/') {
        event.preventDefault();
        openSearchModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  useEffect(() => {
    const expired = isTokenExpiredv1(cookies.get('token'))
    if (expired && !location.pathname.includes('auth')) {
      console.log('token expired');
      navigate('/auth/signin');
    }

  }, [authenticatedUser.authenticated])


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const ref = useRef(true);

  console.log(authenticatedUser, 'navbar');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const logOutUser = () => {
    cookies.remove("token");
    setAuthenticatedUser((prev) => ({
      ...prev,
      authenticated: false,
      firstName: "",
      lastName: "",
      role: "",
    }));
    navigate("/courses");
  };

  return (
    <nav className="fixed top-0 z-50 w-screen py-4 text-gray-900 bg-white shadow-md px-7 md:px-0">
      <div className="container flex items-center justify-between mx-auto lg:justify-center lg:gap-56">
        <div className="flex items-center justify-center space-x-10">
          <Link to='/' className="flex items-center text-gray-900">
            <img src={LOGO} alt="logo" className="mr-2 w-14" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden font-semibold space-x-7 text-slate-600 md:flex">
            <Link
              to="/"
              className={`${mobileMenuOpen ? "fade-in" : ""
                } hover:text-slate-900 transition duration-300 ease-in-out`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${mobileMenuOpen ? "fade-in" : ""
                } hover:text-slate-900 transition duration-300 ease-in-out`}
            >
              About
            </Link>
            <Link
              to="/events"
              className={`${mobileMenuOpen ? "fade-in" : ""
                } hover:text-slate-900 transition duration-300 ease-in-out`}
            >
              Events
            </Link>
            <Link
              to="/courses"
              className={`${mobileMenuOpen ? "fade-in" : ""
                } hover:text-slate-900 transition duration-300 ease-in-out`}
            >
              Courses
            </Link>
            <Link
              to="/contact"
              className={`${mobileMenuOpen ? "fade-in" : ""
                } hover:text-slate-900 transition duration-300 ease-in-out`}
            >
              Contact Us
            </Link>

          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden">
          <button
            className="text-gray-900"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <CiMenuBurger className="w-6 h-6" />
            ) : (
              <div className="flex items-center">
              <button
                onClick={openSearchModal}
                className="text-white text-lg p-2 rounded-full"
              >
                🔍
              </button>
              {/* <span className="absolute right-0 mt-2 p-1 text-xs text-gray-400 bg-gray-900 rounded-lg opacity-75">
                Press Ctrl + / to search
              </span> */}
              <CiMenuBurger className="w-6 h-6" />
            </div>
            )}
          </button>
          <div
            className={`fixed top-0 left-0 w-full h-screen bg-blue-600 text-white z-50 flex flex-col px-10 text-xl justify-start transform ${mobileMenuOpen ? "" : "-translate-y-full"
              } transition-transform duration-500 ease-in-out`}
          >
            <button
              className="absolute text-white top-5 right-5"
              onClick={toggleMobileMenu}
              aria-label="Close mobile menu"
            >
              <VscClose className="w-6 h-6" />
            </button>
            <div className="flex flex-col justify-start h-full">
              <div className="mt-20 space-y-8">
                <div className="space-y-4 text-2xl font-semibold">
                  <Link
                    to="/"
                    className={`${mobileMenuOpen ? "fade-in" : ""
                      } block hover:text-gray-200 transition duration-300 ease-in-out`}
                    onClick={toggleMobileMenu}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className={`${mobileMenuOpen ? "fade-in" : ""
                      } block hover:text-gray-200 transition duration-300 ease-in-out`}
                    onClick={toggleMobileMenu}

                  >
                    About
                  </Link>
                  <Link
                    to="/events"
                    className={`${mobileMenuOpen ? "fade-in" : ""
                      } block hover:text-gray-200 transition duration-300 ease-in-out`}
                    onClick={toggleMobileMenu}
                  >
                    Events
                  </Link>
                  <Link
                    to="/courses"
                    className={`${mobileMenuOpen ? "fade-in" : ""
                      } block hover:text-gray-200 transition duration-300 ease-in-out`}
                    onClick={toggleMobileMenu}
                  >
                    Courses
                  </Link>
                  <Link
                    to="/contact"
                    className={`${mobileMenuOpen ? "fade-in" : ""
                      } block hover:text-gray-200 transition duration-300 ease-in-out`}
                    onClick={toggleMobileMenu}
                  >
                    Contact Us
                  </Link>
                </div>
                <div className="flex flex-col space-y-3">
                  {authenticatedUser.role === "admin" && (
                    <div className="flex flex-col space-y-3">
                      <Link
                        to="/admin/dashboard/instructors"
                        className="text-white"
                        onClick={toggleMobileMenu}
                      >
                        Instructors
                      </Link>
                      <Link
                        to="/admin/dashboard/students"
                        className="text-white"
                        onClick={toggleMobileMenu}
                      >
                        Students
                      </Link>
                    </div>
                  )}
                  {authenticatedUser.role === "instructor" && (
                    <Link
                      to={`/instructor/dashboard/assigned-courses`}
                      className="text-white"
                      onClick={toggleMobileMenu}
                    >
                      Assigned Courses
                    </Link>
                  )}
                  {authenticatedUser.role === "student" && (
                    <Link
                      to="/student/dashboard/enrolled-courses"
                      className="text-white"
                      onClick={toggleMobileMenu}
                    >
                      My Courses
                    </Link>
                  )}
                  {authenticatedUser.authenticated ? (
                    <div className="flex flex-col space-y-3">
                      <Link
                        className={`${mobileMenuOpen ? "fade-in" : ""
                          } text-white`}
                        onClick={logOutUser}
                      >
                        Logout
                      </Link>
                    </div>
                  ) : (
                    <>
                      <Link
                        to="/auth/signin"
                        className={`${mobileMenuOpen ? "fade-in" : ""
                          } text-white`}
                        onClick={toggleMobileMenu}
                      >
                        Login
                      </Link>
                      <Link
                        to="/auth/signup"
                        className={`${mobileMenuOpen ? "fade-in" : ""
                          } text-white`}
                        onClick={toggleMobileMenu}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop nav authenticated*/}
        <div className="items-center justify-end hidden md:flex">
          {authenticatedUser.authenticated && (
            <div>
              <button
                onClick={openSearchModal}
                className="text-white text-lg p-2 rounded-full"
              >
                🔍
              </button>
              {/* <span className="absolute right-0 mt-2 p-1 text-xs text-gray-400 bg-gray-900 rounded-lg opacity-75">
                Press Ctrl + / to search
              </span> */}
            </div>
          )}
          {authenticatedUser.role === "admin" && (
            <div className="flex items-center space-x-5">
              <Link
                to={`/admin/dashboard/instructors`}
                className="font-semibold text-blue-600 transition duration-300 ease-in-out hover:text-blue-700"
              >
                Instructors
              </Link>
              <Link
                to={`/admin/dashboard/students`}
                className="font-semibold text-blue-600 transition duration-300 ease-in-out hover:text-blue-700"
              >
                Students
              </Link>
            </div>
          )}
          {authenticatedUser.role === "instructor" && (
            <Link
              to={`/instructor/dashboard/assigned-courses`}
              className="font-semibold text-blue-600 transition duration-300 ease-in-out hover:text-blue-700"
            >
              Assigned Courses
            </Link>
          )}
          {authenticatedUser.role === "student" && (
            <Link
              to={`/student/dashboard/enrolled-courses`}
              className="font-semibold text-blue-600 transition duration-300 ease-in-out hover:text-blue-700"
            >
              My Courses
            </Link>
          )}
          {/* {(authenticatedUser.authenticated && (location.pathname == '/' || location.pathname == '/about')) && (
            <a href="#" className="mr-10 font-bold underline text-slate-900">
              Back to dashboard
            </a>
          )} */}
          {authenticatedUser.authenticated ? (
            <div className="flex items-center cursor-pointer">
              <Link
                className="py-3 ml-4 font-bold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg px-7 hover:shadow-lg hover:shadow-blue-600"
                onClick={logOutUser}
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-10">
              <Link
                to="/auth/signin"
                className="font-semibold text-blue-600 transition duration-300 ease-in-out hover:text-blue-700"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="py-3 font-bold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg px-7 hover:shadow-lg hover:shadow-blue-600"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>


      <SearchModal isOpen={isSearchOpen} onClose={closeSearchModal} inputRef={inputRef} />
    </nav>
  );
};

export default Navbarr;
