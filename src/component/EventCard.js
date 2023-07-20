import img from '../image/pic (4).png'

const EventCard = ({title, date, description, loaction}) => {
    return (
        <div>
            <div className="rounded-xl shadow-lg">
                <div className="p-2 flex flex-col">
                    <div className="rounded-xl overflow-hidden">
                        <img src={img} />
                    </div>
                </div>
            </div>
            <h5 className='text-1xl md:text-2xl font-small mt-3'>{title}</h5>
        </div>
    )
}

export default EventCard;