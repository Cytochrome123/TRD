import course_img from '../../images/trd_img.png'

const StudentDetail = () => {
    return (
        <div>
            <div className='flex flex-col items-center justify-center gap-6 p-20 mb-32 profile-bg'>
                <img className='object-cover w-40 h-40 mr-4 rounded-lg' src={course_img} alt="course_img" />
                <h2 className='text-3xl'>Ismmail Suhayl</h2>
            </div>
            <div className="flex items-start w-3/4 gap-12 mx-auto">
                <section className="w-3/4">
                    <div className="mb-10 bg-white rounded-lg shadow-md">
                        <h2>About me</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum omnis sint, voluptas ab similique
                            sit provident temporibus quisquam eligendi ad odit recusandae aliquam voluptates cum, neque, ipsam
                            hic voluptatem dolorem! Deserunt, cumque inventore laborum animi temporibus magnam voluptas aperiam
                            explicabo quam!
                        </p>
                    </div>
                    <div className="p-5 bg-white rounded-lg shadow-md">
                        <h2 className='pl-10 mb-6 text-3xl text-blue-950'>Courses</h2>
                        <div className="grid grid-cols-2 gap-8 pl-10 courses gap-y-10">
                            <div className="h-auto max-w-lg p-6 shadow-lg w-max rounded-xl bg-gray-50 profile">
                                <div className="overflow-hidden rounded-xl h-72">
                                    <img src={course_img} alt="course_img" />
                                </div>
                                <div className="flex items-center justify-between c">
                                    <div className='flex items-center mt-6 instructor'>
                                        <img className='object-cover w-16 h-16 mr-4 rounded-full' src={course_img} alt="course_img" />
                                        <div>
                                            <h3 className='text-xl'>Ismail</h3>
                                            <p>Instructor</p>

                                        </div>
                                    </div>
                                    <div className='fav'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                        </svg>

                                    </div>
                                </div>
                                <h2 className="mt-6 text-3xl text-blue-500 title">Intro to JavaScript</h2>
                                <div className="flex justify-between mt-6 text-lg details">
                                    <div>O Lessons</div>
                                    <div>7hrs</div>
                                </div>
                                <hr />
                                <div className="mt-6 ratings">
                                    @@@@@@ 4.0 (1)
                                </div>
                            </div>

                            <div className="h-auto max-w-lg p-6 shadow-lg w-max rounded-xl bg-gray-50 profile">
                                <div className="overflow-hidden rounded-xl img h-72">
                                    <img src={course_img} alt="course_img" />
                                </div>
                                <div className="flex items-center justify-between c">
                                    <div className='flex items-center mt-6 instructor'>
                                        <img className='object-cover w-16 h-16 mr-4 rounded-full' src={course_img} alt="course_img" />
                                        <div>
                                            <h3 className='text-xl'>Ismail</h3>
                                            <p>Instructor</p>

                                        </div>
                                    </div>
                                    <div className='fav'>@</div>
                                </div>
                                <h2 className="mt-6 text-3xl text-blue-500 title">Intro to JavaScript</h2>
                                <div className="flex justify-between mt-6 text-lg details">
                                    <div>O Lessons</div>
                                    <div>7hrs</div>
                                </div>
                                <hr />
                                <div className="mt-6 ratings">
                                    @@@@@@ 4.0 (1)
                                </div>
                            </div>

                            <div className="h-auto p-6 shadow-lg rounded-xl bg-gray-50 profile w-96">
                                <div className="overflow-hidden rounded-xl img h-72">
                                    <img src={course_img} alt="course_img" />
                                </div>
                                <div className="flex items-center justify-between c">
                                    <div className='flex items-center mt-6 instructor'>
                                        <img className='object-cover w-16 h-16 mr-4 rounded-full' src={course_img} alt="course_img" />
                                        <div>
                                            <h3 className='text-xl'>Ismail</h3>
                                            <p>Instructor</p>

                                        </div>
                                    </div>
                                    <div className='fav'>@</div>
                                </div>
                                <h2 className="mt-6 text-3xl text-blue-500 title">Intro to JavaScript</h2>
                                <div className="flex justify-between mt-6 text-lg details">
                                    <div>O Lessons</div>
                                    <div>7hrs</div>
                                </div>
                                <hr />
                                <div className="mt-6 ratings">
                                    @@@@@@ 4.0 (1)
                                </div>
                            </div>

                            <div className="h-auto p-6 shadow-lg rounded-xl bg-gray-50 profile w-96">
                                <div className="overflow-hidden rounded-xl img h-72">
                                    <img src={course_img} alt="course_img" />
                                </div>
                                <div className="flex items-center justify-between c">
                                    <div className='flex items-center mt-6 instructor'>
                                        <img className='object-cover w-16 h-16 mr-4 rounded-full' src={course_img} alt="course_img" />
                                        <div>
                                            <h3 className='text-xl'>Ismail</h3>
                                            <p>Instructor</p>

                                        </div>
                                    </div>
                                    <div className='fav'>@</div>
                                </div>
                                <h2 className="mt-6 text-3xl text-blue-500 title">Intro to JavaScript</h2>
                                <div className="flex justify-between mt-6 text-lg details">
                                    <div>O Lessons</div>
                                    <div>7hrs</div>
                                </div>
                                <hr />
                                <div className="mt-6 ratings">
                                    @@@@@@ 4.0 (1)
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="sticky top-0 w-1/4 bg-white rounded-lg shadow-md">
                    <div className='p-10'>
                        <h2 className='mb-10 text-3xl text-blue-950'>Contact Details</h2>
                        <div className='flex items-center mb-6'>
                            <div className='object-cover w-16 h-16 mr-4 bg-blue-400 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="inline-block object-contain w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <div>
                                <h2 className='text-2xl'>Email</h2>
                                <p>su@gmail.com</p>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <div className='object-cover w-16 h-16 mr-4 bg-blue-400 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className='text-2xl'>Phone</h2>
                                <p>+23490543534645</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default StudentDetail;