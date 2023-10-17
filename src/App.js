import { createContext, useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Courses from './pages/courses';
// import { loadCourses } from './pages/courses';
import Navbarr from './component/header/navbar';
import SignUp from './pages/auth/signUp';
import SignIn from './pages/auth/signIn';
import TwoFA from './pages/auth/twoFA';
import Landing from './pages/landing';
import Footer from './component/footer';
import "./App.css";
import Contact from './pages/contact';
import AboutPage from './pages/about';
import Events from './pages/events';
import StudentDashboard from './pages/dashboard/Student/student';
import AdminDashboard from './pages/dashboard/Admin/admin';
import StudentDetail from './pages/detail/student';
import CourseDetail from './pages/detail/course';
import { Test } from './forms/test';
import ListCourses from './pages/dashboard/Admin/course/ListCourses';
import InstructorsList from './pages/dashboard/Admin/instructor/InstructorsList';
import CourseDetails from './pages/dashboard/Admin/course/courseDetails';
import InstructorsProfile from './pages/dashboard/Admin/instructor/InstructorsProfile';
import Students from './pages/dashboard/Admin/student/students';
import AdminStudentProfile from './pages/dashboard/Admin/student/StudentProfile';
import InstructorDashboard from './pages/dashboard/Instructor/instructor';
import InstructorStudentProfile from './pages/dashboard/Instructor/student/studentProfile'
import AssignedCourses from './pages/dashboard/Instructor/course/assignedCourses';
import AssignedCourseDetail from './pages/dashboard/Instructor/course/courseDetail';
import SideBar from './component/SideBar';
// import Home from './components/home';


export const AuthContext = createContext();

// export const BASEURL = 'http://localhost:5001/api';
export const BASEURL = 'https://trd-server.onrender.com/api'

function App() {

  const [authenticatedUser, setAuthenticatedUser] = useState({
    authenticated: false,
    firstName: '',
    lastName: '',
    courses: [],
    role: '',
    token: ''
  })

  const handleAuth = () => {
    const token = cookies.get('token')
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded)
      setAuthenticatedUser(prev => ({
        authenticated: true,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        // courses: decoded.courses
        role: decoded.role,
        token
      }))
    }
  }

  // const [alert, setAlert] = useState({
  //   show: false,
  //   msg: '',
  //   type: ''
  // }) 

  // const handleAlert = (show, msg, type) => {
  //   setAlert({
  //       show,
  //       msg,
  //       type
  //   })
  // }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route >
        <Route path='/' element={<Root />}>
          <Route path='/' element={<Landing />} />
          <Route path='/test' element={<Test />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/events' element={<Events />} />
          <Route path='/courses' element={<Courses />} 
          // loader={loadCourses} 
          />
          {/* <Route path='/course/:id' element={<CourseDetails />} /> */}
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          {/* <Route path='/otpForm' element={<OtpForm />} /> */}
          <Route path='/verify' element={<TwoFA />} />

          {/* // ADMIN  */}
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/dashboard/courses' element={<ListCourses />} />
            <Route path="/admin/dashboard/courses/:id" element={<CourseDetails />} />
            <Route path='/admin/dashboard/instructors' element={<InstructorsList />} />
            <Route path='/admin/dashboard/instructors/:id' element={<InstructorsProfile/>} />
            <Route path='/admin/dashboard/students' element={<Students />} />
            <Route path='/admin/dashboard/students/:id' element={<AdminStudentProfile/>} />

          {/* INSTRUCTOR */}
            <Route path='/instructor/dashboard' element={<InstructorDashboard />} />
            <Route path='/instructor/dashboard/assigned-courses' element={<AssignedCourses />} />
            <Route path='/instructor/dashboard/assigned-course/:id' element={<AssignedCourseDetail />} />
            <Route path='/instructor/dashboard/assigned-course/:id/student/:id' element={<InstructorStudentProfile />} />

          {/* <Route element={<StudentRoutes />}> */}
            <Route path='/student/dashboard' element={<StudentDashboard />} />
            <Route path='/student/:id' element={<StudentDetail />} />
            <Route path='/course/:id' element={<CourseDetail />} />
            {/* <Route path='/student/dashboard' element={<StudentDashboard />} loader={loadMyCourses} /> */}
          {/* </Route> */}
          <Route>
            {/* <Route path='/dashboard/admin' element={<AdminDashboard />} /> */}
            {/* <Route path='/instructor/dashboard' element={<InstructorDashboard />} />
            <Route path='/instructor/course/:id' element={<ViewAssignedCourseStudent />} /> */}
          </Route>
        </Route>
      </Route>
    )
  )

  return (
    <AuthContext.Provider value={{ authenticatedUser, handleAuth }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

const Root = () => {
  return (
    <div className=''>
      <Navbarr />
      <div className='container h-screen mx-auto'>
        <SideBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App;