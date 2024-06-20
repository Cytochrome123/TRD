import React, { useState } from "react";
import HEROIMG from "../images/building.png";
import VISION from "../images/vision.svg";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import { MdOutlineComputer } from "react-icons/md";
import { AiOutlineDatabase } from "react-icons/ai";
import { SiMicrosoftacademic } from "react-icons/si";


const getStatusColor = (status) => {

  switch (status) {
    case 0:
      return 'yellow';
    case 1:
      return '#f5a0a0';
    case 2:
      return '#f5f4a0';
    case 3:
      return '#a0f5b5';
    case 4:
      return '#a299f3';
    case 5:
      return '#eec1eae8';
    default:
      return 'gray';
  }
 
};




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
  {
    name: "Plagiarism Prevention Clinic",
    description: "understanding the use of Turnitin.",
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
    title: " ArcGIS",
    description:
      "'Details to be released soon...",
  },
  {
    title: " DPT School",
    description:
      "Details to be released soon...",
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
    <div>
      <div className="px-8 py-8 pb-20 my-24 lg:px-16 xl:px-20 lg:my-12">
        <div className="flex flex-col items-center justify-center mt-3 space-y-8 md:flex-row md:mt-16 md:space-y-0 md:space-x-20">
          <div className="flex flex-col items-center w-full md:items-start md:w-1/2 space-y-7">
            <div className="flex flex-col space-y-3">
              <h1 className="text-2xl font-bold text-center md:text-2xl text-slate-800 md:leading-relaxed md:text-left">
                Welcome to Training Research and Development (TRD) &ndash; University of
                Ibadan ICT Training Center
              </h1>
              <p className="text-sm leading-relaxed text-center md:text-lg text-slate-800 md:text-justify">
                At our state-of-the-art facility, we conduct trainings and
                development programmes to empower individuals and organisations
                with the knowledge and skills required to thrive in the dynamic
                landscape due to advancements in Technology. With our experienced
                instructors, you will find a supportive and stimulating
                environment that encourages exploration and creativity.<br/> Join us on
                this exciting odyssey.
              </p>
            </div>
            <button className="py-3 font-bold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg px-7 hover:bg-blue-400">
              <a href="/auth/signup">Sign Up</a>
            </button>
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <img className="mx-auto rounded-lg" src={HEROIMG} alt="hero" />
          </div>
        </div>

        <div className="flex flex-col items-center mt-20 md:mt-28">
          <h2 className="mb-10 text-2xl font-bold leading-relaxed text-slate-800">
            What We Offer
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
            {courses.map((course, index) => (
              <div key={index} className="flex flex-col" style={{background:`${getStatusColor(index)}`}} >
                <a href="#" className="flex flex-col items-stretch">
                  <div className="flex flex-col items-start justify-start h-40 p-5 space-y-3 transition duration-300 ease-in-out border-2 cursor-pointer border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-100 hover:transform hover:scale-105">
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
              className="flex justify-center col-span-1 py-3 font-bold text-white align-middle transition duration-300 ease-in-out bg-blue-600 rounded-lg px-7 hover:bg-blue-400"
            >
              <button>View all our courses</button>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center mt-20 md:mt-24">
          <h2 className="mb-10 text-2xl font-bold leading-relaxed text-slate-800">
            {isVisionVisible ? "Our Vision" : "Our Mission"}
          </h2>

          <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-16">
            <img
              src={VISION}
              className="w-full rounded-lg md:w-2/5"
              alt="vision"
            />
            <div className="flex flex-col items-center w-full p-4 space-y-5 md:items-start md:p-10">
              <div className="flex flex-row space-x-6">
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
                To be a center of excellence for Information Technology and Media
                training, research and development in line with the University's
                Vision and Mission.
              </p>
              {/* <p
                className={`text-md text-slate-700 text-justify leading-loose fade-in-faster ${
                  isVisionVisible ? "hidden" : ""
                }`}
              > */}
                <ul 
                  className={`list-disc text-md text-slate-700 text-justify leading-loose fade-in-faster ${
                    isVisionVisible ? "hidden" : ""
                  }`}
              >
                  <li>To provide world-class IT and Media literacy to support excellent teaching, learning,  and administration in the University and beyond</li>
                  <li>To conduct research on regular basis on information technology and media issues.</li>
                  <li>To run IT trainings with end-time certification. </li>
                  <li>To offer end-user IT education, support and consultancy.</li>
                </ul>
              {/* </p> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-20 md:mt-22">
          <h2 className="mb-10 text-2xl font-bold leading-relaxed text-slate-800">
            Services we offer
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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

        <div className="flex flex-col items-center mt-20 md:mt-24">
          <h2 className="flex justify-center w-full mb-10 text-2xl font-bold leading-relaxed text-white rounded-lg bg-slate-800">
            Announcements
          </h2>

          <marquee className=" w-[50%] mb-4 -mt-5 font-semibold text-lg italic" behavior="alternate" direction="right">Upcoming</marquee>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 md:gap-x-32">
            {announcements.map((announcement, index) => (
              <div key={index}>
                <div className="flex flex-col space-y-5">
                  {/* <h2>Up coming</h2> */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold">{announcement.title}</h3>
                    <hr className="border-2 rounded-lg border-slate-100" />
                  </div>
                  <p className="italic leading-relaxed text-justify">
                    {announcement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
