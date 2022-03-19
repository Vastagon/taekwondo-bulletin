import { useLocation } from "react-router-dom";
import "../styles/TotalEventCardShown.css"

export default function(){
    const location = useLocation()
    const data = location.state?.data///Gets card data

    console.log(data)
    return(
        <div className="total-event-card-shown">
            <h1>{data.eventName}</h1>
            <p>{`Event Starts at: ${data.eventStartDate.substring(0,10)}`}</p>
            <p>{`Event Ends at: ${data.eventEndDate.substring(0,10)}`}</p>

            <p>{`Event Registration Starts at: ${data.eventRegStartDate.substring(0,10)}`}</p>
            <p>{`Event Registration Ends at: ${data.eventRegEndDate.substring(0,10)}`}</p>

            <p>{`Organizer: ${data.eventOrganizer}`}</p>

            <p>{`Address: ${data.eventStreet}, ${data.eventCity}, ${data.eventState}, ${data.eventZip}`}</p>

        </div>
    )
}