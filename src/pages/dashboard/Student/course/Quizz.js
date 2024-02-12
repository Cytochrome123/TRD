import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertContext, BASEURL } from "../../../../App";
import axios from "axios";
import cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import CourseDetails from "../../../../component/CourseDetails";
import Loader from "../../../../component/Loader";


const Quizz = () => {
    const { notify } = useContext(AlertContext)
    const [quizStatus, setQuizStatus] = useState({
        taken: false,
        passed: false
    })
    const [loading, setLoading] = useState(true);

    const [quiz, setQuiz] = useState({
        name: '',
        sheetID: '',
        link: ''
    });

    const [basic, setBasic] = useState();

    const { id, quizID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('n,fdsjkn.cfdkj,')
        axios({
            method: 'get',
            url: `${BASEURL}/course/${id}/quiz-status/${quizID}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.get('token')}`
            }
        }).then(async res => {
            const { hasTakenQuiz, quizPassed } = res.data;
            console.log({ hasTakenQuiz, quizPassed })
            setQuizStatus(prev => ({
                ...prev,
                taken: hasTakenQuiz,
                passed: quizPassed
            }));
            if (!hasTakenQuiz) {
                await fetchQuiz();
            }
            setLoading(false);
        })
            .catch(err => {
                setLoading(false)
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
            })
    }, []);

    const fetchQuiz = async () => {
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
    };

    console.log(quizStatus)

    const handleDone = async (e) => {
        try {
            console.log('Done');
            setLoading(true)
            const res = await axios({
                method: 'post',
                url: `${BASEURL}/quiz/${quiz.name}/${quiz.sheetID}/completed/proceed`,
                // url: `http://localhost:5001/api/quiz/:name/:sheetID/completed/proceed`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.get('token')}`
                }
            })
            setLoading(false)
            if (!res) throw new Error('FAiled to submit quiz. Try again!');

            const { hasTakenQuiz, quizPassed } = res.data;
            if (hasTakenQuiz && quizPassed) {
                notify('success', 'Congratulations! you can proceed with the enrollment');
                setQuizStatus(prev => ({
                    ...prev,
                    taken: hasTakenQuiz,
                    passed: quizPassed
                }))
            } else if (hasTakenQuiz && !quizPassed) {
                notify('error', 'Unfotunately, you didn\'t pass ......, You have the option to take the basic course before you can enroll for any other course');
                setQuizStatus(prev => ({
                    ...prev,
                    taken: hasTakenQuiz,
                    passed: quizPassed
                }))
            } else {
                notify('error', 'You need to take a preliminar test before you can continue. Kindly click on the link below to take the required test');
            }

        } catch (err) {
            setLoading(false)
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

    const handleRegister = async (id) => {
        try {
            setLoading(true)
            const token = cookies.get('token');
            if (!token) {
                notify('error', 'You need to be logged in to continue');
                return navigate(`/signin`);
            }
            const register = await axios({
                method: "post",
                url: `${BASEURL}/course/${id}/register`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            setLoading(false);
            if (!register) {
                notify('error', 'Registrtion failed')
                // onClose()
            }
            // onClose()
            notify('success', 'Registration sucessfull!!!')
            navigate(`/student/dashboard/enrolled-courses/${id}`)
        } catch (err) {
            console.log(err);
            setLoading(false)
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
            // onClose()
        }
    }

    const handleBasicCourse = async () => {
        setLoading(true);
        const basic = await axios({
            method: 'get',
            url: `${BASEURL}/course/${id}/basic`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.get('token')}`
            }
        })
        setLoading(false);
        if (!basic) throw new Error('failed to fetch the basic course!');
        console.log(basic.data, 'BASIC COURSE');
        const { _id, image, title, description, duration, start_date, end_date } = basic.data.basic.basicCourseID;
        setBasic({
            _id,
            image,
            title,
            description,
            duration,
            start_date, end_date
        })
    }

    const handleCloseBasic = () => {
        setBasic();
        document.body.style.overflow = "auto";
    }

    // if (loading) return <div className={`min-h-screen md:ml-72 my-12 w-[900px]`}>Loading...</div>;

    return (
        <div className={`min-h-screen md:ml-72 my-12 w-[900px]`}>
            {loading && <Loader />}
            <div className="container h-screen mx-auto mt-32">
                {!quizStatus.taken ? (
                    <div>
                        <p className="text-2xl mb-10">You need to take the preliminary test.</p>
                        {/* Render TestComponent here or provide a button/link to it */}
                        <p className="text-lg mb-10">Instructions</p>
                        <ul>
                            <li>
                                supply your........
                            </li>
                            <li>S.......</li>
                            <li>S.......</li>
                        </ul>

                        <div className="flex justify-between mt-32">
                            <p><Link target="_blank" to={quiz.link} className="underline text-blue-500">Click to start</Link></p>
                            <button className="bg-green-300 text-green-700 p-3 rounded-md" onClick={handleDone}>Done</button>

                        </div>
                    </div>
                ) : quizStatus.passed ? (
                    <div>
                        <p>You have passed the test. You can now enrol in the course.</p>
                        {/* Render EnrolmentComponent here or provide a button/link to it */}
                        <button onClick={() => handleRegister(id)} className={`w-full px-10 py-2 mt-3 font-semibold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg md:mt-0 md:w-max hover:bg-blue-700`}>
                            Proceed to enrol
                        </button>
                    </div>
                ) : (
                    <div>
                        <p>You did not pass the test. Please take the basic course.</p>
                        <button onClick={() => handleBasicCourse()} className={`w-full px-10 py-2 mt-3 font-semibold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg md:mt-0 md:w-max hover:bg-blue-700`}>
                            Basic course
                        </button>
                        {basic && (
                            <CourseDetails
                                id={basic._id}
                                title={basic.title}
                                className={basic ? 'block' : 'hidden'}
                                image={basic.image.path}
                                description={basic.description}
                                duration={basic.duration}
                                onClose={handleCloseBasic}
                                basic={true}
                            />
                        )}
                        {/* < div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 md:grid-cols-3">
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
                                            onClick={() => handleRegister('basicID')}
                                        >
                                            Enrol →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );

}

export default Quizz;