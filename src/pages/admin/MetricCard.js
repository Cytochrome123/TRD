import React from "react";
import { useNavigate } from "react-router-dom";




const MetricCard = ({colour, caption, number}) => {

  const navigate = useNavigate();

  const handleClick = () => {

  }

    // const color = {colour};
    // console.log( colour);
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 p-6">
      <div className={`bg-gradient-to-b from-${colour}-200 to-pink-100 border-b-4 border-${colour}-500 rounded-lg shadow-xl p-5`}>
        <div className="flex flex-row items-center">
          <div className="flex-shrink pr-4">
            <div onClick={() => navigate(`/admin/${caption}s`)} className={`rounded-full p-5 bg-${colour}-500 cursor-pointer font-medium uppercase text-gray-200`}>
              View all
            </div >
          </div>
          <div className="flex-1 text-right md:text-center">
            <h2 className="font-bold uppercase text-gray-600">{caption}</h2>
            <p className="font-bold text-3xl">
              {number}{" "}
              <span className="text-pink-500">
                <i className="fas fa-exchange-alt"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
