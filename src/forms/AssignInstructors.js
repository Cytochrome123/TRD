import { useContext, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie';
import { AlertContext, BASEURL } from '../App';

import Icon_x from "../assets/Icons/x-close.png";

const AssignInstructors = ({ onClose, id, onData }) => {

  // This is the list of available instructor that will be coming from backend 
  const [instructorsList, setInstructorsList] = useState([
    // {
    //   _id: 1,
    //   name: "Mrs Ade",
    // },
    // {
    //   _id: 2,
    //   name: "Mr Ola",
    // },
    // {
    //   _id: 3,
    //   name: "Mrs Wole",
    // },

  ]);
  const {notify} = useContext(AlertContext)


  // this is the form to be submited, that will contain all the instructor to be added
  const [selectedInstructors, setSelectedInstructors] = useState({ instructors: [] });

  const [isSelect, setIsSelect] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInstructors();
    setLoading(false);
  }, []);

  function getInstructors() {
    const token = Cookies.get('token');
    axios({
      method: "get",
      url: `${BASEURL}/admin/instructors`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      // withCredentials: true
    })
      .then((res) => {
        console.log("instructors", res.data);
        setInstructorsList(res.data.instructors);
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
  };

  const handleSelect = (e) => {
    setIsSelect(true)
    // const _id = Math.floor(Math.random() * 10000) + 1
    const { name, value } = e.target;
    const format = value.split('-');
    const newIns = { firstName: format[1], [name]: format[0] };
    console.log("jesus", newIns);
    if (selectedInstructors.instructors.some(select => select.instructor === format[0])) {
      notify('error', 'The instructor have been selected before');
    } else {
      setSelectedInstructors({
        instructors: [...selectedInstructors.instructors, newIns]
      });
    }
  }

  console.log(selectedInstructors, 'Toassigned');
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    axios({
      method: "patch",
      url: `${BASEURL}/admin/course/${id}/assign`,
      // url: `http://localhost:5001/api/course/${id}/assign`,
      data: selectedInstructors,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      // withCredentials: true
    })
      .then((res) => {
        console.log(res.data);
        notify('success', res.data.msg);

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
  };

  const handleCancel = (e) => {
    // e.preventDefault();
    onClose();
    // You can add your logic here to handle the form submission, e.g., sending data to a server or updating state.
  };

  const HandleDelete = (id) => {
    console.log("id", id);
    const isDele = selectedInstructors.instructors.filter(ins => ins.instructor !== id)
    setSelectedInstructors({
      instructors: [...isDele]
    });

  };



  return (
    <div className="w-full p-8 bg-white rounded-lg shadow-md md:w-1/2 lg:w-1/3">
      <button className="float-right" onClick={handleCancel}>
        <img src={Icon_x} alt="Icon x close" />
      </button>
      <h2 className="mb-4 text-3xl font-semibold text-blue-600">Assign Instructors</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">

          <label
            className="block mb-2 font-semibold text-gray-600"
            htmlFor="Instructors"
          >
            Instructors to be Assign
          </label>
          <div
            className="flex flex-wrap w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          >
            {isSelect && selectedInstructors.instructors.length > 0 ? selectedInstructors.instructors.map((instructor, index) =>
              <div key={index} className="flex p-1 m-1 bg-gray-300 rounded-lg w-fit">
                {instructor.firstName} <img onClick={() => HandleDelete(instructor.instructor)} src={Icon_x} className="px-1 cursor-pointer" alt="Icon x close" />
              </div>
            )
              :
              <span className="p-1 m-1 bg-gray-300 rounded-lg">
                Selected Instructor will appear here
              </span>
            }
            {/* <span className="p-1 m-1 bg-gray-300 rounded-lg">
                    {student.name}
                </span> */}

          </div>

        </div>

        <div className="mb-4">
          <label
            className="block mb-2 font-semibold text-gray-600"
            htmlFor="phoneNumber"
          >
            Available Instructors
          </label>
          <select
            className="w-full px-4 py-2 text-gray-600 border rounded-lg outline-none focus:ring focus:ring-blue-200"
            name="instructor"
            id="lang"
            onChange={handleSelect}
          >
            {/* <option value="civil engineering">Mr Areemu</option> */}
            {loading ? <option>loading</option> :
              instructorsList.map((instructor, index) => (
                <option key={index} value={`${instructor._id}-${instructor.firstName}`}>{instructor.firstName}</option>
              ))
            }
          </select>
        </div>

        <button
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          type="submit"
        >
          Assign
        </button>
      </form>
    </div>
  );
};

export default AssignInstructors;
