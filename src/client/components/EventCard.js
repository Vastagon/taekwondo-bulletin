import axios from "axios"
import {useState, useEffect} from "react"

export default function EventCard(props){
    const [eventCardInfo, setEventCardInfo] = useState({eventName: "",eventDescription: "",eventTime: ""})

    useEffect(() =>{
        axios.get("http://localhost:5000/eventsinfo")
        .then(res => setEventCardInfo(res))
    }, [])

    console.log(eventCardInfo.data)
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

///eventCardInfo.data[0]?.eventName