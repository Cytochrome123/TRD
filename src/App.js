// import { createContext, useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom';

import './App.css';
import Courses, { loadCourses } from './pages/courses';
import CourseDetails from './pages/courseDetails';
import StudentDashboard, { loadMyCourses } from './pages/student/dashboard';
import StudentRoutes from './component/StudentRoutes';
import Navbarr from './component/header/navbar';
import SignUp from './pages/auth/signUp';
import SignIn from './pages/auth/signIn';
import TwoFA from './pages/auth/twoFA';
import InstructorDashboard from './pages/instructor/dashboard';
import ViewAssignedCourseStudent from './pages/instructor/viewAssignedCourseStudent';
// import Home from './components/home';



export const hard = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTgzYmU5ODk2Yzc4YzI3OWM4ZDlmYSIsImVtYWlsIjoiaG9pc21haWwxNDMwQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiYWRtaW4iLCJjb3Vyc2VzIjpbeyJjb3Vyc2VJRCI6IjY0OTk3NDY2NThiYmMwMGJhYWE1NzJjMyIsIl9pZCI6IjY0OTk3ZjZhMGNmOGMzM2M3NzNjMjI1YyJ9LHsiY291cnNlSUQiOiI2NDlkMjcyMWUxNmMwNWQ3YmVlMWNlOTgiLCJfaWQiOiI2NDlkM2IzNzNlMWQwZWVhYjgwMzY3NDMifSx7ImNvdXJzZUlEIjoiNjQ5ZDI3MjFlMTZjMDVkN2JlZTFjZTk4IiwiX2lkIjoiNjQ5ZDNiYjM1OWEyY2VkYmZlMzNiNWM2In1dLCJpYXQiOjE2ODg2NTg4NzMsImV4cCI6MTY4ODkxODA3M30.9dNJ0SdrRcoekrv5h0fUydnPOacB2FY7zFRd61PQ-Xk'
// export const ExamContext = createContext();

// export const BASEURL = 'http://localhost:5000/api';
// export const BASEURL = 'https://exam-mgt-server.herokuapp.com/api'

function App() {

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
      <Route>
        <Route path='/' element={<Root />}>
          <Route index path='/courses' element={<Courses />} loader={loadCourses}/>
          <Route path='/course/:id' element={<CourseDetails />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/verify' element={<TwoFA />}/>
        </Route>
        <Route element={<StudentRoutes />}>
          <Route path='/student/dashboard' element={<StudentDashboard />} loader={loadMyCourses} />
        </Route>
        <Route path='/instructor/dashboard' element={<InstructorDashboard />} />
        <Route path='/instructor/course/:id' element={<ViewAssignedCourseStudent />} />
      </Route>
    )
  )

  return (
    // <ExamContext.Provider value={{ alert, handleAlert }}>
    <>
                {/* <Navbarr /> */}

      <div>Temp</div>
      <RouterProvider router={router}/>
    </>
    // </ExamContext.Provider>
  );
}

const Root = () => {
    return (
        <>
            
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default App;