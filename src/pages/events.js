import { useState } from "react";
import img1 from "../images/events/tech-odyssey/img1.png";
import img2 from "../images/events/tech-odyssey/img2.png";
import img3 from "../images/events/tech-odyssey/img3.png";
import img4 from "../images/events/tech-odyssey/img4.png";
import img1_1 from "../images/events/dpt/img1.png";
import img1_2 from "../images/events/dpt/img2.png";
import img1_3 from "../images/events/dpt/img3.png";
import img1_4 from "../images/events/dpt/img4.png";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const techOdyssey = [
    {
      img: img1,
      description: "Technical workshop session",
    },
    {
      img: img2,
      description: "Practical session using the CLI",
    },
    {
      img: img3,
      description: "Tour in the server room",
    },
    {
      img: img4,
      description: "Typing training session",
    },
  ];

  const digitalProductivity = [
    {
      img: img1_1,
      description: "Technical workshop session",
    },
    {
      img: img1_2,
      description: "Technical workshop session",
    },
    {
      img: img1_3,
      description: "Technical workshop session",
    },
    {
      img: img1_4,
      description: "Technical workshop session",
    },
  ];

  return (
    <div className="px-8 py-8 lg:px-16 xl:px-20 pb-20">
      <h2 className="text-2xl md:text-5xl w-full text-slate-900 flex justify-center font-bold mt-10 md:mt-16">
        Events & Campaigns
      </h2>
      <div className="mt-10">
        <div className="flex flex-col space-y-3 mt-10">
          <span className="text-2xl text-slate-800 font-bold">Tech Odyssey</span>
          <span className="text-md text-slate-600">
            Tech Odyssey is an annual technology conference that brings together
            experts and enthusiasts from various tech industries. It offers
            insightful presentations, workshops, and networking opportunities.
            Topics include AI, blockchain, cybersecurity, data science, cloud
            computing, and more. Join us to explore the latest tech trends and
            innovations, connect with industry leaders, and shape the future of
            technology
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10">
          {techOdyssey.map((event, index) => (
            <div key={index} className="mt-14">
              <div className="col-span-1 w-full h-72">
                <img
                  src={event.img}
                  alt="event"
                  className="w-full h-full object-cover"
                />
                <div className="text-sm mt-2">{event.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-24">
        <div className="flex flex-col space-y-3 mt-10">
          <span className="text-2xl text-slate-800 font-bold">
            Digital Productivity Training
          </span>
          <span className="text-md text-slate-600">
            Boost your productivity in the digital age with our hands-on
            training. Learn essential skills, time management techniques, and
            digital tools to streamline workflows and achieve optimal results.
            Join us for a transformative experience and unlock your full
            potential in today's fast-paced digital landscape.
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10">
          {digitalProductivity.map((event, index) => (
            <div key={index} className="mt-14">
              <div className="col-span-1 w-full h-72">
                <img
                  src={event.img}
                  alt="event"
                  className="w-full h-full object-cover"
                />
                <div className="text-sm mt-2">{event.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
