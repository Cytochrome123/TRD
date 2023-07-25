import { useNavigate } from "react-router-dom";

import {Card, Button} from 'react-bootstrap';

import img from '../images/trd_img.png'

const CourseCard = ({course}) => {

console.log(course._id)
    const navigate = useNavigate();
    
    return (
        <Card key={'index'} border="primary" style={{ width: '18rem' }} className="mx-3 my-3">
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>
                    {course.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="dark" onClick={() => navigate(`/course/${course._id}`)}>View</Button>
            </Card.Footer>
        </Card>
    )
}

export default CourseCard;