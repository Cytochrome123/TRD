import { useContext, useState } from 'react';
import { AlertContext } from "../App";
import Icon_x from "../assets/Icons/x-close.png";
import axios from 'axios';
import cookies from 'js-cookie';
import Loader from '../component/Loader';

const AddCourseForm = ({ onClose, onData }) => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    duration: '',
    start_date: '',
    end_date: '',
    location: '',
    capacity: '',
    amount: '',
    isModuleZero: false,
    image: null,
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const { notify } = useContext(AlertContext);
  const token = cookies.get('token');

  const handleChange = (event) => {
    setCourseData(prevData => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheck = (e) => {
    setCourseData(prev => ({
      ...prev,
      isModuleZero: e.target.checked,
    }));
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError('No file selected');
      return;
    }
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 500 * 1024; // 500 KB in bytes

    if (!validTypes.includes(file.type)) {
      setError('Only PNG, JPG, and JPEG files are allowed');
      e.target.value = '';
      return;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 500 KB');
      e.target.value = '';
      return;
    }

    setCourseData(prevData => ({
      ...prevData,
      image: file,
    }));
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post(`${process.env.REACT_APP_SERVERURL}/admin/course`, courseData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        notify('success', res.data.message);
        setLoading(false);
        setCourseData({
          title: '',
          description: '',
          duration: '',
          start_date: '',
          end_date: '',
          location: '',
          capacity: '',
          amount: '',
          isModuleZero: false,
          image: null,
          tags: [],
        });
        setTags([]);
        onClose();
      })
      .catch((err) => {
        setLoading(false);
        if (Array.isArray(err.response?.data.message)) {
          notify('error', err.response.data.errors[0].msg);
        } else if (err.response) {
          notify('error', err.response.data.message || err.response.data);
        } else {
          notify('error', err.message);
        }
      });
  };

  const handleCancel = () => {
    onClose();
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && newTag.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
        setNewTag('');

        setCourseData(prevData => ({
          ...prevData,
          tags,
        }));
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));

    setCourseData(prevData => ({
      ...prevData,
      tags,
    }));
  };

  return (
    <div className="w-full max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md md:p-8 lg:p-10 max-h-screen overflow-auto">
      {loading && <Loader />}
      <button className='float-right' onClick={handleCancel}><img src={Icon_x} alt='Icon x close' /></button>
      <h2 className="mb-6 text-2xl font-semibold text-blue-600 md:text-3xl">Add Course</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <div className="flex-1">
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="title">Title</label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="text"
                id="title"
                name="title"
                value={courseData.title}
                onChange={handleChange}
                placeholder="Course Title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="description">Description</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                id="description"
                name="description"
                value={courseData.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="duration">Duration</label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="text"
                id="duration"
                name="duration"
                value={courseData.duration}
                onChange={handleChange}
                placeholder="Course Duration"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="start_date">Start Date</label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="date"
                id="start_date"
                name="start_date"
                value={courseData.start_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="end_date">End Date</label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="date"
                id="end_date"
                name="end_date"
                value={courseData.end_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="location">Location</label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="text"
                id="location"
                name="location"
                value={courseData.location}
                onChange={handleChange}
                placeholder="Location"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="capacity">Capacity</label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="number"
                id="capacity"
                name="capacity"
                value={courseData.capacity}
                onChange={handleChange}
                placeholder="Capacity"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-600" htmlFor="amount">Amount</label>
              <input
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                type="number"
                id="amount"
                name="amount"
                value={courseData.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="isModuleZero"
                name="isModuleZero"
                checked={courseData.isModuleZero}
                onChange={handleCheck}
                className="mr-2"
              />
              <label className="font-semibold text-gray-600" htmlFor="isModuleZero">Module 0</label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-600" htmlFor="tags">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full flex items-center">
                {tag}
                <button
                  type="button"
                  className="ml-2 text-blue-600"
                  onClick={() => handleRemoveTag(tag)}
                >
                  &times;
                </button>
              </span>
            ))}
            <input
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type a tag and press Enter"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-600" htmlFor="image">Image</label>
          <input
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onFileChange}
            required
          />
        </div>
        {selectedImage && <img src={selectedImage} alt="Selected Image" className="w-full h-32 object-cover" />}
        <p className="text-red-500">{error}</p>
        <button
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          type="submit"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourseForm;
