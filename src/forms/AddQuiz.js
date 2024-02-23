import { useContext, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useParams } from "react-router-dom";
import { AlertContext, BASEURL } from "../App";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "../component/Loader";

const AddQuiz = ({ isOpen, onClose, quizzes }) => {

    const formRef = useRef();
    // const { id } = useParams();
    const { notify } = useContext(AlertContext);
    let [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState({
        page: false,
        courses: true
    })
    const [formData, setFormData] = useState({
        name: '',
        sheet_id: '',
        link: '',
        pass_mark: 0,
        course_id: null,
        type: ''
    })
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                await getCourses()
                setLoading(prev => ({
                    ...prev,
                    courses: false
                }))
            } catch (err) {
                setLoading(prev => ({ ...prev, courses: false }));
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

        fetch()
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log({ name, value })
        if(name === 'type' && value === 'entry') {
            for(let quiz of quizzes) {
                if(quiz.type === 'entry') setError(true);
            }
        } else {
            setError(false)
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    };

    if (formData.type === 'entry') {
        courses = courses.filter(course => course.isModuleZero);
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log('submitted', formRef.current?.name.value)
            setLoading(prev => ({
                ...prev,
                page: true
            }))
            // const formData = {
            //     name: formRef.current.name.value,
            //     sheet_id: formRef.current.sheet_id.value,
            //     link: formRef.current.link.value,
            //     pass_mark: formRef.current.pass_mark.value,
            //     course_id: formRef.current.course.value,
            //     type: formRef.current.type.value
            // }
            console.log(formData, 'FORMDATA')
            if (formData.type == "") formData.type = formRef.current?.type.value
            const res = await axios({
                method: 'post',
                url: `${BASEURL}/admin/quiz/setup`,
                data: formData,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });

            setLoading(prev => ({
                ...prev,
                page: false
            }))

            if (!res) throw new Error('Failed to create quiz');
            notify('success', 'Created suc');
            console.log(res.data, 'DATA')

        } catch (err) {
            setLoading(prev => ({
                ...prev,
                page: false
            }))

            if (err.response?.data?.msg.includes('duplicate')) return notify('error', 'Entry quiz already exist')

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
    };

    async function getCourses() {
        const courses = await axios({
            method: 'get',
            url: `${BASEURL}/courses`,
        });

        if (!courses) throw new Error('Error fetching courses');

        setCourses(courses.data.courses);
    }

    if (!isOpen) return null;
    console.log(formRef.current?.type.value, 'ref');
    console.log(formData);
    console.log(courses)
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 w-screen  p-10 fade-in-regular`}
        >
            {loading.page && <Loader />}
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
                            value={formData.name}
                            onChange={handleChange}
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
                            id="sheet_id"
                            name="sheet_id"
                            value={formData.sheet_id}
                            onChange={handleChange}
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
                            value={formData.link}
                            onChange={handleChange}
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
                            value={formData.pass_mark}
                            onChange={handleChange}
                            placeholder="Pass mark"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold text-gray-600" htmlFor="phoneNumber">
                            Type
                        </label>
                        <select
                            className="w-full px-4 py-2 text-gray-600 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value='end'>End</option>
                            <option value='entry'>Entry</option>
                        </select>
                        {error && <p className="text-red-400">‼️⚠️An entry quiz already exist</p>}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block mb-2 font-semibold text-gray-600"
                            htmlFor="course__id"
                        >
                            Course
                        </label>
                        <select
                            className="w-full px-4 py-2 text-gray-600 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                            name="course_id"
                            id="course_id"
                            value={formData.course_id}
                            onChange={handleChange}
                        >
                            {!loading.courses && <option></option>}
                            {loading.courses ? <option>loading...</option> :
                                courses.map((course, index) => (
                                    <option key={index} value={course._id}>{course.title}</option>
                                ))
                            }
                            {/* {loading.courses ? <option>loading...</option> : 
                                formRef.current.type.value === 'entry' ? 
                                    courses.filter(course => course.isModuleZero).map((course, index) => (
                                        <option key={index} value={course._id}>{course.title}</option>
                                    )) : courses.map((course, index) => (
                                        <option key={index} value={course._id}>{course.title}</option>
                                    ))

                            } */}
                        </select>
                    </div>
                    <button
                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        type="submit"
                        disabled={error}
                    >
                        Add Quiz
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddQuiz;