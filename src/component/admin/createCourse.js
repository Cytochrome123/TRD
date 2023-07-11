import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import cookies from 'js-cookie';
import { hard } from "../../App";
// import { BASEURL } from "../App";

const CreateCourse = (props)=>{

    const [ formData , setFormData ] = useState({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        duration: "",
        location: "",
        courseType: "",
        capacity: 0,
        status: ""
    })

    const navigate = useNavigate();

    function handleChange(event){
        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name] : event.target.value
            }
        });
    }
    console.log(formData);


    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            // url: `${BASEURL}/Signin`,
            url: 'http://localhost:5001/api/course',
            data: formData,
            // withCredentials: true
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${hard}`
            }
        })
        .then(res => {
            console.log(res);
            console.log(res.data.data.msg)
            alert(res.data.data.msg)
            navigate(`/course/${res.data.data.course._id}`)
            // console.log(res.data.token)
            // props.handleAlert(true, 'successfully Loged In!!!', 'success');

            
        })
        .catch(e => {
            console.log(e);
            alert(e)
            // props.handleAlert(false, e.response.data ? e.response.data : e.message, 'danger');
        });
    }

    return(
        <div className="form">
            <div>Add Course</div>

            <form onSubmit={handleSubmit}>
                <input type='text' name='name' placeholder="Name" onChange={handleChange} value={formData.name} />
                <input type='text' name='description' placeholder="Description" onChange={handleChange} value={formData.description} />
                <input type='Date' name='start_date' placeholder="Start Date" onChange={handleChange} value={formData.start_date} />
                <input type='Date' name='end_date' placeholder="End Date" onChange={handleChange} value={formData.end_date} />
                <input type='text' name='duration' placeholder="Duration" onChange={handleChange} value={formData.duration} />
                <input type='text' name='location' placeholder="Location" onChange={handleChange} value={formData.location} />
                <input type='text' name='capacity' placeholder="Capacity" onChange={handleChange} value={formData.capacity} />
                <select>
                    <option value='Upcoming'>Upcoming</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Completed'>Completed</option>
                </select>

                <button type='submit'>Add</button>
            </form>
        </div>

    )
}

export default CreateCourse;