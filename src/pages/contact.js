import axios, { AxiosError } from "axios";
import { useContext, useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { IoMailOutline, IoLocationOutline } from "react-icons/io5";
import { PiCaretCircleUpLight } from "react-icons/pi";
import { AlertContext } from "../App";

const Contact = () => {
  const handleCall = () => {
    window.location.href = "tel:+2348055821595";
  };

  const handleMessage = () => {
    window.location.href = "mailto:dd_trd@ui.edu.ng";
  };

  const handleMap = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=Appleton+Road+University+of+Ibadan"
    );
  };

  const faqData = [
    {
      question: "How can I contact the TRD unit for further inquiries?",
      answer:
        "For further inquiries or to get in touch with the TRD unit at UI, you can reach out to their office through the following contact details: \n- Phone: +2348055821595 \n- Email: dd_trd@ui.edu.ng \n- Feel free to contact us for any queries related to training programs, research support, or any other relevant matters.",
    },
    {
      question: "What is the role of the TRD unit at UI?",
      answer:
        "The TRD unit at UI is responsible for coordinating and facilitating training programs and research development activities within the university. It aims to enhance the skills and knowledge of faculty members, researchers, and students through various training initiatives and promote research collaboration and innovation.",
    },
    {
      question:
        "How can I participate in the training programs organized by the TRD unit?",
      answer:
        "To participate in the training programs organized by the TRD unit, you can keep an eye on their official website or communication channels for announcements and registration details. They usually offer a range of workshops, seminars, and professional development courses tailored to different disciplines and areas of interest.",
    },
    {
      question:
        "Does the TRD unit provide funding support for research projects?",
      answer:
        " TRD unit does not povide funding.",
    },
    {
      question:
        "What resources are available for research and development at UI?",
      answer:
        "UI provides a wide range of resources for research and development activities. The university libraries offer extensive collections of academic journals, books, and research databases. Additionally, there are well-equipped laboratories, research centers, and collaborative spaces where researchers can conduct experiments, analyze data, and collaborate with peers. The TRD unit also assists researchers in accessing external funding opportunities and establishing research collaborations.",
    },
  ];

  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const handleQuestionClick = (index) => {
    if (expandedQuestion === index) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(index);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const { notify } = useContext(AlertContext)


  const handleFormChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(formData)

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      // Handle form submission logic here
      const res = await axios({
        method: 'post',
        url: 'http://localhost:5001/api/message',
        data: formData,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${'token'}`
        }
      })
      if (!res) return notify('error', 'Error submitting form')
      notify('success', res.data.msg)
      // Reset form fields
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.log(err);
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

  return (
    <div className="px-8 py-8 pb-20 my-10 lg:px-16 xl:px-20">
      <h2 className="flex justify-center w-full mt-10 text-2xl font-bold md:text-4xl text-slate-900 md:mt-16">
        Get in touch
      </h2>
      <div className="flex flex-col items-center justify-between mt-10 lg:flex-row md:mt-20 gap-y-10 lg:gap-x-20">
        <div className="flex flex-col items-stretch gap-y-5">
          <div
            onClick={handleCall}
            className="flex flex-col items-center justify-center px-10 py-5 transition duration-300 border rounded-lg cursor-pointer hover:bg-slate-200 border-slate-300"
          >
            <BsTelephone className="text-2xl text-slate-600" />
            <div className="flex flex-col items-center justify-center my-3 text-slate-600">
              <span className="font-semibold">Phone</span>
              <span className="text-sm text-center">+2348055821595</span>
            </div>
          </div>
          <div
            onClick={handleMessage}
            className="flex flex-col items-center justify-center px-10 py-5 transition duration-300 border rounded-lg cursor-pointer hover:bg-slate-200 border-slate-300"
          >
            <IoMailOutline className="text-2xl text-slate-600" />
            <div className="flex flex-col items-center justify-center my-3 text-slate-600">
              <span className="font-semibold">Mail</span>
              <span className="text-sm text-center">dd_trd@ui.edu.ng</span>
            </div>
          </div>
          <div
            onClick={handleMap}
            className="flex flex-col items-center justify-center px-10 py-5 transition duration-300 border rounded-lg cursor-pointer hover:bg-slate-200 border-slate-300"
          >
            <IoLocationOutline className="text-2xl text-slate-600" />
            <div className="flex flex-col items-center justify-center my-3 text-slate-600">
              <span className="font-semibold">Location</span>
              <span className="text-sm text-center">
                Appleton Road (Tech Rd), University of Ibadan
              </span>
            </div>
          </div>
        </div>
        {/* Contact Form Section */}
        <div className="w-full rounded-3xl md:px-6 py-8 md:shadow-[0_5px_20px_2px_rgba(0,0,0,0.1)]">
          <h3 className="mb-6 text-2xl font-bold text-center text-slate-900">
            Contact Us
          </h3>
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="px-3 py-2 mb-4 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <label className="mb-1 font-medium text-gray-600">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                className="px-3 py-2 mb-4 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <label className="mb-1 font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="px-3 py-2 mb-4 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <label className="mb-1 font-medium text-gray-600">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                className="h-32 px-3 py-2 mb-4 border rounded-md resize-none border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></textarea>

              <button
                type="submit"
                className="self-end px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700 w-max"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-20">
        <h3 className="mb-10 text-lg font-bold text-center md:text-2xl text-slate-900">
          Frequently Asked Questions
        </h3>
        {faqData.map((faq, index) => (
          <div key={index} className="mt-4">
            <div
              className="flex flex-col md:w-2/3 mx-auto items-center justify-between cursor-pointer rounded-md p-4 border border-transparent hover:border hover:border-slate-300 transition duration-300 shadow-[0_5px_20px_2px_rgba(0,0,0,0.07)]"
              onClick={() => handleQuestionClick(index)}
            >
              <div className="flex items-center justify-between w-full">
                <h4
                  className={`w-2/3 text-xs md:text-base font-medium ${expandedQuestion === index
                    ? "text-blue-600"
                    : "text-slate-800"
                    }`}
                >
                  {faq.question}
                </h4>
                <span
                  className={`transition duration-300 transform ${expandedQuestion === index
                    ? "rotate-0 text-blue-600"
                    : "rotate-180 text-slate-400"
                    }`}
                >
                  <PiCaretCircleUpLight className="md:text-3xl" />
                </span>
              </div>
              {expandedQuestion === index && (
                <div className="w-full">
                  <hr className="w-full mt-3 border border-slate-200" />
                  <p className="mt-3 text-xs text-gray-600 md:text-base">{faq.answer}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;