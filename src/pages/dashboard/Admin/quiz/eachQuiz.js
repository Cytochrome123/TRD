import React, { useState } from 'react';
import { IoMdClose, IoMdCreate } from 'react-icons/io'; // Import icons for close and edit

const QuizDetailModal = ({ quiz, isOpen, onClose, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedQuiz, setEditedQuiz] = useState({ ...quiz });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedQuiz(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(editedQuiz); // Pass the edited quiz back to the parent component
        setIsEditing(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 w-screen p-10 fade-in-regular">
            <div className="fixed inset-0 bg-black opacity-30"></div> {/* Black overlay */}
            <div className="relative w-full max-w-5xl p-5 overflow-hidden bg-white rounded-lg md:p-10">
                <div className="flex justify-between w-full">
                    <IoMdCreate
                        className="text-xl transition duration-300 ease-in-out cursor-pointer md:text-3xl text-slate-800 hover:text-blue-600"
                        onClick={handleEditToggle}
                    />
                    <IoMdClose
                        className="text-xl transition duration-300 ease-in-out cursor-pointer md:text-3xl text-slate-800 hover:text-red-600"
                        onClick={onClose}
                    />
                </div>
                <div className="mt-3 text-center">
                    {isEditing ? (
                        <input
                            className="text-lg leading-6 font-medium text-gray-900 border-b-2 border-gray-300 focus:outline-none w-full"
                            name="title"
                            value={editedQuiz.name}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{quiz.name}</h3>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{quiz.sheet_id}</h3>

                        </div>
                    )}
                    <div className="mt-2 px-7 py-3">
                        {isEditing ? (
                            <>
                                <textarea
                                    className="text-sm text-gray-500 w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none mb-4"
                                    name="description"
                                    value={editedQuiz.description}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className="text-sm text-gray-500 w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none mb-4"
                                    name="link"
                                    value={editedQuiz.link}
                                    onChange={handleInputChange}
                                    placeholder="Quiz Link"
                                />
                                <input
                                    type="number"
                                    className="text-sm text-gray-500 w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none"
                                    name="pass_mark"
                                    value={editedQuiz.pass_mark}
                                    onChange={handleInputChange}
                                    placeholder="Pass Mark"
                                />
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-gray-500">{quiz.description}</p>
                                <p className="text-sm text-gray-500">{quiz.link}</p>
                                <p className="text-sm text-gray-500">Pass Mark: {quiz.pass_mark}</p>
                            </>
                        )}
                    </div>
                    {isEditing && (
                        <button
                            className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizDetailModal;
