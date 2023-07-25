import React from "react";
import ABOUTIMG1 from "../images/About1.png";
import ABOUTIMG2 from "../images/About2.png";
import PROFILE from "../images/profile.jpeg";
import adisa from '../images/staff/adisa.jpeg';
import makanju from '../images/staff/makanju.jpeg';
import olanrewaju from '../images/staff/olanrewaju.jpeg';
import olubodun from '../images/staff/olubodun.jpeg';

const team = [
  {
    name: "Abiodun ALAO",
    role: "Director ITeMS",
    image: PROFILE,
  },
  {
    name: "Rufus Olusoji ADISA",
    role: "Deputy Director",
    image: adisa,
  },
  {
    name: "Taofik Adewale MAKANJU",
    role: "Placeholder",
    image: makanju,
  },
  {
    name: "Ahmed Babajide OLANREWAJU",
    role: "Placeholder",
    image: olanrewaju,
  },
  {
    name: "Olorunfemi OLUBODUN",
    role: "Placeholder",
    image: olubodun,
  },
  {
    name: "Olawale Ebenezer AYENI",
    role: "Placeholder",
    image: PROFILE,
  },
];

const AboutPage = () => {
  return (
    <div className="px-8 py-8 lg:px-16 xl:px-20 pb-20">
      <div className="md:text-5xl text-3xl font-bold text-slate-900 flex justify-center md:mt-16 md:mb-32 mt-10 mb-10 md:w-2/3 text-center mx-auto flex-col">
        Training Research & Development
        <span className="text-sm text-center font-medium md:w-4/5 mx-auto text-slate-700 md:mt-5 mt-3">
          Empowering the University community through cutting-edge technology
          and knowledge sharing.
        </span>
      </div>

      <div>
        <div className="flex flex-col-reverse md:gap-y-0 gap-y-8 md:flex-row justify-center items-center space-y-5 md:space-y-0 md:space-x-20">
          <div className="w-full md:w-1/2">
            <div className="md:text-3xl text-xl md:mb-5 mb-3 font-bold text-gray-900">
              TRD and Tech Empowerment
            </div>
            <p className="text-justify leading-relaxed mb-3">
              We are a unit within the University of Ibadan's Directorate of
              Information Technology and Media Services. Our primary focus is to
              meet the IT needs of the University community through training and
              support. We aim to create an enabling environment for technology,
              while also serving as a convergence academy for IT and Telecoms
              training.
            </p>
            <p className="text-justify leading-relaxed">
              Our unit focuses on creating enabling environments for IT systems
              through training and meeting the IT training and development needs
              of the University community. We support teaching, learning,
              research, and administration by providing access to unique IT
              research resources, including live operational networks, test-beds
              for new technologies, tools, and services. Our center aims to
              become a leading convergence academy, offering world-class
              training for professionals in IT and Telecoms.
            </p>
          </div>
          <div className="w-full md:w-1/2 md:mb-0 md:mt-0">
            <img className="w-full rounded-lg" src={ABOUTIMG1} alt="About Image 1" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-5 md:space-y-0 md:space-x-20 mt-16 md:mt-32">
          <div className="w-full md:w-1/2">
            <img className="w-full rounded-lg" src={ABOUTIMG2} alt="About Image 2" />
          </div>
          <div className="w-full md:w-1/2">
            <div>
              <div className="mb-5 text-xl md:text-3xl font-bold">
                We are into the following services
              </div>
              <p className="mb-4 text-justify leading-relaxed">
                <strong>Specialized Workshops</strong>
                <br />
                Through our training workshops and seminars, we focus on
                providing future-ready technology skills to the participants.
                These include: LAMP, Linux & Unix Administration, Routing &
                Wireless, Networks, Image Processing: Graphics & Animation, Web
                Design & Graphics, ICT in Course Registration, Examination
                Preparation and Result Processing.
              </p>
              <p className="mb-4 text-justify leading-relaxed">
                <strong>IT & Computer Training</strong>
                <br />
                This helps members of the University and society learn how to
                use and implement ICT tools and technologies. We provide
                classroom training on the following:, Mail management, Learning,
                Management Module (LMS), Microsoft Excel, Microsoft Word,
                Microsoft Powerpoint, Data Processing, Desktop Publishing,
                Research Tools & Data Analysis (SPSS; STATA; R; CSPRO; EPIDATA;
                EPI INFO; SAS, etc.).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="md:text-4xl text-3xl font-extrabold text-center text-gray-900 mt-16 md:mt-32 mb-16">
          Our Team
        </div>
        <div className="flex items-center justify-center mb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <img
                  className="md:w-48 md:h-48 w-36 h-36 rounded-full object-cover"
                  src={member.image}
                  alt={member.name}
                />
                <div className="md:text-sm text-xs text-center text-gray-900 font-bold mt-2">
                  {member.name}
                </div>
                <div className="md:text-sm text-xs text-center text-gray-700 font-medium">
                  {member.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;