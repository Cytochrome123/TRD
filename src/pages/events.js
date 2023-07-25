import { useState } from "react";

import img from '../images/pic (4).png'

const Events = () => {

    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    // const filteredEvents = eventsData.filter((event) =>
    //     event.title.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    const tempEvents = [
        {
            title: 'Ibadan Startup Fest',
            date: '11-02-2045',
            description: "Cant think of one rn",
            location: 'Onlone'
        },
        {
            title: 'Ibadan Startup Fest',
            date: '11-02-2045',
            description: "Cant think of one rn",
            location: 'Onlone'
        },
        {
            title: 'Ibadan Startup Fest',
            date: '11-02-2045',
            description: "Cant think of one rn",
            location: 'Onlone'
        },
        {
            title: 'Ibadan Startup Fest',
            date: '11-02-2045',
            description: "Cant think of one rn",
            location: 'Onlone'
        },
    ]
    console.log(tempEvents)
    return (  
        <div className='flex items-center justify-center min-h-screen container mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {tempEvents.map((event, index) => (
                    <div key={index}>
                        <div className="rounded-xl shadow-lg">
                            <div className="p-2 flex flex-col">
                                <div className="rounded-xl overflow-hidden">
                                    <img src={img} />
                                </div>
                            </div>
                        </div>
                        <h5 className='text-1xl md:text-2xl font-small mt-3'>{event.title}</h5>
                    </div>
                ))}
            </div>
        </div>        
    )
}

export default Events;