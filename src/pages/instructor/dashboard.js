import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {Card, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import cookies from "js-cookie";

import img from '../../image/trd_img.png'

const InstructorDashboard = () => {

    const [assignedCourses, setAssignedCourses] = useState([]);
    const navigate = useNavigate();
    const ref = useRef(true)

    useEffect(() => {
        if(ref.current) {
            const token = cookies.get('token');
            axios({
                method: 'get',
                url: 'http://localhost:5001/api/assigned-courses',
                // url: `${BASEURL}/examiner/exam`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res)
                setAssignedCourses(res.data.assignedcourses)
            })
            .catch(e => {
                console.log(e);
                e.response.data.msg ? alert(e.response.data.msg) : alert(e.response.data)
            })
        }
        return () => ref.current = false;
    })
console.log(assignedCourses)
    return (
        <div>
            <div style={{ display: "flex"}}>
                <Card  border="primary" style={{ width: '14rem' }} className="mx-3 my-3">
                  {/* <Card.Header>user._id</Card.Header> */}
                  <Card.Body>
                    <div className="d-flex justify-center items-center">

                      <Card.Title>Assigned Courses</Card.Title>
                        <p style={{display: 'flex', float: "right", background: 'teal', color: 'white', width: "3rem", height: '3rem', borderRadius: '3rem', justifyContent: 'center', alignItems: 'center'}}>

                        <Card.Text>10</Card.Text>
                        </p>
                    </div>
                  </Card.Body>
                </Card>
                <Card  border="primary" style={{ width: '14rem' }} className="mx-3 my-3">
                  {/* <Card.Header>user._id</Card.Header> */}
                  <Card.Body>
                    <div className="d-flex justify-center items-center">

                      <Card.Title>In Progress</Card.Title>
                        <p style={{display: 'flex', float: "right", background: 'teal', color: 'white', width: "3rem", height: '3rem', borderRadius: '3rem', justifyContent: 'center', alignItems: 'center'}}>

                        <Card.Text>10</Card.Text>
                        </p>
                    </div>
                  </Card.Body>
                </Card>
                <Card  border="primary" style={{ width: '14rem' }} className="mx-3 my-3">
                  {/* <Card.Header>user._id</Card.Header> */}
                  <Card.Body>
                    <div className="d-flex justify-center items-center">

                      <Card.Title>Completed</Card.Title>
                        <p style={{display: 'flex', float: "right", background: 'teal', color: 'white', width: "3rem", height: '3rem', borderRadius: '3rem', justifyContent: 'center', alignItems: 'center'}}>

                        <Card.Text>10</Card.Text>
                        </p>
                    </div>
                  </Card.Body>
                </Card>
            </div>
            <section>
                <p>Assigned Courses</p>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '10px'}}>
                    <Form.Control type="email" placeholder="name@example.com" style={{width: '10rem'}}/>
                    <Button variant="primary" onClick={''}>Find</Button>
                    <Form.Select size="sm" style={{width: '12rem'}}>
                        <option>Upcoming</option>
                    </Form.Select>
                </div>

                {assignedCourses.length === 0 && <h2 className="d-flex m-5 justify-content-center">Noting yet</h2>}

                <div className="d-flex">
                    {assignedCourses.map(mycourse => (
                        <Card key={'index'} border="primary" style={{ width: '18rem' }} className="mx-3 my-3">
                            <Card.Img variant="top" src={img} />
                            <Card.Body>
                                <Card.Title>{mycourse.name}</Card.Title>
                                <Card.Text>
                                    {mycourse.description}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="dark" onClick={() => navigate(`/instructor/course/${mycourse._id}`)}>View</Button>
                            </Card.Footer>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default InstructorDashboard;