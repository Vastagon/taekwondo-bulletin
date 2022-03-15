import {Image} from "cloudinary-react"


export default function EventCard(props){

    return(
        <div className="event-card">
            <h3 className="event-name">{`${props.item.eventName}`}</h3>
            <Image alt="Cannot find Image" className="event-image" cloud_name="dg9s57jo8" publicId={props.item.eventImg} />
            <p className="event-description">{props.item.eventDescription}</p>
            <p>{`Date: ${props.item.eventDate.toString()}`}</p>
            <p>{`Time: ${props.item.eventTime}`}</p>
            <p>{`Slots Left: ${props.item.eventSlots}`}</p>
        </div>
    )
}