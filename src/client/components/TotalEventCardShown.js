import { useLocation } from "react-router-dom";
import "../styles/TotalEventCardShown.css"

export default function(){
    const location = useLocation()
    const data = location.state?.data///Gets card data

    console.log(data)
    return(
        <div className="total-event-card-shown">
            <h1>{data.eventName}</h1>
            <p>{`Event Starts at: ${data.eventStartDate}`}</p>
            <p>{`Event Ends at: ${data.eventEndDate}`}</p>

            <p>{`Event Registration Starts at: ${data.eventRegStartDate}`}</p>
            <p>{`Event Registration Ends at: ${data.eventRegEndDate}`}</p>

            <p>{`Organizer: ${data.eventOrganizer}`}</p>

            <p>{`Address: ${data.eventEndDate}`}</p>

        </div>
    )
}