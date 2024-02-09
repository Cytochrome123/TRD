import { useContext, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useParams } from "react-router-dom";
import { AlertContext, BASEURL } from "../App";
import axios from "axios";
import Cookies from "js-cookie";

const AddQuiz = ({ className, onClose }) => {

    const formRef = useRef();
    const { id } = useParams();
    const { notify } = useContext(AlertContext)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log('submitted', formRef.current.name.value)
            const formData = {
                name: formRef.current.name.value,
                sheetID: formRef.current.sheetID.value,
                link: formRef.current.link.value,
                pass_mark: formRef.current.pass_mark.value,
                courseID: id
            }
            console.log(formData, 'FORMDATA')
            const res = await axios({
                method: 'post',
                // url: `${BASEURL}/course/${courseID}/quiz/setup`,
                url: `${BASEURL}/course/${id}/quiz/setup`,
                data: formData,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });

            if (!res) throw new Error('Failed to create quiz');
            notify('success', 'Created suc');
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
            className={`fixed inset-0 flex items-center justify-center z-50 w-screen  p-10 ${className} fade-in-regular`}
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
                <h2 className="mb-4 text-3xl font-semibold text-blue-600">Add Quiz</h2>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold text-gray-600" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                            type="text"
                            id="name"
                            name="name"
                            // value={student.name}
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold text-gray-600" htmlFor="studentId">
                            Sheet ID
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                            type="text"
                            id="sheetID"
                            name="sheetID"
                            // value={student.studentId}
                            placeholder="SheetID"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold text-gray-600" htmlFor="phoneNumber">
                            link
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                            type="text"
                            id="link"
                            name="link"
                            // value={student.phoneNumber}
                            placeholder="Link"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold text-gray-600" htmlFor="phoneNumber">
                            Pass mark
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                            type="text"
                            id="pass_mark"
                            name="pass_mark"
                            // value={student.phoneNumber}
                            placeholder="Pass mark"
                            required
                        />
                    </div>
                    <button
                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        type="submit"
                    >
                        Add Quiz
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddQuiz;