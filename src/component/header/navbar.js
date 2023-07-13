import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import cookies from "js-cookie";
import { VscClose } from "react-icons/vsc";
import { CiMenuBurger } from "react-icons/ci";
import LOGO from "../../image/logo.png";

const Navbarr = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState({
    authenticated: false,
    firstName: "",
    lastName: "",
    role: "",
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ref = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (ref.current) {
      const token = cookies.get("token");
      console.log(token);
      let decoded;
      if (token) {
        decoded = jwtDecode(token);
        console.log(decoded);

        setAuthenticatedUser((prev) => ({
          ...prev,
          authenticated: true,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          role: decoded.userType,
        }));
      }
    }

    return () => (ref.current = false);
  }, [authenticatedUser.authenticated]);

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
    <nav className="bg-white text-gray-900 py-4 shadow-md px-7 md:px-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <a href="/" className="text-gray-900 flex items-center">
            <img src={LOGO} alt="logo" className="w-14 mr-2" />
          </a>
          
          {/* Desktop nav */}
          <div className="space-x-7 font-semibold text-slate-600 hidden md:flex">
            <a
              href="#"
              className={`${
                mobileMenuOpen ? "fade-in" : ""
              } hover:text-slate-900 transition duration-300 ease-in-out`}
            >
              Home
            </a>
            <a
              href="#"
              className={`${
                mobileMenuOpen ? "fade-in" : ""
              } hover:text-slate-900 transition duration-300 ease-in-out`}
            >
              About
            </a>
            <a
              href="#"
              className={`${
                mobileMenuOpen ? "fade-in" : ""
              } hover:text-slate-900 transition duration-300 ease-in-out`}
            >
              Events
            </a>
            <a
              href="#"
              className={`${
                mobileMenuOpen ? "fade-in" : ""
              } hover:text-slate-900 transition duration-300 ease-in-out`}
            >
              Courses
            </a>
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
              // could be replaced with ""
              <CiMenuBurger className="h-6 w-6" />
            ) : (
              <CiMenuBurger className="h-6 w-6" />
            )}
          </button>
          <div
            className={`fixed top-0 left-0 w-full h-screen bg-blue-600 text-white z-50 flex flex-col px-10 text-xl justify-start transform ${
              mobileMenuOpen ? "" : "-translate-y-full"
            } transition-transform duration-500 ease-in-out`}
          >
            <button
              className="absolute top-5 right-5 text-white"
              onClick={toggleMobileMenu}
              aria-label="Close mobile menu"
            >
              <VscClose className="h-6 w-6" />
            </button>
            <div className="h-full flex flex-col justify-start">
              <div className="mt-20 space-y-8">
                <div className="space-y-4 text-2xl font-semibold">
                  <a
                    href="#"
                    className={`${
                      mobileMenuOpen ? "fade-in" : ""
                    } block hover:text-gray-200 transition duration-300 ease-in-out`}
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className={`${
                      mobileMenuOpen ? "fade-in" : ""
                    } block hover:text-gray-200 transition duration-300 ease-in-out`}
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className={`${
                      mobileMenuOpen ? "fade-in" : ""
                    } block hover:text-gray-200 transition duration-300 ease-in-out`}
                  >
                    Events
                  </a>
                  <a
                    href="#"
                    className={`${
                      mobileMenuOpen ? "fade-in" : ""
                    } block hover:text-gray-200 transition duration-300 ease-in-out`}
                  >
                    Courses
                  </a>
                </div>
                <div className="flex items-center space-x-10">
                  <a
                    href="/signin"
                    className={`${
                      mobileMenuOpen ? "fade-in" : ""
                    } text-blue-200 font-semibold hover:text-gray-200 transition duration-300 ease-in-out`}
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className={`${
                      mobileMenuOpen ? "fade-in" : ""
                    } bg-white font-semibold text-blue-600 px-7 py-3 rounded-lg ml-4`}
                  >
                    Sign Up
                  </a>
                </div>
              </div>
              <div className="mt-auto">
                {authenticatedUser.authenticated ? (
                  <>
                    <button className="text-white" onClick={logOutUser}>
                      Logout
                    </button>
                    <a href="/courses" className="text-white ml-4">
                      Courses
                    </a>
                  </>
                ) : (
                  <div className="items-center space-x-10 hidden md:flex">
                    <a
                      href="/signin"
                      className={`${
                        mobileMenuOpen ? "fade-in" : ""
                      } text-white font-semibold hover:text-gray-200 transition duration-300 ease-in-out`}
                    >
                      Login
                    </a>
                    <a
                      href="/signup"
                      className={`${
                        mobileMenuOpen ? "fade-in" : ""
                      } text-white font-bold bg-blue-600 px-7 py-3 rounded-lg ml-4 hover:shadow-lg hover:shadow-blue-600 transition duration-300 ease-in-out`}
                    >
                      Sign Up
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop nav authenticated*/}
        {/* TODO: authenticated user mobile navbar */}
        <div className="hidden md:flex items-center justify-end">
          {authenticatedUser.authenticated ? (
            <>
              <button className="text-gray-900" onClick={logOutUser}>
                Logout
              </button>
              <a href="/courses" className="text-gray-900 ml-4">
                Courses
              </a>
            </>
          ) : (
            <div className="flex items-center space-x-10">
              <a
                href="/signin"
                className="text-blue-600 font-semibold hover:text-blue-700 transition duration-300 ease-in-out"
              >
                Login
              </a>
              <a
                href="/signup"
                className="text-white font-bold bg-blue-600 px-7 py-3 rounded-lg ml-4 hover:shadow-lg hover:shadow-blue-600 transition duration-300 ease-in-out"
              >
                Sign Up
              </a>
            </div>
          )}

          {authenticatedUser.role === "admin" ? (
            <>
              <a href="/instructors" className="text-gray-900 ml-4">
                Instructors
              </a>
              <a href="/students" className="text-gray-900 ml-4">
                Students
              </a>
            </>
          ) : authenticatedUser.role === "instructor" ? (
            <>
              <a href="#" className="text-gray-900 ml-4">
                Assigned Courses
              </a>
            </>
          ) : authenticatedUser.role === "student" ? (
            <>
              <a href="#" className="text-gray-900 ml-4">
                My Courses
              </a>
            </>
          ) : (
            authenticatedUser.role
          )}

          <a href="#" className="text-gray-900 ml-4">
            {authenticatedUser.firstName}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbarr;
