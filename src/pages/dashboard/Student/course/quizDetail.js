import { Link, useParams } from "react-router-dom";
import { AlertContext, BASEURL } from "../../../../App";
import axios from "axios";
import cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";


const QuizDetail = () => {
    const { notify } = useContext(AlertContext)
    const [enrol, setEnrol] = useState(false);
    const [basic, setBasic] = useState(false);
    const [quiz, setQuiz] = useState({
        name: '',
        sheetID: '',
        link: ''
    })
    const { id, quizID } = useParams();

    useEffect(() => {
        checkIfTestTaken()
            .then(async taken => {
                if (taken) {
                    setEnrol(true)
                }
                else {
                    await fetchQuiz()
                }
            })
    }, [id])

    const checkIfTestTaken = async () => {
        try {
            const attemmpted = await axios({
                method: 'get',
                url: `${BASEURL}/course/${id}/quiz/${quizID}/check`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.get('token')}`
                }
            })
            if (!attemmpted) throw new Error('Unable to check test status');

            if (attemmpted.result) {
                notify('success', 'Congratulations! you can proceed with the enrollment');
                // setEnrol(true)
                return true
            }
            notify('error', 'Unfotunately, you didn\'t pass the prelim test, You have the option to take the basic course before you can enroll for any other course');
            setBasic(true);
            return false;
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

    const fetchQuiz = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${BASEURL}/course/${id}/quiz/${quizID}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.get('token')}`
                }
            })

            if (!res) throw new Error('Failed to fetch quiz');
            console.log(res, 'QUIZ')
            setQuiz(prev => ({
                ...prev,
                name: res.data.quiz.name,
                sheetID: res.data.quiz.sheetID,
                link: res.data.quiz.link
            }))
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

    const handleDone = async (e) => {
        try {
            console.log('Done');
            const res = await axios({
                method: 'post',
                url: `${BASEURL}/quiz/${quiz.name}/${quiz.sheetID}/completed/proceed`,
                // url: `http://localhost:5001/api/quiz/:name/:sheetID/completed/proceed`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.get('token')}`
                }
            })

            if (!res) throw new Error('FAiled to submit quiz. Try again!');

            if (res.result) {
                notify('success', 'Congratulations! you can proceed with the enrollment');
                setEnrol(!enrol)
            } else {
                notify('error', 'Unfotunately, you didn\'t pass ......, You have the option to take the basic course before you can enroll for any other course');
                setBasic(true);
            }

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

    const handleRegister = async (id) => {
        try {
            const token = cookies.get('token');
            if (!token) {
                notify('error', 'You need to be logged in to continue');
                return navigate(`/signin`);
            }
            const register = await axios({
                method: "post",
                url: `${BASEURL}/course/${id}/register`,
                // url: `http://localhost:5001/api/course/${id}/register`, 
                // data: 'formData',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            if (!register) {
                notify('error', 'Registrtion failed')
                onClose()
            }
            onClose()
            notify('success', 'Registration sucessfull!!!')
            navigate(`/student/dashboard/enrolled-courses/${id}`)
        } catch (err) {
            console.log(err);
            // console.log(instanceof err)
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
            onClose()
        }
    }

    const handleBasicCourse = async () => {
        // find the basic course
        const course = await axios({
            method: 'get',
            // url: `${BASEURL}/course/${}`,
        })
    }
    return (
        <div className={`min-h-screen md:ml-72 my-12 w-[900px]`}>
            <div className="container h-screen mx-auto mt-32">
                <p className="text-2xl mb-10">Instructions</p>
                <ul>
                    <li>
                        supply your........
                    </li>
                    <li>S.......</li>
                    <li>S.......</li>
                </ul>

                <Link target="_blank" to={quiz.link}>Click to start</Link>
                <button className="bg-green-300 mt-32" onClick={handleDone}>Done</button>

                <button onClick={() => handleRegister(id)} className={`${enrol ? 'block' : 'hidden'} w-full px-10 py-2 mt-3 font-semibold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg md:mt-0 md:w-max hover:bg-blue-700`}>
                    Enrol
                </button>

                <button onClick={() => handleBasicCourse()} className={`${basic ? 'block' : 'hidden'} w-full px-10 py-2 mt-3 font-semibold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg md:mt-0 md:w-max hover:bg-blue-700`}>
                    Basic course
                </button>

                {basic && (
                    // {/* Display the basic course */ }
                    < div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 md:grid-cols-3">
                        <div
                            className="overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer"
                            onClick={() => handleViewDetails(course)}
                            key={course.id}
                        >
                            <div className="overflow-hidden h-44">
                                <img
                                    className="object-cover w-full h-full"
                                    // src={course.image}
                                    src={`${course.image?.path}`.includes('/s') ? `${course.image?.path}` : `https://trd-server.onrender.com/api/file/${course.image?.path}`}
                                    alt="Pic"
                                />
                            </div>
                            <div className="px-4 py-4">
                                <div className="px-3 py-2 mb-3 text-xs rounded-full text-slate-600 bg-slate-300 w-max">
                                    {course.category}
                                </div>
                                <h3 className="mb-5 text-lg font-bold text-gray-800">
                                    {course.title}
                                </h3>
                                <div className="flex flex-row items-center justify-between space-x-2">
                                    <div className="flex items-center space-x-2 text-sm text-slate-700">
                                        {" "}
                                        <LuCalendarClock className="text-xl " />
                                        <span>{course.duration}</span>
                                    </div>
                                    <span
                                        className="text-sm font-medium text-blue-500 transition duration-300 ease-in-out cursor-pointer hover:text-blue-600"
                                        onClick={() => handleViewDetails(course)}
                                    >
                                        View Details →
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div id="result"></div>
            </div>
        </div >
    )
}

export default QuizDetail;