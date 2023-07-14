import { useRef, useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";

import {Card, Button} from 'react-bootstrap';
import axios, { AxiosError } from 'axios';
import cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import img from '../image/trd_img.png'

import TableList from '../component/TableList';

const CourseDetails = () => {
    const { id } = useParams();

    const [courseDetails, setCourseDetails]  = useState({
        details: {},
        instructors: [],
        students: []
    });
    const ref = useRef(true)
    const navigate = useNavigate();

    const token = cookies.get('token');
    console.log(token, 'token')
    let decoded;
    let Authenticated;
    let registeredBefore;
    if (token) {
        decoded = jwtDecode(token);
        console.log(decoded)
        Authenticated = token !== 'undefined'
        registeredBefore = decoded.courses.some(obj => obj.courseID.toString() == id);
    
        console.log(Authenticated, 'con');
        console.log(registeredBefore, 'dition')
    }


    useEffect( () => {
        // if (ref.current) {
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
                setCourseDetails(prev => ({
                    ...prev,
                    details: res.data.course,
                    instructors: res.data.course.instructors,
                    students: res.data.course.eenrolled,
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
            
        // }

    //   return () => ref.current = false;
    }, [])

    const handleRegister = () => {
        if (token === undefined) {
            navigate('/signin')
        }
        console.log(decoded)
        axios({
            method: 'post',
            url: `http://localhost:5001/api/course/${id}/register`,
            // url: `${BASEURL}/subAdmin/student/new`,
            // data: {},
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res);
            // props.studentsData();
            navigate(`/course/${id}`)
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

        console.log(courseDetails.details.name)
        console.log(decoded.userType === 'admin')
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
                {/* <Button variant='primary' onClick={() => handleRegister()} style={{float: 'right'}} >Register</Button> */}
                {Authenticated && courseDetails.instructors && <TableList name='INSTRUCTORS' list={courseDetails.instructors} isAdmin={decoded.userType === 'admin'} />}
                {/* {Authenticated && decoded.userType === 'admin' && <TableList name='STUDENTS' list={courseDetails.students} isAdmin={decoded.userType === 'admin'} />} */}

                {!Authenticated && decoded.userType !== 'admin' && <Button variant='primary' onClick={() => handleRegister()} style={{float: 'right'}} >Register</Button>}
                {Authenticated && !registeredBefore && decoded.userType !== 'admin' && <Button variant='primary' onClick={() => handleRegister()} style={{float: 'right'}} >Register</Button>}
            </div>
        </div>
    )
    
}

export default CourseDetails;
