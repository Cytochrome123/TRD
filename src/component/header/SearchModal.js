import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // Adjust this based on your app's structure

const SearchModal = ({ isOpen, onClose, inputRef }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (timer) clearTimeout(timer);

        setTimer(setTimeout(() => {
            if (value) {
                fetchSearchResults(value);
            }
        }, 1000));
    };

    const fetchSearchResults = async (query) => {
        setIsLoading(true);

        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/search?q=${query}`);
            setResults(response.data.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResultClick = (path) => {
        onClose();
        window.location.href = path;
        // navigate(`/${path}`)
    };
    console.log(results, 'result');

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Search"
            className="p-6 bg-white rounded-lg shadow-lg w-[350px] sm:max-w-lg sm:w-full mx-auto my-20"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div className="flex justify-end">
                <button onClick={onClose} className="text-xl text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <div className="mt-4">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search..."
                    ref={inputRef}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {isLoading ? (
                    <p className="mt-4 text-center text-gray-600">Loading...</p>
                ) : (
                    <div className="mt-4 space-y-2">
                        {results.length > 0 ? (
                            results.map((result, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleResultClick(result.md == 'course' ? `courses/${result._id}` : result.md == 'quiz' ? `quiz` : result.md == 'user' && result.userType == 'student' ? `students/${result._id}` : result.md == 'user' && result.userType == 'instructor' ? `instructors/${result._id}` : '#')}
                                    className="p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 rounded-md"
                                >
                                    {result.firstName ?? result.name ?? result.title} {/* Adjust this to match your data structure */}
                                </div>
                            ))
                        ) : (
                            <p className="mt-4 text-center text-gray-600">No results found</p>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default SearchModal;
