import React from "react";
import ABOUTIMG1 from "../images/About1.png";
import ABOUTIMG2 from "../images/About2.png";
import PROFILE from "../images/profile.jpeg";

import alao from "../images/staff/alao.jpeg";
import adisa from "../images/staff/adisa.jpeg";
import makanju from "../images/staff/makanju.jpeg";
import olanrewaju from "../images/staff/olanrewaju.jpeg";
import olubodun from "../images/staff/olubodun.jpeg";
import olusanya from "../images/staff/olusanya.jpg";
import afolabi from "../images/staff/afolabi.jpg";

const team = [
  {
    name: "Alao ABIODUN",
    role: "Director ITeMS",
    image: alao,
  },
  {
    name: "Rufus Olusoji ADISA",
    role: "Deputy Director",
    image: adisa,
  },
  {
    name: "Taofik Adewale MAKANJU",
    role: "Staff",
    image: makanju,
  },
  {
    name: "Ahmed Babajide OLANREWAJU",
    role: "Staff",
    image: olanrewaju,
  },
  {
    name: "Olorunfemi OLUBODUN",
    role: "Staff",
    image: olubodun,
  },
  {
    name: "Temitope OLUSANYA",
    role: "Secretary",
    image: olusanya,
  },
  {
    name: "Dolapo AFOLABI",
    role: "Secretary",
    image: afolabi,
  },
];

const AboutPage = () => {
  return (
    <div className="px-8 py-8 pb-20 my-10 lg:px-16 xl:px-20">
      <div className="flex flex-col justify-center mx-auto mt-10 mb-10 text-3xl font-bold text-center md:text-5xl text-slate-900 md:mt-16 md:mb-32 md:w-2/3">
        Training Research & Development
        <span className="mx-auto mt-3 text-sm font-medium text-center md:w-4/5 text-slate-700 md:mt-5">
          Empowering the University community through cutting-edge technology
          and knowledge sharing.
        </span>
      </div>

      <div>
        <div className="flex flex-col-reverse items-center justify-center space-y-5 md:gap-y-0 gap-y-8 md:flex-row md:space-y-0 md:space-x-20">
          <div className="w-full md:w-1/2">
            <div className="mb-3 text-xl font-bold text-gray-900 md:text-3xl md:mb-5">
              TRAINING RESEARCH & DEVELOPMENT
            </div>
            <p className="mb-3 leading-relaxed text-justify">
              Training, Research and Development (TRD) is a department within
              the Directorate of Information Technology and Media Services. We
              support teaching, learning, research and administration by
              providing access to unique IT research resources such as live
              operational networks and services, and test-beds for new
              technologies, tools and services. We are committed to providing
              the public with future-ready technology skills in line with the
              University&apos;s vision of being a world-class institution for
              academic excellence geared towards meeting societal needs. TRD is
              set to be a convergence academy for world class training of
              professionals in IT and telecoms.
            </p>
            <p className="leading-relaxed text-justify">
              We are dedicated to equipping you with knowledge and expertise
              needed to thrive in this dynamic landscape.
            </p>
          </div>
          <div className="w-full md:w-1/2 md:mb-0 md:mt-0">
            <img
              className="w-full rounded-lg"
              src={ABOUTIMG1}
              alt="About Image 1"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-16 space-y-5 md:flex-row md:space-y-0 md:space-x-20 md:mt-32">
          <div className="w-full md:w-1/2">
            <img
              className="w-full rounded-lg"
              src={ABOUTIMG2}
              alt="About Image 2"
            />
          </div>
          <div className="w-full md:w-1/2">
            <div>
              <div className="mb-5 text-xl font-bold md:text-3xl">
                We are into the following services
              </div>
              <p className="mb-4 leading-relaxed text-justify">
                <strong>Specialized Workshops</strong>
                <br />
                Through our training workshops and seminars, we focus on
                providing future-ready technology skills to the participants.
                These include: LAMP, Linux & Unix Administration, Routing &
                Wireless, Networks, Image Processing: Graphics & Animation, Web
                Design & Graphics, ICT in Course Registration, Examination
                Preparation and Result Processing.
              </p>
              <p className="mb-4 leading-relaxed text-justify">
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
        <div className="mt-16 mb-16 text-3xl font-extrabold text-center text-gray-900 md:text-4xl md:mt-32">
          Our Team
        </div>
        <div className="flex items-center justify-center mb-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <img
                  className="object-cover rounded-full md:w-48 md:h-48 w-36 h-36"
                  src={member.image}
                  alt={member.name}
                />
                <div className="mt-2 text-xs font-bold text-center text-gray-900 md:text-sm">
                  {member.name}
                </div>
                <div className="text-xs font-medium text-center text-gray-700 md:text-sm">
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
