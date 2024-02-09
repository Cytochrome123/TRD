import axios from "axios";
import { useContext, useRef } from "react";
import { AlertContext, BASEURL } from "../../../../App";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

// http://localhost:3000/admin/dashboard/courses/65c0db981e64276796651965/quiz/setup
const SetQuiz = () => {

    const formRef = useRef();
    const { id } = useParams();
    const {notify} = useContext(AlertContext)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log('submitted', formRef.current.name.value)
            const formData = {
                name: formRef.current.name.value,
                sheetID: formRef.current.sheetID.value,
                link: formRef.current.link.value,
                pass_mark: formRef.current.pass_mark.value
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
        <div className={`min-h-screen md:ml-72 my-12 w-[900px]`}>
            <h1 className="mt-12">SET QUIZ</h1>
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
                    Add Instructor
                </button>
            </form>
        </div>
    )
}

export default SetQuiz;