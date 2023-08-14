import React from 'react';
import Card from "./admin/MetricCard";


const AssignedCourses = () => {
  // Example assigned courses data (you can replace this with your backend data)
  const assignedCourses = [
    { courseName: 'Course A', courseCode: 'CSE101', enrollmentDate: '2023-08-09' },
    { courseName: 'Course B', courseCode: 'MATH201', enrollmentDate: '2023-08-10' },
    // Add more courses here
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
        {/* <Card/> */}
      <h2 className="text-2xl font-semibold mb-4">Assigned Courses</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4">Course Name</th>
            <th className="py-2 px-4">Course Code</th>
            <th className="py-2 px-4">Enrollment Date</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignedCourses.map((course, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="py-2 px-4">{course.courseName}</td>
              <td className="py-2 px-4">{course.courseCode}</td>
              <td className="py-2 px-4">{course.enrollmentDate}</td>
              <td className="py-2 px-4">
                <a href={`/courses/${course.courseCode}`} className="text-blue-500 hover:underline">
                  View Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedCourses;