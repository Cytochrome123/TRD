import React, { useState } from "react";
import HEROIMG from "../images/building.jpg";
import VISION from "../images/vision.svg";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import { MdOutlineComputer } from "react-icons/md";
import { AiOutlineDatabase } from "react-icons/ai";
import { SiMicrosoftacademic } from "react-icons/si";

const courses = [
  {
    name: "Digital Productivity Training",
    description:
      "Enhance productivity with Microsoft Office Suite, Google Suite, and Adobe Suite.",
  },
  {
    name: "Data Science, ML and AI",
    description:
      "Master data science, machine learning, and artificial intelligence techniques.",
  },
  {
    name: "Digital Literacy",
    description:
      "Develop essential digital skills with Microsoft Office Suite, Google Suite, and Adobe Suite.",
  },
  {
    name: "Tech Odyssey",
    description:
      "Embark on a journey to explore various tech tools and software applications.",
  },
  {
    name: "Arc GIS",
    description:
      "Gain proficiency in GIS technology for spatial analysis and data visualization.",
  },
];

const services = [
  {
    icon: <PiChalkboardTeacherBold />,
    title: "Specialized Workshops",
    color: "text-amber-500",
  },
  {
    icon: <MdOutlineComputer />,
    title: "IT and Computer Training",
    color: "text-blue-500",
  },
  {
    icon: <AiOutlineDatabase />,
    title: "Research Tools and Data Analysis",
    color: "text-lime-500",
  },
  {
    icon: <SiMicrosoftacademic />,
    title: "Academics",
    color: "text-red-500",
  },
];

const announcements = [
  {
    title: "New Course Available",
    description:
      "We are pleased to announce that we have a new course available for registration. The course is titled 'Introduction to ArcGIS'. It is a 3-week course that will run from the 1st of August to the 21st of August. The course will be taught by Prof. A. O. Oluwade.",
  },
  {
    title: "New Course Available",
    description:
      "We are pleased to announce that we have a new course available for registration. The course is titled 'Introduction to ArcGIS'. It is a 3-week course that will run from the 1st of August to the 21st of August. The course will be taught by Prof. A. O. Oluwade.",
  },
];

