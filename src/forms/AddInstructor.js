// StudentForm.js
import React, { useState } from 'react';

const InstructorForm = () => {
  const [student, setStudent] = useState({
    name: '',
    studentId: '',
    phoneNumber: '',
    enrollmentDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your logic here to handle the form submission, e.g., sending data to a server or updating state.
  };

  return (
    // <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full p-8 bg-white rounded-lg shadow-md md:w-1/2 lg:w-1/3">
        <h2 className="mb-4 text-3xl font-semibold text-blue-600">Add Instructor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-600" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              type="text"
              id="name"
              name="name"
              value={student.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-600" htmlFor="studentId">
            Instructor ID
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              type="text"
              id="studentId"
              name="studentId"
              value={student.studentId}
              onChange={handleChange}
              placeholder="Student ID"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-600" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={student.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-600" htmlFor="enrollmentDate">
              Enrollment Date
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              type="date"
              id="enrollmentDate"
              name="enrollmentDate"
              value={student.enrollmentDate}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            type="submit"
          >
            Add Instructor
          </button>
        </form>
      </div>
    // </div>
  );
};

export default InstructorForm;
