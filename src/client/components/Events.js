import EventCard from "./EventCard"
import {v4 as uuid} from "uuid"
import Navbar from "./Navbar"
import axios from "axios"
import {useState, useEffect, Component} from "react"
import { useNavigate } from "react-router-dom"

export default function Events(){
    const [cloudImage, setCloudImage] = useState()
    const [eventCardInfo, setEventCardInfo] = useState()


///Gets data for events and sets the state of eventCardInfo
useEffect(() =>{
    axios.get("http://localhost:5000/eventsinfo")
    .then(res => setEventCardInfo(res))
    .catch(err => console.log(err))
}, [])

console.log(eventCardInfo)


    useEffect(() =>{
        axios.get("https://res.cloudinary.com/dg9s57jo8/image/upload/v1646993370/sample_image.png")
        .then(res => setCloudImage(res))
        .catch(err => console.log(err))
    },[])


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
    // console.log(cloudImage)
    return(
        <div>
            <Navbar />
            <button className="new-event-button" onClick={createEventsRouteChange} >New Event</button>
            <div className="event-list">
                {events}
            </div>
            {/* <img src="https://res.cloudinary.com/dg9s57jo8/image/upload/v1646993370/sample_image.png" /> */}
        </div>

    )
}