import { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { AlertContext, BASEURL } from '../App';
import { useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const UpdateCourseStatusForm = ({ onClose, onData, className }) => {

    const formRef = useRef();
    const { id } = useParams();
    const { notify } = useContext(AlertContext)

    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        status: '',
        deadline: '',
        courseID: id
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log(formData, 'FORMDATA')
            const res = await axios({
                method: 'put',
                // url: `${BASEURL}/course/${courseID}/quiz/setup`,
                url: `${BASEURL}/course/${id}/status`,
                data: formData,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });

            if (!res) throw new Error('Failed to update course');
            notify('success', 'Updated');
            console.log(res.data, 'DATA')

        } catch (err) {
            if (Array.isArray(err.response?.data.msg)) {
                notify('error', err.response.data.msg[0].msg)
            } else if (err.response) {
                // This can happen when the required headers or options to access the endpoint r not provided
                if (err.response.data.msg) {
                    notify('error', err.response.data.msg)
                } else {
                    notify('error', err.response.data)
                }
            } else {
                notify('error', err.message)
            }
        }
    }

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 w-screen p-10 ${className} fade-in-regular`}
        >
            <div className="fixed inset-0 bg-black opacity-30"></div>{" "}
            {/* Black overlay */}
            <div className="relative w-full max-w-5xl p-5 overflow-hidden bg-white rounded-lg md:p-10">
                <div className="flex justify-end w-full">
                    <IoMdClose
                        className="mb-3 text-xl transition duration-300 ease-in-out cursor-pointer md:text-3xl md:mb-0 text-slate-800 hover:text-red-600"
                        onClick={onClose}
                    />
                </div>
                <h2 className="mb-4 text-3xl font-semibold text-blue-600">Status</h2>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold text-gray-600" htmlFor="name">
                            Status
                        </label>
                        <select
                            className="w-full px-4 py-2 text-gray-600 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                            name="status"
                            id="lang"
                            onChange={handleChange}
                            value={formData.status}
                        >
                            <option></option>
                            <option value={'upcoming'}>Upcoming</option>
                            <option value={'in-progress'}>In-progress</option>
                            <option value={'application'}>Application</option>
                            <option value='completed'>Completed</option>
                        </select>
                    </div>
                    {formData.status == 'application' && (<div className="mb-4">
                        <label className="block mb-2 font-semibold text-gray-600" htmlFor="studentId">
                            Deadline
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                            type="date"
                            id="deadline"
                            name="deadline"
                            value={formData.deadline}
                            placeholder="Deadline"
                            onChange={handleChange}
                            // required={formData.status == 'application' ? true : false}
                            required
                        />
                    </div>)}
                    <button
                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        type="submit"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateCourseStatusForm;
