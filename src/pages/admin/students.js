import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import {Table, Button} from 'react-bootstrap';
import axios, { AxiosError } from 'axios';
import cookies from 'js-cookie';



const Students = (props)=>{

    const [ students , setStudents ] = useState([])

    const navigate = useNavigate();
    const ref = useRef(true);
    
    useEffect(  () => {
        if (ref.current) {

          const token = cookies.get('token');
            axios({
              method: 'get',
              url: 'http://localhost:5001/api/students',
              // url: `${BASEURL}/examiner/exam`,
              headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${'token'}`
                Authorization: `Bearer ${token}`
              }
            })
            .then(res => {
                // handleAlert(true, res.data.msg, 'success');
                console.log(res.data.data)
                setStudents(res.data.students)
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
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student,index) => (
                        <tr key={index} >
                            <td>{index + 1}</td>
                            <td>{student.firstName} </td>
                            <td> {student.lastName} </td>
                            <td>{student.email}</td>
                            <td> {student.phoneNumber}</td>
                            <td>
                                <Button onClick={() => navigate(`/student/${student._id}`)}>View</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Students;