function Landing() {
  const [isVisionVisible, setIsVisionVisible] = useState(true);

  const handleVisionClick = () => {
    setIsVisionVisible(true);
  };

  const handleMissionClick = () => {
    setIsVisionVisible(false);
  };

  return (
    <div className="px-8 py-8 lg:px-16 xl:px-20 pb-20">
      <div className="flex flex-col items-center md:flex-row justify-center mt-3 md:mt-16 space-y-8 md:space-y-0 md:space-x-20">
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 space-y-7">
          <div className="flex flex-col space-y-3">
            <h1 className="text-2xl md:text-4xl text-slate-800 font-bold md:leading-relaxed text-center md:text-left">
              Welcome to the ICT Training Center for the University of Ibadan
            </h1>
            <p className="text-sm md:text-lg text-slate-800 leading-relaxed text-center md:text-justify">
              We here at the training research and development unit are experts
              in ICT training, empowering individuals to become skilled
              professionals in the field. Join us to unlock your potential and
              excel in your ICT career.
            </p>
          </div>
          <button className="text-white font-bold bg-blue-600 px-7 py-3 rounded-lg hover:bg-blue-400 transition duration-300 ease-in-out">
            <a href="/signup">Sign Up</a>
          </button>
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <img className="rounded-lg mx-auto" src={HEROIMG} alt="hero" />
        </div>
      </div>

      <div className="flex flex-col items-center mt-20 md:mt-32">
        <h2 className="text-2xl text-slate-800 font-bold leading-relaxed mb-10">
          What we have to offer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div key={index} className="flex flex-col">
              <a href="#" className="flex flex-col items-stretch">
                <div className="flex flex-col justify-start items-start border-2 border-slate-200 rounded-2xl p-5 space-y-3 text-slate-600 hover:bg-slate-100 transition duration-300 ease-in-out cursor-pointer h-40 hover:transform hover:scale-105">
                  <h3 className="text-lg font-bold">{course.name}</h3>
                  <p className="leading-relaxed text-justify">
                    {course.description}
                  </p>
                </div>
              </a>
            </div>
          ))}
          <a
            href="/courses"
            className="col-span-1 justify-center align-middle flex text-white font-bold bg-blue-600 px-7 py-3 rounded-lg hover:bg-blue-400 transition duration-300 ease-in-out"
          >
            <button>View all our courses</button>
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center mt-20 md:mt-32">
        <h2 className="text-2xl text-slate-800 font-bold leading-relaxed mb-10">
          {isVisionVisible ? "Our Vision" : "Our Mission"}
        </h2>

        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-16">
          <img
            src={VISION}
            className="w-full md:w-2/5 rounded-lg"
            alt="vision"
          />
          <div className="flex flex-col w-full items-center md:items-start p-4 md:p-10 space-y-5">
            <div className="flex flex-row space-x-6 items-center">
              <span
                className={`text-lg font-bold text-center px-5 py-2 cursor-pointer rounded-xl transition duration-500 ease-in-out ${
                  isVisionVisible
                    ? "text-slate-800 bg-gray-200"
                    : "text-slate-400"
                }`}
                onClick={handleVisionClick}
              >
                Vision
              </span>
              <span
                className={`text-lg font-bold text-center px-5 py-2 cursor-pointer rounded-xl transition duration-500 ease-in-out ${
                  !isVisionVisible
                    ? "text-slate-800 bg-gray-200"
                    : "text-slate-400"
                }`}
                onClick={handleMissionClick}
              >
                Mission
              </span>
            </div>
            <p
              className={`text-md text-slate-700 text-justify leading-loose fade-in-faster ${
                isVisionVisible ? "" : "hidden"
              }`}
            >
              Our vision is to be a leading institution for academic excellence,
              making a positive difference in society. We strive to provide
              exceptional education, foster innovation, and empower individuals
              to reach their full potential. Through a commitment to excellence,
              creativity, and community engagement, we aim to shape future
              leaders who will contribute meaningfully to their fields and make
              a lasting impact on society.
            </p>
            <p
              className={`text-md text-slate-700 text-justify leading-loose fade-in-faster ${
                isVisionVisible ? "hidden" : ""
              }`}
            >
              Our mission is to provide transformative education that empowers
              individuals to succeed and make a positive impact. Through
              innovative teaching, inclusive learning environments, and
              practical skills development, we prepare students to thrive in
              their chosen paths. We foster a culture of curiosity,
              collaboration, and lifelong learning. With a commitment to
              excellence and societal engagement, we aim to shape tomorrow's
              leaders and contribute to a better future.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-20 md:mt-32">
        <h2 className="text-2xl text-slate-800 font-bold leading-relaxed mb-10">
          Services we offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col">
              <div
                className={`flex flex-col justify-center items-center space-y-3 text-slate-600 h-40 cursor-pointer bg-slate-100 rounded-2xl p-5 hover:bg-slate-200 transition duration-300 ease-in-out`}
              >
                <span className={`text-6xl ${service.color}`}>
                  {service.icon}
                </span>
                <span className="text-sm font-medium">{service.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center mt-20 md:mt-44">
        <h2 className="text-2xl text-white w-full justify-center flex rounded-lg bg-slate-800 font-bold leading-relaxed mb-10">
          Announcements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-x-32">
          {announcements.map((announcement, index) => (
            <div key={index}>
              <div className="flex flex-col space-y-5">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">{announcement.title}</h3>
                  <hr className="border-2 border-slate-100 rounded-lg" />
                </div>
                <p className="leading-relaxed text-justify">
                  {announcement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;
