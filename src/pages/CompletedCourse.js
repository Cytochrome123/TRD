import React from 'react';

const CompletedCourses = () => {
  // Example completed course data (you can replace this with your backend data)
  const completedCoursesData = [
    {
      id: 1,
      courseName: 'Course A',
      completionDate: '2023-07-01',
      grade: 'A',
    },
    {
      id: 2,
      courseName: 'Course B',
      completionDate: '2023-07-15',
      grade: 'B+',
    },
    // Add more completed courses here
  ];

  return (
    <div className="bg-white px-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Completed Courses</h2>
      <ul className="list-disc pl-6">
        {completedCoursesData.map(course => (
          <li key={course.id} className="mb-2">
            <p className="font-semibold">{course.courseName}</p>
            <p>Completion Date: {course.completionDate}</p>
            <p>Grade: {course.grade}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedCourses;
