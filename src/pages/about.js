import React from 'react'
// import { Carousel } from "@material-tailwind/react";
// import MyImage from "./Images"
// import { BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs";
// import {Cover} from "../img/About1.png";
// import Img from "./Images/About.png";

const AboutPage = () => {

    const slides = [
        {
            url: 'https://trd-items.vercel.app/assets/images/slides/Slide3.png'
        },
        {
            url: 'https://trd-items.vercel.app/assets/images/slides/Slide5.png'
        },
        {
            url: 'https://trd-items.vercel.app/assets/images/slides/Slide1.png'
        },
        
    ]
// console.log(Cover, Img);
    return (
        <div className='max-w-[1400px] h-[780] w-full m-auto py-4 relative'>
            


            <section className="bg-white dark:bg-gray-900">
                
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    {/* <div style={{backgroundImage:`url(${slides[0].url})`}} className='w-full h-full rounded-2xl bg-center bg-cover duration-500'>
                    </div> */}
                                                {/* <Carousel
                                className="rounded-xl"
                                navigation={({ setActiveIndex, activeIndex, length }) => (
                                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                                    {new Array(length).fill("").map((_, i) => (
                                        <span
                                        key={i}
                                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                            activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
                                        }`}
                                        onClick={() => setActiveIndex(i)}
                                        />
                                    ))}
                                    </div>
                                )}
                                >
                                <img
                                    src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                                    alt="image 1"
                                    className="h-full w-full object-cover"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                                    alt="image 2"
                                    className="h-full w-full object-cover"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                                    alt="image 3"
                                    className="h-full w-full object-cover"
                                />
                                </Carousel> */}
                    
                </div>

                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Training, Research and Development (TRD)</h2>
                        <p className="mb-4">is a unit of the Directorate of Information Technology and Media Services. The unit was an offshoot of re-organization process that took place in the Information Technology System of the University of Ibadan late in the year 2012. The operations of the University Computing Center then fell under Training, Research and Development unit.</p>
                        <p>The unit efforts have been geared towards provision of enabling environments for IT systems through training, making provision to meet IT training and development needs of the University community in support of teaching, learning, research and administration. TRD also provides sharing of unique IT research resources (live operational networks and services, test-beds for new technologies, tools and services). The centre is set to be a convergence academy for world class training for professionals on IT and Telecoms.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-8 lg:max-w-sm ">
                        {/* <img src="" alt="" /> */}
                        <img className="w-full rounded-lg" src="https://trd-items.vercel.app/assets/images/About1.png" />
                        {/* <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" /> */}
                    </div>
                    
                </div>
                <div className=" items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-20">
                    <div className="grid grid-cols-1 gap-4 mt-8 lg:max-w-sm">
                        <img className="w-full rounded-lg"  src="https://trd-items.vercel.app/assets/images/About2.png" alt="office content 1" />
                        {/* <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" /> */}
                    </div>
                    <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">We are into the following Services</h2>
                        <p className="mb-4"><strong>Specialized Workshops</strong>
Through our training workshops and seminars, we focus on providing future-ready technology skills to the participants. These include: LAMP, Linux & Unix Administration, Routing & Wireless, Networks, Image Processing: Graphics & Animation, Web Design & Graphics, ICT in Course Registration, Examination Preparation and Result Processing.</p>
                        <p><strong>IT & Computer Training</strong>
This helps members of the University and society learn how to use and implement ICT tools and technologies. We provide classroom training on the following:, Mail management, Learning, Management Module (LMS), Microsoft Excel, Microsoft Word, Microsoft Powerpoint, Data Processing, Desktop Publishing, Research Tools & Data Analysis (SPSS; STATA; R; CSPRO; EPIDATA; EPI INFO; SAS, etc.).</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage