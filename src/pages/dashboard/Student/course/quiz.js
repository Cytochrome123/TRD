import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertContext, LOCALBASEURL } from "../../../../App";
import cookies from 'js-cookie';

const Quiz = () => {
    const { notify } = useContext(AlertContext)
    const { id } = useParams();
    const [quiz, setQuiz] = useState([])

    useEffect(() => {
        fetchQuiz();
    }, [id])

    const fetchQuiz = async () => {
        try {
            const quiz = await axios({
                method: 'get',
                url: `${LOCALBASEURL}/course/${id}/quiz`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.get('token')}`
                }
            })

            if(!quiz) throw new Error('Failed to fetch quiz');
console.log(quiz, 'ALLQUIZ')
            setQuiz(prev => [ ...prev, ...quiz.data.quiz])
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
        <div className={`min-h-screen md:ml-72 my-32 w-[900px]`}>
            <div className="container h-screen mx-auto mt-32">
                <p className="text-2xl">You're required to take these tests before proceeding with the enrollment</p>
                <ol>
                    {quiz.map((qz, i) => (
                        <li>
                            <span className="mr-5">{qz.name}</span>
                            <Link to={qz._id}>Click to start</Link>
                        </li>

                    ))}
                </ol>
            </div>
        </div>
    )
}

export default Quiz;