import EventCard from "./EventCard"
import data from "./data"
import Navbar from "./Navbar"

export default function Events(){
    const events = data.map(item =>{
        return(
            <EventCard 
              key = {item.id}
              item = {item}
            />
        )
      })

    return(
        <div>
            <Navbar />
            <div className="event-list">
                {events}
            </div>
        </div>

    )
}