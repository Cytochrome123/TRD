import { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios, { AxiosError } from "axios";

import CourseCard from "../component/courseCard";

import cookies from "js-cookie";

const Courses = () => {
  const courses = useLoaderData();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigation.state === "loading") {
      setLoading(true);
      return;
    }

    setLoading(false);
  }, [navigation.state]);

  const handleSearch = (event) => {
    event.preventDefault();
    // Implement search logic here if needed
  };

  if (loading) {
    return (
      <div>
        <p>All Courses</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            style={{ width: "10rem" }}
          />
          <Button variant="primary" onClick={handleSearch}>
            Find
          </Button>
          <Form.Select size="sm" style={{ width: "12rem" }}>
            <option>Upcoming</option>
          </Form.Select>
        </div>
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="px-8 py-8 lg:px-16 xl:px-20 pb-20">
      <h2 className="text-2xl md:text-4xl w-full text-slate-900 flex justify-center font-bold mt-10 md:mt-16">
        Courses
      </h2>

      <form className="mt-16" onSubmit={handleSearch}>
        <input
          className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full p-2.5 focus:outline-blue-500"
          required
          type="text"
        />
      </form>

      <p>All Courses</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          style={{ width: "10rem" }}
        />
        <Button variant="primary" onClick={handleSearch}>
          Find
        </Button>
        <Form.Select size="sm" style={{ width: "12rem" }}>
          <option>Upcoming</option>
        </Form.Select>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;

export const loadCourses = async () => {
  try {
    const token = cookies.get("token");
    if (!token) {
      // Redirect to the login page or handle unauthorized access
      return [];
    }

    const res = await axios.get("http://localhost:5001/api/courses", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.courses;
  } catch (err) {
    console.log(err);
    if (err && err instanceof AxiosError) {
      alert(err.message);
    } else if (err && err.response && err.response.data) {
      alert(err.response.data.message);
    } else {
      alert("Error");
    }
    return [];
  }
};
