import { Table, Button } from "react-bootstrap";

const TableList = ({name, list, isAdmin}) => {
    console.log(list.length)
    console.log(isAdmin)
    return (
        <div>
            <br></br>
            <h2>{name}</h2>
            {list.length >= 1 ?
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
                        {list.map((instructor,index) => (
                            <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{instructor.instructor.firstName} </td>
                                <td> {instructor.instructor.lastName} </td>
                                <td>{instructor.instructor.email}</td>
                                <td> {instructor.instructor.phoneNumber}</td>
                                <td>
                                    <Button onClick={'() => navigate(`/instructor/${instructor._id}`)'}>View</Button>
                                    {isAdmin && <Button>Edit</Button>}
                                    {isAdmin && <Button>Delete</Button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table> : <p>{name.toLowerCase()} has not been assigned yet</p> 
            }
        </div>
    )
}

export default TableList;