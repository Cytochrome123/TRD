import { useState } from "react";

import EventCard from "../component/EventCard";

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
        <div className="container mx-auto">
            <div className="my-8">
                <input
                    type="text"
                    className="px-4 py-2 border rounded-md w-64"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md"
                    onClick={() => setSearchQuery('')}
                >
                    Clear
                </button>
            </div>
            <div className='flex items-center justify-center min-h-screen'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {tempEvents.map((event, index) => (
                        <EventCard 
                            key={index}
                            title={event.title} 
                            date={event.date}
                            description={event.description}
                            location={event.location}
                        />
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export default Events;