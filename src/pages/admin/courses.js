import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import {Table, Button} from 'react-bootstrap';
import axios, { AxiosError } from 'axios';
import cookies from 'js-cookie';



const AllCourses = (props)=>{

    const [ courses , setCourses ] = useState([])

    const navigate = useNavigate();
    const ref = useRef(true);
    
    useEffect(  () => {
        if (ref.current) {

          const token = cookies.get('token');
            axios({
              method: 'get',
              url: 'http://localhost:5001/api/courses',
              // url: `${BASEURL}/examiner/exam`,
              headers: {
                'Content-Type': 'application/json',
              }
            })
            .then(res => {
                // handleAlert(true, res.data.msg, 'success');
                console.log(res.data.data)
                setCourses(res.data.courses)
            })
            .catch(err => {
                console.log(err)
                if(err && err instanceof AxiosError) {
                    alert(err.message)
                } else if(err && err instanceof Error) {
                    alert(err.response?.data.message);
                } else {
                    alert('Error')
                }
                // handleAlert(true, e.response.data ? e.response.data : e.message, 'danger');
            });
        }

      return () => ref.current = false;
    })

    // const view = (id) => {
    //     navigate(`/examiner/exam/id/addStudent`);
    // };

    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th> No of Instructors</th>
                        <th>No of Students</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course,index) => (
                        <tr key={index} >
                            <td>{index + 1}</td>
                            <td>{course.name} </td>
                            <td> {course.description} </td>
                            <td>{course.instuctors?.length}</td>
                            <td>{course.enrolled?.length}</td>
                            <td> {course.start_date}</td>
                            <td> {course.end_date}</td>
                            <td> {course.status}</td>
                            <td>
                                <Button onClick={() => navigate(`/course/${course._id}`)}>View</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default AllCourses;