export default function EventCard(props){
    return(
        <div className="event-card">
            <img className="event-picture" src={props.item.img} />
            <h3>{`${props.item.name}`}</h3>
            <p>{`Date: ${props.item.date}`}</p>
            <p>{`Time: ${props.item.time}`}</p>
            <p>{`Slots Left: ${props.item.slots}`}</p>
        </div>
    )
}