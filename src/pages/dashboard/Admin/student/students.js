import React, { useContext, useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { Link, useMatch } from 'react-router-dom';
import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie';

// import studentData from '../../Data/User'

import ModelContainer from "../../../../component/ModelContainer";

import AddStudent from "../../../../forms/AddStudent";
// import axios from 'axios';
// import cookies from "js-cookie";
// import axios, { AxiosError } from "axios";
import { BASEURL } from "../../../../App";
import { useEffect } from 'react';
// import { useEffect } from 'react';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false)

  const [searchQuery, setSearchQuery] = useState("");
  // const [studentData, setStudentData] = useState({});
  // const [items, setItems] = useState([]);
  const [showAddPop, setShowAddPop] = useState(false);

  useEffect(() => {
    getStudents();
    setLoading(false);
  }, []);

  // closing of the pop up
  const handleOnClose = () => {
    setShowAddPop(false);
  };


  // const { id } = useParams();
  console.log("params", useMatch);

  // Handle search
  const handleSearch = (event) => {
    const newSearchQuery = event.target.value || "";
    setSearchQuery(newSearchQuery);


    const filtered = students.filter((course) =>
      course.firstName.toLowerCase().includes(newSearchQuery.toLowerCase())
    );
    setStudents(filtered);
  };


  const handleRemoveStudent = (id) => {
    alert("Are you sure you want to delete this user?")
    const newStudents = students.filter(item => item.id !== id);
    setStudents(() => newStudents);
    // console.log("Students",Students);
    console.log("student", id);
    console.log("newStudents", newStudents);
  };


  const handleAddStudent = (childData) => {
    // const id = Math.floor(Math.random() * 1000) + 1
    const id = students.length + 1
    // console.log('zzz',id);

    console.log("callback check", childData);
    const newPost = { id, name: childData.name, studentId: childData.studentId, phoneNumber: childData.phoneNumber }
    const allPost = [newPost, ...students]
    setStudents(allPost)


  };

  function getStudents() {
    const token = Cookies.get('token');
    axios({
      method: "get",
      url: `${BASEURL}/students`,
      headers: {
        // 'Content-Type': 'text/html',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      // withCredentials: true
    })
      .then((res) => {
        console.log("Students", res.data);
        // const allPost = [newPost, ...courses]

        setStudents(res.data.students);

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
    <div className="justify-center max-w-screen-xl p-6 mx-auto align-middle bg-white rounded shadow flex-colume justify-self-center ">

      <div className="flex justify-end ">
        <div className="relative group">

          <button
            onClick={() => setShowAddPop(true)}
            className="px-4 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 md:text-base"
          >
            Add Student
          </button>
          <div className="absolute hidden p-2 text-sm text-gray-700 bg-gray-100 rounded shadow-md group-hover:block">
            You can add Student
          </div>

        </div>
      </div>

      <div className="flex justify-center w-[90%] mt-1 md:-mt-5">





        <form
          className="flex flex-row items-center w-4/5 p-2 bg-gray-100 border border-gray-300 rounded-lg md:w-3/5 md:p-3"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            className="flex-1 bg-transparent outline-none"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(event) => {
              handleSearch(event);
            }}
          />
          <BsSearch className="ml-2 text-2xl text-blue-600" />
        </form>






      </div>
      <h2 className="my-8 text-2xl font-semibold">Students Taking Course</h2>

      <div className='overflow-x-auto '>
        <table className="w-full table-auto min-w-max x-overflow-scroll ">
          <thead>
            <tr className="text-white bg-blue-500">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Enrollment Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? ('Loading') : students.length === 0 ? ('No data yet') :
              students.map((student, index) => (
                <tr key={index} className="hover:bg-gray-100 group">
                  <td className="px-4 py-2">
                    <img src={`https://trd-server.onrender.com/api/file/${student.image.path}`} alt={student.firstName} className="w-10 h-10 rounded-full" />

                  </td>
                  <td className="px-4 py-2">{student.firstName} {student.lastName}</td>
                  <td className="px-4 py-2">{student._id}</td>
                  <td className="px-4 py-2">{student.phoneNumber}</td>
                  <td className="px-4 py-2">{student.createdDate}</td>
                  <td className="px-4 py-2 ">
                    <div className='relative flex justify-between'>
                      <Link to={`${student._id}`} className="h-8 text-blue-500 hover:underline">
                        View Profile
                      </Link>
                      <div onClick={() => handleRemoveStudent(student.id)} className='absolute bg-red-0 sm:-right-10 md:-right-16 lg:-right-5 '>
                        <svg className='hidden h-4 p-0 m-0 cursor-pointer group-hover:block animate-pulse ' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                          <path fill="#f44336" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"></path><line x1="16.9" x2="31.1" y1="16.9" y2="31.1" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="4"></line><line x1="31.1" x2="16.9" y1="16.9" y2="31.1" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="4"></line>
                        </svg>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <ModelContainer onClose={handleOnClose} visible={showAddPop}>
        <AddStudent onData={handleAddStudent} onClose={handleOnClose} />
      </ModelContainer>
    </div>
  );
};

export default Students;