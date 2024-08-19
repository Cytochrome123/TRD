import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertContext } from "../../../../App";
import axios from "axios";
import Cookies from 'js-cookie';

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { notify } = useContext(AlertContext);

  useEffect(() => {
    getCourses();
    setLoading(false);
  }, []);

  function getCourses() {
    const token = Cookies.get('token');
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVERURL}/enrolled_courses`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setCourses(() => res.data.data);
      })
      .catch((err) => {
        if (Array.isArray(err.response?.data.message)) {
          notify('error', err.response.data.errors[0].msg);
        } else if (err.response) {
          notify('error', err.response.data.message || err.response.data);
        } else {
          notify('error', err.message);
        }
      });
  }

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="h-screen w-full p-3 sm:ml-64 my-20">
      <div className="bg-white border rounded shadow">
        <div className="border-b p-3">
          <h2 className="my-8 text-2xl font-semibold">Enrolled Courses</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="text-white bg-blue-500">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Capacity</th>
                <th className="px-4 py-2">Student Enrolled</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" className='h-32 text-xl text-center'>Loading...</td></tr>
              ) : courses.length === 0 ? (
                <tr><td colSpan="8" className='h-32 text-xl text-center'>No data yet</td></tr>
              ) : (
                courses.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-100 group">
                    <td className="px-4 py-2">
                      <img src={`${process.env.REACT_APP_SERVERURL}/file/${course.course_id.image?.path}`} alt={course.title} className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="px-4 py-2">{course.course_id.title}</td>
                    <td className="px-4 py-2">{course.course_id.description}</td>
                    <td className="px-4 py-2">{course.course_id.duration}</td>
                    <td className="px-4 py-2">{course.course_id.capacity}</td>
                    <td className="px-4 py-2">{course.course_id.amount}</td>
                    <td className="px-4 py-2">{course.course_id.status ? course.status : "Upcoming"}</td>
                    <td className="px-4 py-2">
                      <div className='relative flex justify-between'>
                        <Link to={`${course.course_id._id}`} className="h-8 text-blue-500 hover:underline">
                          View Profile
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourses;
