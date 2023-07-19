import img from '../image/pic (4).png'

const EventCard = ({title, date, description, loaction}) => {
    console.log(title, 'title')
    return (
        <div className="rounded-xl shadow-lg">
            <div className="p-5 flex flex-col">
                <div className="rounded-xl overflow-hidden">
                    <img src={img}/>
                </div>
                <h5 className='text-2xl md:text-3xl font-medium mt-3'>{title}</h5>
                <p className='text-slate-500 text-lg mt-3'>{description}</p>
                <a href='#' className='text-center bg-blue-400 text-blue-700 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-300 focus:scale-95 transition-all duration-200 ease-in'>View</a>
            </div>
        </div>
    )
}

export default EventCard;