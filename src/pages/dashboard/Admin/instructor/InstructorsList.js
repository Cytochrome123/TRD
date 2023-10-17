import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
// import Instructo from '../../Data/Instructor'
import { AuthContext, BASEURL } from "../../../../App";
import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie';

const InstructorsList = () => {
  // const { instructors } = useContext(AuthContext);
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true);
  //   const {pathname} = useLocation()
  //  console.log('location', pathname);

  // const [showAddPop, setShowAddPop] = useState(false);



  // const handleOnClose = () =>{
  //   setShowAddPop(false)
  // }


  // const students = [
  //     { id: 1, name: 'Student 1' },
  //     { id: 2, name: 'Student 2' },
  //     { id: 3, name: 'Student 3' },
  //     { id: 4, name: 'Student 4' },
  //     { id: 5, name: 'Student 5' },
  //     { id: 6, name: 'Student 6' },
  //     { id: 7, name: 'Student 7' },
  //     { id: 8, name: 'Student 8' },
  //     // Add more students...
  //   ];


  //   const Instructor = [
  //     {
  //       id: 1,
  //       name: 'John Doe',
  //       studentId: '12345',
  //       phoneNumber: '123-456-7890',
  //       enrollmentDate: '2023-08-09',
  //       imageUrl: 'https://placeimg.com/50/50/people'
  //     },
  //     {
  //       id: 2,
  //       name: 'Jane Smith',
  //       studentId: '67890',
  //       phoneNumber: '987-654-3210',
  //       enrollmentDate: '2023-08-10',
  //       imageUrl: 'http://i.pravatar.cc/3'
  //     //   imageUrl: 'https://placeimg.com/50/50/people'
  //     },
  //     {
  //       id: 3,
  //       name: 'laurence Smith',
  //       studentId: '67890',
  //       phoneNumber: '987-654-3210',
  //       enrollmentDate: '2023-08-10',
  //       imageUrl: `http://i.pravatar.cc/3`
  //     //   imageUrl: 'https://placeimg.com/50/50/people'
  //     },
  //     {
  //       id: 4,
  //       name: 'Jane Smith',
  //       studentId: '67890',
  //       phoneNumber: '987-654-3210',
  //       enrollmentDate: '2023-08-10',
  //       imageUrl: `http://i.pravatar.cc/3`
  //     //   imageUrl: 'https://placeimg.com/50/50/people'
  //     },
  //     {
  //       id: 5,
  //       name: 'Jane Smith',
  //       studentId: '67890',
  //       phoneNumber: '987-654-3210',
  //       enrollmentDate: '2023-08-10',
  //       imageUrl: `http://i.pravatar.cc/3`
  //     //   imageUrl: 'https://placeimg.com/50/50/people'
  // },
  //     {
  //       id: 6,
  //       name: 'Jane Smith',
  //       studentId: '67890',
  //       phoneNumber: '987-654-3210',
  //       enrollmentDate: '2023-08-10',
  //       imageUrl: `http://i.pravatar.cc/3`
  //       //   imageUrl: 'https://placeimg.com/50/50/people'
  //     },
  //     {
  //       id: 7,
  //       name: 'Jane Smith',
  //       studentId: '67890',
  //       phoneNumber: '987-654-3210',
  //       enrollmentDate: '2023-08-10',
  //       imageUrl: `http://i.pravatar.cc/3`
  //       //   imageUrl: 'https://placeimg.com/50/50/people'
  //     },
  //     {
  //       id: 8,
  //       name: 'Jane Smith',
  //       studentId: '67890',
  //       phoneNumber: '987-654-3210',
  //       enrollmentDate: '2023-08-10',
  //       imageUrl: `http://i.pravatar.cc/3`
  //     //   imageUrl: 'https://placeimg.com/50/50/people'
  //     },
  //     {
  //       id: 9,
  //       name: 'Jane Smith',
  //       studentId: '67890',
  //       phoneNumber: '987-654-3210',
  //       enrollmentDate: '2023-08-10',
  //       imageUrl: `http://i.pravatar.cc/3`
  //     //   imageUrl: 'https://placeimg.com/50/50/people'
  //     },
  //     {
  //       id: 10,
  //       name: 'Jane Smith',
  //       studentId: '67890',
  //       phoneNumber: '987-654-3210',
  //       enrollmentDate: '2023-08-10',
  //       imageUrl: `http://i.pravatar.cc/3`
  //     //   imageUrl: 'https://placeimg.com/50/50/people'
  //     },
  //     {
  //       id: 11,
  //       name: 'Jane Smith',
  //       studentId: '67890',
  //       phoneNumber: '987-654-3210',
  //       enrollmentDate: '2023-08-10',
  //       imageUrl: `http://i.pravatar.cc/3`
  //     //   imageUrl: 'https://placeimg.com/50/50/people'
  //     },
  //     {
  //       id: 12,
  //       name: 'Jane Smith',
  //       studentId: '67890',
  //       phoneNumber: '987-654-3210',
  //       enrollmentDate: '2023-08-10',
  //       imageUrl: `http://i.pravatar.cc/3`
  //     //   imageUrl: 'https://placeimg.com/50/50/people'
  //     },
  //     {
  //       id: 13,
  //       name: 'Jane Smith',
  //       studentId: '67890',
  //       phoneNumber: '987-654-3210',
  //       enrollmentDate: '2023-08-10',
  //       imageUrl: `http://i.pravatar.cc/3`
  //     //   imageUrl: 'https://placeimg.com/50/50/people'
  //     },
  //     {
  //       id: 14,
  //       name: 'Jane Smith',
  //       studentId: '67890',
  //       phoneNumber: '987-654-3210',
  //       enrollmentDate: '2023-08-10',
  //       imageUrl: `http://i.pravatar.cc/3`
  //     //   imageUrl: 'https://placeimg.com/50/50/people'
  // },
  //     {
  //       id: 15,
  //       name: 'Jane Smith',
  //       studentId: '67890',
  //       phoneNumber: '987-654-3210',
  //       enrollmentDate: '2023-08-10',
  //       imageUrl: `http://i.pravatar.cc/3`
  //     //   imageUrl: 'https://placeimg.com/50/50/people'
  //     },

  //     // I can keep adding more students here
  //   ];

  useEffect(() => {
    getInstructors();
    setLoading(false);
  }, []);

  function getInstructors() {
    const token = Cookies.get('token');
    axios({
      method: "get",
      url: `${BASEURL}/instructors`,
      headers: {
        // 'Content-Type': 'text/html',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      // withCredentials: true
    })
      .then((res) => {
        console.log("instructors", res.data);
        setInstructors(res.data.instructors);
      })
      .catch((err) => {
        console.log(err);
        if (err && err instanceof Error) {
          alert(`${err.message} making the request`)
          // alert(err.response?.data.msg);
        } else if (err && err instanceof AxiosError) {
          alert(err.message)
        } else {
          alert('Error')
        }
        // props.handleAlert(false, e.response.data ? e.response.data : e.message, 'danger');
      });
  }

  return (
    <div className='justify-center max-w-screen-xl p-6 mx-auto align-middle bg-white rounded shadow flex-colume justify-self-center' >


      <div className='flex justify-end '>


        <div className="relative group">

          <button
            //  onClick={() => setShowAddPop(true)}
            className="px-4 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 md:text-base">
            Add Instructor
          </button>
          <div className="absolute hidden p-2 text-sm text-gray-700 bg-gray-100 rounded shadow-md group-hover:block">
            You can assign instructor to a course
          </div>
        </div>

      </div>


      {/* <div className="p-6 bg-white rounded shadow"> */}
      <h2 className="my-8 text-2xl font-semibold">All Instructors</h2>
      <div className='overflow-x-auto '>
        <table className="w-full">
          <thead>
            <tr className="text-white bg-blue-500">
              <th className="px-4 py-2 ">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Enrollment Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody >
            {loading ? ('Loading') : instructors.length === 0 ? ('No data yet') :
              instructors.map((instructor, index) => (
                <tr key={index} className="hover:bg-gray-100 group">
                  <td className="px-4 py-2">
                    {/* <img src={`https://trd-server.onrender.com/api/file/${instructor.image.path}`} alt={instructor.name} className="w-10 h-10 rounded-full" /> */}
                    <img src={`${instructor.imageUrl}${instructor.id}`} alt={instructor.name} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="px-4 py-2">{instructor.firstName} {instructor.lastName}</td>
                  <td className="px-4 py-2">{instructor.email}</td>
                  <td className="px-4 py-2">{instructor.phoneNumber}</td>
                  <td className="px-4 py-2">{instructor.createdDate}</td>
                  <td className="px-4 py-2 ">
                    <div className='relative flex justify-between'>
                      <Link to={`${instructor._id}`} className="h-8 text-blue-500 hover:underline">
                        View Profile
                      </Link>
                      {/* <div className='absolute bg-red-0 sm:-right-10 md:-right-16 lg:-right-5 '>
                <svg className='hidden h-4 p-0 m-0 cursor-pointer group-hover:block animate-pulse ' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path fill="#f44336" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"></path><line x1="16.9" x2="31.1" y1="16.9" y2="31.1" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="4"></line><line x1="31.1" x2="16.9" y1="16.9" y2="31.1" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="4"></line>
                </svg>
                </div> */}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* </div> */}


    </div>
  );
}

export default InstructorsList
// export default InstructorsProfile