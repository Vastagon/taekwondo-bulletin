import {Image} from "cloudinary-react"
import { Link } from "react-router-dom";


export default function EventCard(props){
    return(
        <Link style={{ textDecoration: 'none' }} to={`/events/${props.item._id}`} state={{ data: props.item }}>
            <div className="event-card">
                <h3 className="event-name">{`${props.item.eventName}`}</h3>
                <Image alt="Cannot find Image" className="event-image" cloud_name="dg9s57jo8" publicId={props.item.eventImg} />
                <p className="event-description">{props.item.eventDescription}</p>
                <p>{`Register by: ${props?.item?.eventRegEndDate?.toString().substring(0,10)}`}</p>
                {/* <p>{`Starts at: ${props?.item?.eventStartDate?.toString().substring(0,10)}`}</p>
                <p>{`Ends at: ${props?.item?.eventEndDate?.toString().substring(0,10)}`}</p> */}
            </div>         
        </Link>
            
    )
}