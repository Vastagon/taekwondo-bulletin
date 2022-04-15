import { useLocation } from "react-router-dom";
import "../styles/TotalEventCardShown.css"
import Navbar from "./Navbar"

export default function({auth, info}){
    ///info is passed in from SetRoutes


    return(
    <>
        <Navbar auth={auth}/>

        <div className="total-event-card-shown">
            <h1>{info.eventName}</h1>
            <p>{`Event Starts at: ${info.eventStartDate.substring(0,10)}`}</p>
            <p>{`Event Ends at: ${info.eventEndDate.substring(0,10)}`}</p>

            <p>{`Event Registration Starts at: ${info.eventRegStartDate.substring(0,10)}`}</p>
            <p>{`Event Registration Ends at: ${info.eventRegEndDate.substring(0,10)}`}</p>

            <p>{`Organizer: ${info.eventOrganizer}`}</p>

            <p>{`Address: ${info.eventStreet}, ${info.eventCity}, ${info.eventState}, ${info.eventZip}`}</p>

            <p>{info.eventDescription}</p>
        </div>
    </>
    )
}