import React from 'react'
import Staff from "../component/Staff";


const AboutPage = () => {
    const images = ['https://trd-items.vercel.app/assets/images/slides/Slide3.png',

    'https://trd-items.vercel.app/assets/images/slides/Slide5.png', 

    'https://trd-items.vercel.app/assets/images/slides/Slide1.png'
]



    const [currentImage, setCurrentImage] = React.useState(0);

    const refs = images.reduce((acc, val, i) => {
      acc[i] = React.createRef();
      return acc;
    }, {});
  
    const scrollToImage = i => {
      setCurrentImage(i);
     
      refs[i].current.scrollIntoView({
        //     Defines the transition animation.
        behavior: 'smooth',
        //      Defines vertical alignment.
        block: 'nearest',
        //      Defines horizontal alignment.
        inline: 'start',
      });
    };
  
    const totalImages = images.length;
  
    const nextImage = () => {
      if (currentImage >= totalImages - 1) {
        scrollToImage(0);
      } else {
        scrollToImage(currentImage + 1);
      };
    };
  
    const previousImage = () => {
      if (currentImage === 0) {
        scrollToImage(totalImages - 1);
      } else {
        scrollToImage(currentImage - 1);
      };
    };
  
    const arrowStyle =
      'absolute text-white text-2xl z-10 bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center';
  
    
    const sliderControl = isLeft => (
      <button
        type="button"
        onClick={isLeft ? previousImage : nextImage}
        className={`${arrowStyle} ${isLeft ? 'left-2' : 'right-2'}`}
        style={{ top: '40%' }}
      >
        <span role="img" aria-label={`Arrow ${isLeft ? 'left' : 'right'}`}>
          {isLeft ? '◀' : '▶'}
        </span>
      </button>
    );
  
    return (
        <div className='w-screen flex justify-center'>
            


            <section className="bg-white dark:bg-gray-900">
                
                <div className="w-screen flex justify-center">
                    {/* <div style={{backgroundImage:`url(${slides[0].url})`}} className='w-full h-full rounded-2xl bg-center bg-cover duration-500'>
                    </div> */}
                    <div  className='w-screen flex justify-center' >
                                <div className="p-12 flex justify-center w-screen md:w-1/2 items-center">
                            <div className="relative w-full">
                                <div className="carousel">
                                {sliderControl(true)}
                                {images.map((img, i) => (
                                    <div className="w-full flex-shrink-0" key={img} ref={refs[i]}>
                                    <img src={img} className="w-full object-contain" />
                                    </div>
                                ))};
                                {sliderControl()}
                                </div>
                            </div>
                            </div>
                            </div>
                                              
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

                {/* staff */}
                <div className='grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4'>

                    < Staff/>
                    < Staff/>
                    < Staff/>
                    < Staff/>
                    < Staff/>
                </div>
            </section>
        </div>
    );
};

export default AboutPage