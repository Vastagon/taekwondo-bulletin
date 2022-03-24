import {Image} from "cloudinary-react"
import { Link } from "react-router-dom";


export default function EventCard(props){
    return(
        <Link className="single-card-link" to={`/events/${props.item._id}`} state={{ data: props.item }}>
            <div className="event-card">
                <h3 className="event-name">{`${props.item.eventName}`}</h3>
                <Image alt="Cannot find Image" className="event-image-eventspage" cloud_name="dg9s57jo8" publicId={props.item.eventImg} />
                <p className="event-description">{props.item.eventDescription}</p>
                <p>{`Register by: ${props?.item?.eventRegEndDate?.toString().substring(0,10)}`}</p>
                <p>State: {props?.item?.eventState}</p>
            </div>         
        </Link>   
    )
}