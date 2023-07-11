import React from "react";

const MetricCard = ({colour, caption, number}) => {

    // const color = {colour};
    // console.log( colour);
  return (
    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
      <div class={`bg-gradient-to-b from-${colour}-200 to-pink-100 border-b-4 border-${colour}-500 rounded-lg shadow-xl p-5`}>
        <div class="flex flex-row items-center">
          <div class="flex-shrink pr-4">
            <div class={`rounded-full p-5 bg-${colour}-500 cursor-pointer font-medium uppercase text-gray-200`}>
              View all
            </div>
          </div>
          <div class="flex-1 text-right md:text-center">
            <h2 class="font-bold uppercase text-gray-600">{caption}</h2>
            <p class="font-bold text-3xl">
              {number}{" "}
              <span class="text-pink-500">
                <i class="fas fa-exchange-alt"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
