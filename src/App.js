import { createContext, useState, useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import Swal from  'sweetalert2';

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
// import Home from './components/home';
import EnrolledCourses from './pages/dashboard/Student/course/EnrolledCourses';
import IndividualCourse from './pages/dashboard/Student/course/IndividualCourse';
import StudentData from './pages/dashboard/Student/profile/studentData';
import StudentSideBar from './component/header/student/SideBar';
import MainS from './pages/dashboard/Student/main';
import MainI from './pages/dashboard/Instructor/main';
import Main from './pages/dashboard/Admin/main';
import RequireAuth from './component/RequireAuth';
import Unauthorized from './pages/unauthorized';
import PageNotFound from './pages/pagenotfound';
// import Remita from './service/remita';
// import Side from './side';

export const AuthContext = createContext();
export const AlertContext = createContext();

// export const BASEURL = 'http://localhost:5001/api';
export const BASEURL = 'https://trd-server.onrender.com/api'

function App() {

  const token = cookies.get('token');
  let decoded;
  if (token) decoded = jwtDecode(token);
  console.log(decoded)


  const [authenticatedUser, setAuthenticatedUser] = useState({
    authenticated: decoded ? true : false,
    firstName: decoded ? decoded.firstName : '',
    lastName: decoded ? decoded.lastName : '',
    courses: decoded ? decoded.courses : [],
    role: decoded ? decoded.userType : '',
    token: decoded ? decoded.token : ''
  })

  console.log(authenticatedUser, 'auth');

  const handleAuth = (token) => {
    if (token) {
      decoded = jwtDecode(token);
      setAuthenticatedUser(prev => ({
        ...prev,
        authenticated: true,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        // courses: decoded.courses
        role: decoded.userType,
        token
      }))
    } else {
      console.log('Not logged in');
    }
  }

  const notify = (type, msg) => toast[type](`🦄 ${msg}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const call2Action = (type, msg, res) => Swal.fire({
    icon: type,
    title: "Confirmation",
    text: msg,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: res,
        icon: "success"
      });
    }
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route >
        <Route path='/' element={<Root />}>
          <Route path='/' element={<Landing />} />
          {/* <Route path='/side' element={<Side />} /> */}
          <Route path='/test' element={<Test />} />
          {/* <Route path='/payyyy' element={<Remita />} /> */}
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
          {/* <Route path='/admin/dashboard' element={<Main />} >
              <Route path='' element={<AdminDashboard />} />
              <Route path='courses' element={<ListCourses />} />
              <Route path="courses/:id" element={<CourseDetails />} />
              <Route path='instructors' element={<InstructorsList />} />
              <Route path='instructors/:id' element={<InstructorsProfile/>} />
              <Route path='students' element={<Students />} />
              <Route path='students/:id' element={<AdminStudentProfile/>} />
            </Route> */}

          {/* INSTRUCTOR */}
          {/* <Route path='/instructor/dashboard/*' element={<MainI />} >
              <Route path='' element={<InstructorDashboard />} />
              <Route path='assigned-courses' element={<AssignedCourses />} />
              <Route path='assigned-course/:id' element={<AssignedCourseDetail />} />
              <Route path='assigned-course/:id/student/:id' element={<InstructorStudentProfile />} />
            </Route> */}

          {/* <Route element={<StudentRoutes />}> */}
          {/* <Route path='/student/dashboard/*' element= {<MainS/>}>
              <Route path='' element={<StudentDashboard/>} />
              <Route path='enrolled-courses' element={<EnrolledCourses/>} />
              <Route path='enrolled-courses/:id' element={<IndividualCourse/>} />
              <Route path='student/studentData' element={<StudentData />} />
              <Route path='student/:id' element={<StudentDetail />} />
              <Route path='course/:id' element={<CourseDetail />} />
            </Route> */}
          {/* <Route path='' element={<StudentDashboard />} loader={loadMyCourses} /> */}



          {/* <Route element={<RequireAuth allowedRoles={[ 'admin']} />}> */}
          <Route path='/admin/dashboard' element={<Main />} >
            <Route path='' element={<AdminDashboard />} />
            <Route path='courses' element={<ListCourses />} />
            <Route path="courses/:id" element={<CourseDetails />} />
            <Route path='instructors' element={<InstructorsList />} />
            <Route path='instructors/:id' element={<InstructorsProfile />} />
            <Route path='students' element={<Students />} />
            <Route path='students/:id' element={<AdminStudentProfile />} />
          </Route>
          {/* </Route> */}

          {/* INSTRUCTOR */}
          {/* <Route element={<RequireAuth allowedRoles={[ 'instructor']} />}> */}
          <Route path='/instructor/dashboard/*' element={<MainI />} >
            <Route path='' element={<InstructorDashboard />} />
            <Route path='assigned-courses' element={<AssignedCourses />} />
            <Route path='assigned-course/:id' element={<AssignedCourseDetail />} />
            <Route path='assigned-course/:id/student/:id' element={<InstructorStudentProfile />} />
          </Route>
          {/* </Route> */}

          {/* <Route element={<StudentRoutes />}> */}
          {/* <Route element={<RequireAuth allowedRoles={[ 'student']} />}> */}
          <Route path='/student/dashboard/*' element={<MainS />}>
            <Route path='' element={<StudentDashboard />} />
            <Route path='enrolled-courses' element={<EnrolledCourses />} />
            <Route path='enrolled-courses/:id' element={<IndividualCourse />} />
            <Route path='student/studentData' element={<StudentData />} />
            <Route path='student/:id' element={<StudentDetail />} />
            <Route path='course/:id' element={<CourseDetail />} />
          </Route>
          {/* </Route> */}

          {/* <Route path='/student/studentData' element={<StudentData />} />
            <Route path='/student/:id' element={<StudentDetail />} />
            <Route path='/course/:id' element={<CourseDetail />} /> */}


          {/* <Route path='/student/dashboard' element={<StudentDashboard />} loader={loadMyCourses} /> */}
          {/* </Route> */}
          <Route>
            {/* <Route path='/dashboard/admin' element={<AdminDashboard />} /> */}
            {/* <Route path='/instructor/dashboard' element={<InstructorDashboard />} />
            <Route path='/instructor/course/:id' element={<ViewAssignedCourseStudent />} /> */}
          </Route>
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Route>
    )
  )

  return (
    <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser, handleAuth }}>
      <AlertContext.Provider value={{notify, call2Action}}>
        <RouterProvider router={router} />
      </AlertContext.Provider>
    </AuthContext.Provider>
  );
}

const Root = () => {
  return (
    <div className=''>
      <Navbarr />
      <div className=''>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App;