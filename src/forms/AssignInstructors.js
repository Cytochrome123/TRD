import React, { useState } from "react";
import Icon_x from "../assets/Icons/x-close.png";

const AssignInstructors = ({ onClose, onData }) => {

  // This is the list of available instructor that will be coming from backend 
  const [insList, setInsList] = useState([
    { 
    id: 1,
    name: "Mrs Ade",
 },
    { 
    id: 2,
    name: "Mr Ola",
 },
    { 
    id: 3,
    name: "Mrs Wole",
 },
   
  ]);

  // this is the form to be submited, that will contain all the instructor to be added
  const [theIns, setTheIns] = useState([])

  const [isSelect, setIsSelect] = useState(false)

  // const [student, setStudent] = useState({
  //   name: "",
  //   studentId: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setStudent({ ...student, [name]: value });
  //   console.log("student", student);
  // };

  const handleSelect = (e)=>{
    setIsSelect(true)
      const id = Math.floor(Math.random() * 10000) + 1
      const { name, value } = e.target;
    const newIns = {id, name: value}
    console.log("jesus", newIns);
    setTheIns([...theIns, newIns ])


    

    // setInsList([...student, {name:value} ])
    // console.log("000",student);
    // setStudent({...student, [name]:value})
    
    console.log("xyz", name);

    // console.log("xyz", e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };
  const handleCancel = (e) => {
    // e.preventDefault();
    onClose();
    // You can add your logic here to handle the form submission, e.g., sending data to a server or updating state.
  };
  const HandleDelete = (id) => {
    console.log("id", id);
    const isDele = theIns.filter(ins => ins.id !== id)
    setTheIns( isDele )

  };

  

  return (
    <div className="w-full p-8 bg-white rounded-lg shadow-md md:w-1/2 lg:w-1/3">
      <button className="float-right" onClick={handleCancel}>
        <img src={Icon_x} alt="Icon x close" />
      </button>
      <h2 className="mb-4 text-3xl font-semibold text-blue-600">Assign Instructors</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">

        <label
            className="block mb-2 font-semibold text-gray-600"
            htmlFor="Instructors"
          >
            Instructors to be Assign
          </label>
            <div 
            className="w-full flex flex-wrap px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            >
               { isSelect ?  theIns.map((eachList, index) => 
                <div key={index} className="bg-gray-300 p-1 m-1 flex w-fit rounded-lg">
                    {eachList.name} <img onClick={() =>HandleDelete(eachList.id)} src={Icon_x} className="px-1 cursor-pointer" alt="Icon x close" />
                </div>
                )
                 :
                 <span className="bg-gray-300 p-1 m-1  rounded-lg">
                    Selected Instructor will appear here
                </span>
               }
                 {/* <span className="bg-gray-300 p-1 m-1  rounded-lg">
                    {student.name}
                </span> */}
                
            </div>
          
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="phoneNumber"
          >
           Available Instructors
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 text-gray-600 outline-none"
            name="name"
            id="lang"
            onChange={handleSelect}
          >
            {/* <option value="civil engineering">Mr Areemu</option> */}
            {insList.map((eachList, index) => (
              <option key={index} value={eachList.name}>{eachList.name}</option>
            ))}
            
          </select>
        </div>
        
        <button
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          type="submit"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AssignInstructors;
