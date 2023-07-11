import { useState } from "react";

import cookies from 'js-cookie';
import { BASEURL } from "../App";

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
            data: formData,
            // withCredentials: true
        })
        .then(res => {
            console.log(res);
            // console.log(res.data.token)
            cookies.set('token', res.data.token );
            props.handleAlert(true, 'successfully Loged In!!!', 'success');

            if(res.data.userType === 'admin') {
                navigate('/admin')
            } else if(res.data.userType === 'subAdmin') {
                navigate('/subAdmin/examiners')
            } else if(res.data.userType === 'examiner') {
                navigate('/examiner/course');
            } else {
                navigate('/student/allExams')
            }
        })
        .catch(e => {
            console.log(e);
            props.handleAlert(false, e.response.data ? e.response.data : e.message, 'danger');
        });
    }

    return(
        <div className="form">
            <div>Edit Coourse</div>

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

                <button type='submit'>Submit</button>
            </form>
        </div>

    )
}

export default CreateCourse;