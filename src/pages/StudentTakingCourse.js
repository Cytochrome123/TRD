import React from 'react';

const StudentsTakingCourse = () => {
  // Example student data (you can replace this with your backend data)
  const studentData = [
    {
      id: 1,
      name: 'John Doe',
      studentId: '12345',
      phoneNumber: '123-456-7890',
      enrollmentDate: '2023-08-09',
      imageUrl: 'https://placeimg.com/50/50/people'
    },
    {
      id: 2,
      name: 'Jane Smith',
      studentId: '67890',
      phoneNumber: '987-654-3210',
      enrollmentDate: '2023-08-10',
      imageUrl: 'https://placeimg.com/50/50/people'
    },
    // Add more students here
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Students Taking Course</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4">Image</th>
            <th className="py-2 px-4">Student Name</th>
            <th className="py-2 px-4">Student ID</th>
            <th className="py-2 px-4">Phone Number</th>
            <th className="py-2 px-4">Enrollment Date</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map(student => (
            <tr key={student.id} className="hover:bg-gray-100">
              <td className="py-2 px-4">
                <img src={student.imageUrl} alt={student.name} className="w-10 h-10 rounded-full" />
              </td>
              <td className="py-2 px-4">{student.name}</td>
              <td className="py-2 px-4">{student.studentId}</td>
              <td className="py-2 px-4">{student.phoneNumber}</td>
              <td className="py-2 px-4">{student.enrollmentDate}</td>
              <td className="py-2 px-4">
                <a href={`/students/${student.id}`} className="text-blue-500 hover:underline">
                  View Profile
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTakingCourse;