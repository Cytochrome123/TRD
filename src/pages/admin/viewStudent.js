import { useRef, useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";

import { Button, Table } from 'react-bootstrap';
import axios, { AxiosError } from 'axios';
import cookies from 'js-cookie';


import TableList from '../../component/TableList';

const ViewStudent = () => {
    const { id } = useParams();

    const [student, setStudent]  = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        courses: [],
    });
    const ref = useRef(true)

    useEffect(() => {
        if (ref.current) {
            const token = cookies.get('token')
            axios({
                method: 'get',
                url: `http://localhost:5001/api/student/${id}`,
                // url: `${BASEURL}/examiner/exam`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res)
                setStudent(prev => ({
                    ...prev,
                    firstName: res.data.student.firstName,
                    lastName: res.data.student.lastName,
                    email: res.data.student.email,
                    phoneNumber: res.data.student.phoneNumber,
                    courses: res.data.student.courses
                }))
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

    return (
        <div>
            <h1>{student.firstName} {student.lastName}</h1>
            <h2>{student.email}</h2>
            <div>
                {student.courses.length === 0 ? <h3>This student is yet to register for a course</h3> : 
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Name</th>
                                <th>Descripton</th>
                                <th>Duration</th>
                                <th>Progress</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student.courses.map((course,index) => (
                                <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td>{course.courseID.name} </td>
                                    <td> {course.courseID.description} </td>
                                    <td>{course.courseID.duration}</td>
                                    <td> {course.progress}</td>
                                    <td>
                                        <Button onClick={'() => navigate(`/instructor/${instructor._id}`)'}>V</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                }

            </div>
        </div>
    )
    
}

export default ViewStudent;
