
import { useLoaderData, useNavigation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import CourseCard from "../component/courseCard"


import { hard } from '../App';

const Courses = () => {

    // const course = {
    //     _id: '1234567890',
    //     name: 'First',
    //     description: 'edfghjnfgvcfthghv'
    //     // , justifyContent: 'space-between'
    // }

    const courses = useLoaderData();
    const navigation = useNavigation()
    console.log(courses, 'i');
    console.log(navigation.state, 2)

    if(navigation.state === 'loading') {
        return (
            <div>
                <p>Alll Courses</p>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '10px'}}>
                    <Form.Control type="email" placeholder="name@example.com" style={{width: '10rem'}}/>
                    <Button variant="primary" onClick={''}>Find</Button>
                    <Form.Select size="sm" style={{width: '12rem'}}>
                        <option>Upcoming</option>
                    </Form.Select>
                </div>
                <h1>Loading....</h1>
            </div>    
        )
    }
    return (
        <div>
            <p>Alll Courses</p>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '10px'}}>
                <Form.Control type="email" placeholder="name@example.com" style={{width: '10rem'}}/>
                <Button variant="primary" onClick={''}>Find</Button>
                <Form.Select size="sm" style={{width: '12rem'}}>
                    <option>Upcoming</option>
                </Form.Select>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap"}}>
                {courses.map(course => (
                    <CourseCard course={course}/>
                ))}
                {/* <CourseCard course={course}/>
                <CourseCard course={course}/>
                <CourseCard course={course}/>
                <CourseCard course={course}/> */}
            </div>
        </div>
    )
}

export default Courses

export const loadCourses = async () => {
    try {
        let res = await axios({
            method: 'get',
            url: 'http://localhost:5001/api/courses',
            // url: `${BASEURL}/examiner/exam`,
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${'token'}`
                Authorization: `Bearer ${hard}`
            }
        })
        if (res) return res.data.courses
        // .then(res => (res.data.courses))
        // .catch(err => (err))
        // .then(res => {
        //     console.log(res.data.courses)
        //     courses = res.data.courses
        //     // return courses
        // })
        // .catch(err => {
        //     console.log(err)
        //     courses = [err]
        // })
        // return courses
    } catch (err) {
        return [err]
        // return [err.response.data.msg]
    }
}