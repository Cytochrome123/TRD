import React, { useContext, useState, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import { Link, useMatch } from 'react-router-dom';
import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie';
import { useOutletContext } from 'react-router-dom';


// import studentData from '../../Data/User'

import ModelContainer from "../../../../component/ModelContainer";

import AddStudent from "../../../../forms/AddStudent";
// import axios from 'axios';
// import cookies from "js-cookie";
// import axios, { AxiosError } from "axios";
import { AlertContext, BASEURL } from "../../../../App";
import { IoMdOptions } from 'react-icons/io';
import DropdownItem from '../../../../component/DropdownItem';
// import { useEffect } from 'react';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  // const [studentData, setStudentData] = useState({});
  // const [items, setItems] = useState([]);
  const [showAddPop, setShowAddPop] = useState(false);
  const [isSidebarOpen] = useOutletContext();
  const { notify, call2Action } = useContext(AlertContext);
  const token = Cookies.get('token');


  useEffect(() => {
    getStudents();
    setLoading(false);
  }, []);

  // closing of the pop up
  const handleOnClose = () => {
    setShowAddPop(false);
  };

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
    // notify('warning', 'Are you sure you wanna delete this user?')
    call2Action('warning', 'Are you sure you want to remove the specified student?', 'The student bhas been removed');
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
    axios({
      method: "get",
      url: `${BASEURL}/admin/students`,
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
        if (Array.isArray(err.response?.data.msg)) {
          notify('error', err.response.data.msg[0].msg)
        } else if (err.response) {
          // This can happen when the required headers or options to access the endpoint r not provided
          if (err.response.data.msg) {
            notify('error', err.response.data.msg)
          } else {
            notify('error', err.response.data)
          }
        } else {
          notify('error', err.message)
        }
      });
  }

  const handleDownloadStudent = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${BASEURL}/admin/students/download`,
        headers: {
          // 'Content-Type': 'text/html',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob',
      });
  
      if(!res) throw new Error('Error occured while trying to get resource');

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `students.xlsx`); // Specify the filename here
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (err) {
      console.log(err);
        if (Array.isArray(err.response?.data.msg)) {
          notify('error', err.response.data.msg[0].msg)
        } else if (err.response) {
          // This can happen when the required headers or options to access the endpoint r not provided
          if (err.response.data.msg) {
            notify('error', err.response.data.msg)
          } else {
            notify('error', err.response.data)
          }
        } else {
          notify('error', err.message)
        }
    }
  }

  return (
    <div className={`p-4 w-full md:ml-72 min-h-screen my-20`}>
      {/* <SideBar /> */}
      <div className="flex-col justify-center max-w-screen-xl min-h-screen p-6 mx-auto align-middle bg-white rounded shadow justify-self-center">

        <div className="flex justify-end ">
          {/* <div className="relative group">

            <button
              onClick={() => setShowAddPop(true)}
              className="px-4 py-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 md:text-base"
            >
              Add Student
            </button>
            <div className="absolute hidden p-2 text-sm text-gray-700 bg-gray-100 rounded shadow-md group-hover:block">
              You can add Student
            </div>

          </div> */}
          <div className="relative group">
            {/* Button to toggle dropdown */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
            >
              <IoMdOptions />
            </button>

            {/* Dropdown Content */}
            {isOpen && (
              <div className="absolute right-0 z-10 mt-2 w-56 bg-white shadow-lg rounded">
                <DropdownItem description="" fire={() => setShowAddPop(true)}>Add student</DropdownItem>
                <DropdownItem description="" fire={handleDownloadStudent}>Download students</DropdownItem>
              </div>
            )}
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
              {loading ? ('Loading') : students.length === 0 ? <h1 className='h-32 text-xl text-center'>No data yet</h1> :
                students.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-100 group">
                    <td className="px-4 py-2">
                      <img src={`https://trd-server.onrender.com/api/file/${student.image?.path}`} alt={student.firstName} className="w-10 h-10 rounded-full" />

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
    </div>
  );
};

export default Students;