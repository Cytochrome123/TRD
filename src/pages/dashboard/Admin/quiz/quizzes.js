import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import QuizDetailModal from './eachQuiz';
import AddQuiz from '../../../../forms/AddQuiz';
import { IoMdAdd } from 'react-icons/io';
import axios from 'axios';
import { AlertContext, BASEURL } from '../../../../App';
import Cookies from 'js-cookie';
import Loader from '../../../../component/Loader';

// Example component to display quizzes
const Quizzes = () => {
    const { notify } = useContext(AlertContext);
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true)

    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState({
        details: false,
        addQuiz: false
    });
    const [currentQuiz, setCurrentQuiz] = useState(null);

    const openModal = (quiz) => {
        setCurrentQuiz(quiz);
        setIsModalOpen(prev => ({
            ...prev,
            details: true
        }));
    };

    const closeModal = () => {
        setIsModalOpen(prev => ({
            ...prev,
            details: false,
        }))
    }

    const openForm = (quiz) => {
        setCurrentQuiz(quiz);
        setIsModalOpen(prev => ({
            ...prev,
            addQuiz: true
        }));
    };

    const closeForm = () => {
        setIsModalOpen(prev => ({
            ...prev,
            addQuiz: false,
        }))
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: `${BASEURL}/admin/quizzes`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }).then(res => {
            setQuizzes(res.data.quizzes);
        }).catch(err => {
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
        setLoading(false)

    }, []);

    return (
        <div className={`p-4 w-full md:ml-72 my-20 min-h-screen`}>
            {loading && <Loader />}
            <div className="container mx-auto p-4">
                <div className='header flex justify-between'>
                    <h1 className="text-2xl font-bold mb-4">Quizzes</h1>
                    <IoMdAdd
                        className="text-xl transition duration-300 ease-in-out cursor-pointer md:text-3xl text-slate-800 hover:text-blue-600"
                        onClick={openForm}
                    />

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quizzes.map((quiz) => (
                        <button key={quiz._id} onClick={() => openModal(quiz)} className="p-4 border rounded-lg shadow-lg m-2">
                            {quiz.name}
                        </button>
                    ))}
                </div>
            </div>
            {/* <QuizDetailModal quiz={currentQuiz} isOpen={isModalOpen.details} onClose={() => setIsModalOpen(false)} /> */}
            <QuizDetailModal quiz={currentQuiz} isOpen={isModalOpen.details} onClose={closeModal} />

            {isModalOpen.addQuiz &&
                <AddQuiz
                    isOpen={isModalOpen.addQuiz}
                    onClose={closeForm}
                />
            }
        </div>
    );
};

export default Quizzes;
