import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

function CourseDetails(props) {
  const { image, title, description, duration, className, onClose } = props;

  useEffect(() => {
    // Disable scrolling on the background when the modal is open
    document.body.style.overflow = "hidden";

    // Event listener for clicking outside the modal to close it
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-content")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Cleanup: Re-enable scrolling and remove the event listener
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 w-screen  p-10 ${className} fade-in-regular`}
    >
      <div className="fixed inset-0 bg-black opacity-30"></div>{" "}
      {/* Black overlay */}
      <div className="bg-white md:p-10 p-5 max-w-5xl rounded-lg relative w-full overflow-hidden">
        <div className="w-full justify-end flex">
          <IoMdClose
            className="md:text-3xl text-xl mb-3 md:mb-0 text-slate-800 cursor-pointer hover:text-red-600 transition duration-300 ease-in-out"
            onClick={onClose}
          />
        </div>
        <div className="flex justify-between md:flex-row flex-col">
          <div className="md:h-72 md:w-1/2 w-full h-32 md:mb-0 mb-5">
            {" "}
            <img
              src={image}
              alt="Course"
              className="w-full rounded-lg h-full object-cover object-top"
            />
          </div>

          <div className="flex flex-col items-start justify-center md:gap-5 gap-3 md:w-96 w-full">
            <span className="md:text-2xl text-lg font-bold text-slate-800">{title}</span>
            <p className="text-slate-500 md:text-base text-sm leading-6 tracking-wide">
              {description}
            </p>

            <span className="font-semibold text-sm md:text-base text-slate-700">
              Duration: {duration}
            </span>

            <button className="bg-blue-600 md:mt-0 mt-3 w-full md:w-max text-white px-10 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out">
              Enrol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
