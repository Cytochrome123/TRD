import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import cookies from "js-cookie";
import { VscClose } from "react-icons/vsc";
import { CiMenuBurger } from "react-icons/ci";
import LOGO from "../../images/logo.png";
import { AuthContext } from "../../App";

const Navbarr = () => {
  const { authenticatedUser, setAuthenticatedUser, handleAuth } = useContext(AuthContext);
  // const [authenticatedUser, setAuthenticatedUser] = useState({
  //   authenticated: false,
  //   firstName: "",
  //   lastName: "",
  //   role: "",
  // });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ref = useRef(true);
  const navigate = useNavigate();
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
    <nav className="sticky top-0 z-50 py-4 text-gray-900 bg-white shadow-md px-7 md:px-0">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center space-x-10">
          <Link to='/' className="flex items-center text-gray-900">
            <img src={LOGO} alt="logo" className="mr-2 w-14" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden font-semibold space-x-7 text-slate-600 md:flex">
            <Link
              to="/"
              className={`${
                mobileMenuOpen ? "fade-in" : ""
              } hover:text-slate-900 transition duration-300 ease-in-out`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                mobileMenuOpen ? "fade-in" : ""
              } hover:text-slate-900 transition duration-300 ease-in-out`}
            >
              About
            </Link>
            <Link
              to="/events"
              className={`${
                mobileMenuOpen ? "fade-in" : ""
              } hover:text-slate-900 transition duration-300 ease-in-out`}
            >
              Events
            </Link>
            <Link
              to="/courses"
              className={`${
                mobileMenuOpen ? "fade-in" : ""
              } hover:text-slate-900 transition duration-300 ease-in-out`}
            >
              Courses
            </Link>
            <Link
              to="/contact"
              className={`${
                mobileMenuOpen ? "fade-in" : ""
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
              <CiMenuBurger className="w-6 h-6" />
            )}
          </button>
          <div
            className={`fixed top-0 left-0 w-full h-screen bg-blue-600 text-white z-50 flex flex-col px-10 text-xl justify-start transform ${
              mobileMenuOpen ? "" : "-translate-y-full"
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
                  <a
                    href="/"
                    className={`${
                      mobileMenuOpen ? "fade-in" : ""
                    } block hover:text-gray-200 transition duration-300 ease-in-out`}
                  >
                    Home
                  </a>
                  <a
                    href="/about"
                    className={`${
                      mobileMenuOpen ? "fade-in" : ""
                    } block hover:text-gray-200 transition duration-300 ease-in-out`}
                  >
                    About
                  </a>
                  <a
                    href="/events"
                    className={`${
                      mobileMenuOpen ? "fade-in" : ""
                    } block hover:text-gray-200 transition duration-300 ease-in-out`}
                  >
                    Events
                  </a>
                  <a
                    href="/courses"
                    className={`${
                      mobileMenuOpen ? "fade-in" : ""
                    } block hover:text-gray-200 transition duration-300 ease-in-out`}
                  >
                    Courses
                  </a>
                  <a
                    href="/contact"
                    className={`${
                      mobileMenuOpen ? "fade-in" : ""
                    } block hover:text-gray-200 transition duration-300 ease-in-out`}
                  >
                    Contact Us
                  </a>
                </div>
                <div className="flex flex-col space-y-3">
                  {authenticatedUser.role && (
                    <a href="#" className="font-bold text-white underline">
                      Hello {authenticatedUser.firstName}
                    </a>
                  )}
                  {authenticatedUser.role === "admin" && (
                    <div className="flex flex-col space-y-3">
                      <a
                        href="/instructors"
                        className="text-white"
                      >
                        Instructors
                      </a>
                      <a
                        href="/students"
                        className="text-white"
                      >
                        Students
                      </a>
                    </div>
                  )}
                  {authenticatedUser.role === "instructor" && (
                    <a
                      href="#"
                      className="text-white"
                    >
                      Assigned Courses
                    </a>
                  )}
                  {authenticatedUser.role === "student" && (
                    <a
                      href="/student/dashboard/enrolled-courses"
                      className="text-white"
                    >
                      My Coursesxz
                    </a>
                  )}
                  {authenticatedUser.authenticated ? (
                    <div className="flex flex-col space-y-3">
                      <a
                        className={`${
                          mobileMenuOpen ? "fade-in" : ""
                        } text-white`}
                        onClick={logOutUser}
                      >
                        Logout
                      </a>
                    </div>
                  ) : (
                    <>
                      <a
                        href="/signin"
                        className={`${
                          mobileMenuOpen ? "fade-in" : ""
                        } text-white`}
                      >
                        Login
                      </a>
                      <a
                        href="/signup"
                        className={`${
                          mobileMenuOpen ? "fade-in" : ""
                        } text-white`}
                      >
                        Sign Up
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop nav authenticated*/}
        <div className="items-center justify-end hidden md:flex">
          {authenticatedUser.role && (
            <a href="#" className="mr-10 font-bold underline text-slate-900">
              Hello {authenticatedUser.firstName}
            </a>
          )}
          {authenticatedUser.role === "admin" && (
            <div className="flex items-center space-x-5">
              <a
                href="/instructors"
                className="font-semibold text-blue-600 transition duration-300 ease-in-out hover:text-blue-700"
              >
                Instructors
              </a>
              <a
                href="/students"
                className="font-semibold text-blue-600 transition duration-300 ease-in-out hover:text-blue-700"
              >
                Students
              </a>
            </div>
          )}
          {authenticatedUser.role === "instructor" && (
            <a
              href="#"
              className="font-semibold text-blue-600 transition duration-300 ease-in-out hover:text-blue-700"
            >
              Assigned Courses
            </a>
          )}
          {authenticatedUser.role === "student" && (
            <a
              href="#"
              className="font-semibold text-blue-600 transition duration-300 ease-in-out hover:text-blue-700"
            >
              My Courses
            </a>
          )}
          {authenticatedUser.authenticated ? (
            <div className="flex items-center cursor-pointer">
              <a
                className="py-3 ml-4 font-bold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg px-7 hover:shadow-lg hover:shadow-blue-600"
                onClick={logOutUser}
              >
                Logout
              </a>
            </div>
          ) : (
            <div className="flex items-center space-x-10">
              <a
                href="/signin"
                className="font-semibold text-blue-600 transition duration-300 ease-in-out hover:text-blue-700"
              >
                Login
              </a>
              <a
                href="/signup"
                className="py-3 font-bold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg px-7 hover:shadow-lg hover:shadow-blue-600"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbarr;
