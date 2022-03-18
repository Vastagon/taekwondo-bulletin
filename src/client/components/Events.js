import EventCard from "./EventCard"
import {v4 as uuid} from "uuid"
import Navbar from "./Navbar"
import axios from "axios"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Events.css"

export default function Events(){
    const [eventCardInfo, setEventCardInfo] = useState()
    const [documentTitle, setDocumentTitle] = useState("Events")


///Gets data for events and sets the state of eventCardInfo
useEffect(() =>{
    axios.get("http://localhost:5000/eventsinfo")
    .then(res => setEventCardInfo(res))
    .catch(err => console.log(err))
}, [])

///maps event data to page
    const events = eventCardInfo?.data?.map(item =>{
        return(
            <EventCard 
              key = {uuid()}
              item = {item}
            />
        )
      })

///Navigate to new page
    let navigate = useNavigate()
    const createEventsRouteChange = () =>{
        let path = "/eventsCreatePage"
        navigate(path)
    }
    
if(!eventCardInfo) return null

    return(
        <div>
            <Navbar documentTitle={documentTitle}/>
            <button className="new-event-button" onClick={createEventsRouteChange} >New Event</button>
            <div className="event-list">
                {events}
            </div>
        </div>

    )
}