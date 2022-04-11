import EventCard from "./EventCard"
import {v4 as uuid} from "uuid"
import Navbar from "./Navbar"
import axios from "axios"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import states from "./tagSearchStates.json"
import Select from "react-select"
import "../styles/Events.css"

export default function Events({auth, dataURL}){
    const [eventCardInfo, setEventCardInfo] = useState()
    const [documentTitle, setDocumentTitle] = useState("Events")
    const [stateTagSearch, setStateTagSearch] = useState()
    const abortCont = new AbortController()
    let counter = 0;

///Gets data for events and sets the state of eventCardInfo
useEffect(() =>{
    axios.get(`${dataURL}/eventsinfo`, {signal: abortCont.signal})
    .then(res => setEventCardInfo(res))
    .catch(err => console.log(err))

    return () => abortCont.abort()
}, [])

    ///maps event data to page
    const events = eventCardInfo?.data?.map(item =>{
        ///Shows all events
        if(stateTagSearch == undefined || stateTagSearch.label == "All Events"){
            counter++
            return(
                <EventCard 
                key = {uuid()}
                item = {item}
                />
            )            
        }
        ///Shows events that are with the correct state tag
        if(stateTagSearch && item.eventState == stateTagSearch.label){
            counter++
            return(
                <EventCard 
                key = {uuid()}
                item = {item}
                />
            )            
        }else{
            ///Shows no events because there are no states
            return null
        }

      })

    ///Navigate to new page
    let navigate = useNavigate()
    const createEventsRouteChange = () =>{
        let path = "/eventsCreatePage"
        navigate(path)
    }
    
///Makes loading look better
if(!eventCardInfo) return null

    return(
        <div>
            <Navbar dataURL={dataURL} auth={auth} documentTitle={documentTitle}/>
            <div className="events-tag-search">
                <Select className="state-tag-dropdown" placeholder="State" onChange={setStateTagSearch} options={states} />
                <button className="new-event-button" onClick={createEventsRouteChange} >New Event</button>
            </div>
            <div className="event-list">
                {counter > 0 ? events : <p className="no-events-text">No events in this state</p>}
            </div>
        </div>

    )
}