

export default function EventCard(props){

    return(
        <div className="event-card">
            {/* <img className="event-picture" src={props.item.img} /> */}
            <h3>{`${props.item.eventName}`}</h3>
            <p>{props.item.eventDescription}</p>
            {/* <p>{`Date: ${props.item.eventDate}`}</p> */}
            <p>{`Time: ${props.item.eventTime}`}</p>
            <p>{`Slots Left: ${props.item.eventSlots}`}</p>
        </div>
    )
}