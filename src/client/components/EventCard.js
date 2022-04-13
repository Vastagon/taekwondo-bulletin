import {Image} from "cloudinary-react"
import { Link } from "react-router-dom";


export default function EventCard(props){
    ///Maybe use later
    let temp = props.item.eventName.replace(/ /g, "%")

    return(
        <Link className="single-card-link" to={`/events/${props.item._id}`} state={{ data: props.item }}>
            <div className="event-card">
                <h3 className="event-name">{`${props.item.eventName}`}</h3>
                <Image alt="Cannot find Image" className="event-image-eventspage" cloud_name="dg9s57jo8" publicId={props.item.eventImg} />
                <div className="event-description">
                    <p style={{marginTop: 0}}>{props.item.eventDescription}</p>
                </div>
                <div className="bottom-card">
                    <p className="event-register">{`Register by: ${props?.item?.eventRegEndDate?.toString().substring(0,10)}`}</p>
                    <p className="event-state">State: {props?.item?.eventState}</p>
                </div>
            </div>         
        </Link>   
    )
}