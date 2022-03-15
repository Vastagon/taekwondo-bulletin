import {Image} from "cloudinary-react"

export default function EventCard(props){

    return(
        <div className="event-card">
            <h3 className="event-name">{`${props.item.eventName}`}</h3>
            <Image alt="Cannot find Image" className="event-image" cloud_name="dg9s57jo8" publicId={props.item.eventImg} />
            <p className="event-description">{props.item.eventDescription}</p>
            <p>{`Date: ${props.item.eventDate.toString()}`}</p>
            <p>{`Time: ${props.item.eventTime}`}</p>
            {props.item.eventSlots ? <p>{`Total Slots: ${props.item.eventSlots}`}</p>
            :
            <p>{`Total Slots: Unlimited`}</p>
            }
        </div>
    )
}