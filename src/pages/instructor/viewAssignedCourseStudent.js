import { useRef, useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";

import { Button, Table } from 'react-bootstrap';
import axios, { AxiosError } from 'axios';

import img from '../../image/trd_img.png'

import TableList from '../../component/TableList';

const ViewAssignedCourseStudent = () => {
    const { id } = useParams();

    const [courseDetails, setCourseDetails]  = useState({
        details: {},
        students: []
    });
    const ref = useRef(true)

    useEffect(() => {
        if (ref.current) {
            axios({
                method: 'get',
                url: `http://localhost:5001/api/course/${id}`,
                // url: `${BASEURL}/examiner/exam`,
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${'token'}`
                }
            })
            .then(res => {
                console.log(res)
                setCourseDetails(prev => ({
                    ...prev,
                    details: res.data.course,
                    students: res.data.course.enrolled
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
            });
        }

      return () => ref.current = false;
    })
console.log(courseDetails.students)
    return (
        <div>
            <img src={img}/>

            <div>
                <h1>{courseDetails.details.name}</h1>
                <p>{courseDetails.details.description}</p>
                <h4>Date and Time</h4>
                <p>Start Date: Fri, Jun 16, 2023, 9:00 AM</p>
                <p>End Date: Sat, Jun 17, 2023, 4:00 PM WAT</p>
                <p>Duration: 1 month</p>
                <p>Location: University of Ibadan</p>
                <p>payment: It's free for everyone</p>
                <p>Capacity: 1000</p>
                <p>Status: Upcoming</p>


                
                {/* {!registered ? <Button variant='primary' onClick={() => handleRegister()} >Register</Button> : <TableList />} */}
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
                        {courseDetails.students.map((student,index) => (
                            <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{student.userID.firstName} </td>
                                <td> {student.userID.lastName} </td>
                                <td>{student.userID.email}</td>
                                <td> {student.userID.phoneNumber}</td>
                                <td>
                                    <Button onClick={'() => navigate(`/instructor/${instructor._id}`)'}>View</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>
        </div>
    )
    
}

export default ViewAssignedCourseStudent;
