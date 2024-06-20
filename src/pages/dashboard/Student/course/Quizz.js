import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertContext, AuthContext } from "../../../../App";
import axios from "axios";
import cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import CourseDetails from "../../../../component/CourseDetails";
import Loader from "../../../../component/Loader";


const Quizz = () => {
    const { notify } = useContext(AlertContext)
    const { handleAuth } = useContext(AuthContext);
    const [quizStatus, setQuizStatus] = useState({
        taken: false,
        passed: false
    })
    const [loading, setLoading] = useState(true);

    const [quiz, setQuiz] = useState({
        name: '',
        sheet_id: '',
        link: ''
    });

    const [module_0, setModule_0] = useState(null);

    const { course_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_SERVERURL}/entry_quiz/status`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${cookies.get('token')}`
                    }
                });
                const { hasTakenQuiz, quizPassed } = res.data.data;
                console.log({ hasTakenQuiz, quizPassed })
                setQuizStatus(prev => ({
                    ...prev,
                    taken: hasTakenQuiz,
                    passed: quizPassed
                }));

                if (!hasTakenQuiz) {
                    await fetchQuiz();
                }
            } catch (err) {
                notify('error', 'An error occurred while fetching quiz status.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const fetchQuiz = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_SERVERURL}/entry_quiz`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.get('token')}`
                }
            });
            console.log(res, 'QUIZ')
            setQuiz(prev => ({
                ...prev,
                name: res.data.data.name,
                sheet_id: res.data.data.sheet_id,
                link: res.data.data.link
            }))
        } catch (error) {
            notify('error', 'Failed to fetch quiz details.');
        }
    };

    console.log(quizStatus)

    const handleDone = async (e) => {
        try {
            console.log('Done');
            setLoading(true)
            const res = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_SERVERURL}/entry_quiz/${quiz.name}/${quiz.sheet_id}/completed/proceed`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.get('token')}`
                }
            })
            setLoading(false)
            if (!res) throw new Error('FAiled to submit quiz. Try again!');

            const { hasTakenQuiz, quizPassed } = res.data.data;
            if (hasTakenQuiz && quizPassed) {
                notify('success', 'Congratulations! you can proceed with the enrollment');
                setQuizStatus(prev => ({
                    ...prev,
                    taken: hasTakenQuiz,
                    passed: quizPassed
                }))
            } else if (hasTakenQuiz && !quizPassed) {
                notify('success', 'Unfotunately, you didn\'t pass ......, You have the option to take the basic course before you can enroll for any other course');
                setQuizStatus(prev => ({
                    ...prev,
                    taken: hasTakenQuiz,
                    passed: quizPassed
                }))
            } else {
                notify('error', 'You need to take a preliminary test before you can continue. Kindly click on the link below to take the required test');
            }

        } catch (err) {
            setLoading(false)
            // if (err.response?.data.message.includes('duplicate')) return notify('error', "You can't attempt the test more than once")

            if (Array.isArray(err.response?.data.message)) {
                notify('error', err.response.data.errors[0].msg)
            } else if (err.response) {
                // This can happen when the required headers or options to access the endpoint r not provided
                if (err.response.data.message) {
                    notify('error', err.response.data.message)
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
                return navigate(`/auth/signin?rd=enrol/entry_quiz`);
            }
            const register = await axios({
                method: "post",
                url: `${process.env.REACT_APP_SERVERURL}/course/${id}/register`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            setLoading(false);
            if (!register) {
                notify('error', 'Registration failed')
                // onClose()
            }
            if (register.data.data?.renewToken) handleAuth(register.data.data.renewToken);
            // onClose()
            notify('success', 'Registration sucessfull!!!')
            navigate(`/student/dashboard/enrolled-courses/${id}`)
        } catch (err) {
            console.log(err);
            setLoading(false)
            // console.log(instanceof err)
            if (Array.isArray(err.response?.data.message)) {
                notify('error', err.response.data.errors[0].msg)
            } else if (err.response) {
                // This can happen when the required headers or options to access the endpoint r not provided
                if (err.response.data.message) {
                    notify('error', err.response.data.message)
                } else {
                    notify('error', err.response.data)
                }
            } else {
                notify('error', err.message)
            }
            // onClose()
        }
    }

    const handleModuleZero = async () => {
        try {
            setLoading(true);
            const module = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_SERVERURL}/module_zero`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.get('token')}`
                }
            })
            if (!module) throw new Error('failed to fetch the module_zero course!');
            console.log(module.data, 'module_zero COURSE');
            const { _id, image, title, description, duration, start_date, end_date } = module.data.data;
            setModule_0({
                _id,
                image,
                title,
                description,
                duration,
                start_date, end_date
            })

        } catch (err) {
            console.log(err);
            if (Array.isArray(err.response?.data.message)) {
                notify('error', err.response.data.errors[0].msg)
            } else if (err.response) {
                // This can happen when the required headers or options to access the endpoint r not provided
                if (err.response.data.message) {
                    notify('error', err.response.data.message)
                } else {
                    notify('error', err.response.data)
                }
            } else {
                notify('error', err.message)
            }
        } finally {
            setLoading(false);
        }
    }

    const handleCloseModuleZero = () => {
        setModule_0(null);
        document.body.style.overflow = "auto";
    }

    // if (loading) return <div className={`min-h-screen md:ml-72 my-12 w-[900px]`}>Loading...</div>;

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen mx-auto my-32 w-full max-w-4xl px-4 py-8">
            <div className="bg-white shadow rounded-lg p-6">
                {!quizStatus.taken ? (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Preliminary Test Required</h2>
                        <p className="mb-6">Please read the instructions carefully and click the link below to start your test:</p>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <li>Ensure you have a stable internet connection.</li>
                            <li>Read each question carefully before answering.</li>
                            <li>Make sure to submit your answers before closing the test.</li>
                        </ul>
                        <div className="flex items-center justify-between">
                            <Link to={quiz.link} target="_blank" className="text-blue-600 hover:text-blue-800 underline">Start Test</Link>
                            <button onClick={handleDone} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">I've Finished</button>
                        </div>
                    </div>
                ) : quizStatus.passed ? (
                    <div>
                        <p className="mb-4">Congratulations! You've passed the preliminary test.</p>
                        <button onClick={() => handleRegister(course_id)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">Proceed to Enrollment</button>
                    </div>
                ) : (
                    <div>
                        <p className="mb-4">Unfortunately 😞, you did not pass the test. Consider enrolling in the module 0 first.</p>
                        <button onClick={handleModuleZero} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300">Enroll in Module 0</button>
                    </div>
                )}
            </div>
            {module_0 && (
                <CourseDetails
                    id={module_0._id}
                    title={module_0.title}
                    image={module_0.image.path}
                    description={module_0.description}
                    duration={module_0.duration}
                    onClose={handleCloseModuleZero}
                    isModuleZero={true}
                // fetchModule0={fetchModule0}
                />
            )}
        </div>
    );

}

export default Quizz;