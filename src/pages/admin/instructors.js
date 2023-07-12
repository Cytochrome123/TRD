import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import {Table, Button} from 'react-bootstrap';
import axios from "axios";
import cookies from 'js-cookie';


const Instructors = (props)=>{

    const [ instructors , setInstructors ] = useState([])

    const navigate = useNavigate();
    const ref = useRef(true);
    
    useEffect(  () => {
        if (ref.current) {

          const token = cookies.get('token');
            axios({
              method: 'get',
              url: 'http://localhost:5001/api/instructors',
              // url: `${BASEURL}/examiner/exam`,
              headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${'token'}`
                Authorization: `Bearer ${token}`
              }
            })
            .then(res => {
                // handleAlert(true, res.data.msg, 'success');
                console.log(res.data)
                setInstructors(res.data.instructors)
            })
            .catch(e => {
                console.log(e)
                e.response.data ? alert(e.response.data) : e.response.data.msg ? alert(e.response.data.msg) : alert(e.response.data.data.msg)
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
                    {instructors.map((instructor,index) => (
                        <tr key={index} >
                            <td>{index + 1}</td>
                            <td>{instructor.firstName} </td>
                            <td> {instructor.lastName} </td>
                            <td>{instructor.email}</td>
                            <td> {instructor.phoneNumber}</td>
                            <td>
                                <Button onClick={'() => navigate(`/instructor/${instructor._id}`)'}>View</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Instructors;