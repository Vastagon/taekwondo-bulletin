import Navbar from "./Navbar"
import "../styles/EventsCreatePage.css"
import "react-datepicker/dist/react-datepicker.css";
import {useState, useEffect} from "react"
import {useDropzone} from "react-dropzone"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import DatePicker from "react-datepicker"
import states from "./states.json"
import Select from "react-select"

export default function EventsCreatePage({dataURL, auth}){
    const [eventFormInfo, setEventFormInfo] = useState({eventName:"",eventDescription:"", eventDate:new Date(), 
    eventImg:Math.random(0,20)+ new Date(), eventStreet: "", eventCity: "", eventState:""})
    let navigate = useNavigate();
    const abortCont = new AbortController()

    let formData = new FormData()
    const [droppedImage, setDroppedImage] = useState(false)
    const [testImage, setTestImage] = useState({image: ""})
    const [documentTitle, setDocumentTitle] = useState("Create New Event")
    const [emailVerified, setEmailVerified] = useState(true)

    ///formData for the cloudinary upload
    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY)
    formData.append("file", testImage.image)
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET) 
    formData.append("public_id", eventFormInfo.eventImg)

    ///uses react dropzone to drop an image for the event
    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            const reader = new FileReader()
            const imageResult = acceptedFiles[0]
            setDroppedImage(true)
            formData.append("file", testImage.image)

            reader.onload = () =>{
                setTestImage({image: reader.result})
            }
            reader.readAsDataURL(imageResult)
        }
    })

///Handles styling when an image is dropped
    useEffect(() =>{
        imageDropped()
    }, [eventFormInfo.eventImg])

    ///Function that is called when an image is dropped
    function imageDropped(){
        // if(droppedImage){
        //     document.getElementById('drag-file-text').style.display = "none"
        // }else{
        //     document.getElementById('drag-file-text').style.display = "absolute"
        // }
    }

    ///Form submit handler
    async function createEventFormSubmit(e){
        e.preventDefault()        

        ///Uploads image to cloudinary
        await axios.post("https://api.cloudinary.com/v1_1/zi4rfynp/image/upload", formData, {signal: abortCont.signal})

        ///Adds eventImg id for getting from cloudinary
        setEventFormInfo((prevInfo) => ({
            ...prevInfo,
            eventImg: formData?.data?.public_id
        }))
        ///Posts eventsinfo data
        await axios.post(`${dataURL}/eventsinfo/add`, eventFormInfo)

        
        ///Sets eventImg in eventFormInfo to a new ID
        setEventFormInfo(prevInfo => ({
            ...prevInfo,
            eventImg:Math.random(0,20)+ new Date()
        }))
        setDroppedImage(false)

        navigate(`/events`)
        window.location.reload()
    }

    ///Changes the info in the eventFormInfo object when changed on page
    function handleEventsFormChange(e){
        setEventFormInfo(prev =>({
            ...prev,
            [e.target.name]: e.target.value,
            value: e.target.value
        }))
    }

    ///Function called when the state tag dropdown is changed
    function handleChange(props){
        setEventFormInfo(prev => ({
            ...prev,
            eventState: props.label
        }))
    }

    ///On page load, checks if email is verified
    useEffect(() =>{
        if(!auth?.currentUser?.emailVerified){
            setEmailVerified(false) 
            alert("Only verified emails can post an event, please verify your email before attempting to post an event.")
        }
        console.log(emailVerified)
    }, [])

    ///Function called when email is not verified and user tries to submit Event
    function emailNotVerifiedFunction(e){
        e.preventDefault()
        alert("Only verified emails can post an event, please verify your email before attempting to post an event.")
    }

    return(
        <div>
            <Navbar dataURL={dataURL} auth={auth} documentTitle={documentTitle} />
            {/* Event Info */}
            <form autoComplete="off" onSubmit={emailVerified ? createEventFormSubmit : emailNotVerifiedFunction} className="create-events-form">
                <div className="create-events-input">
                    <label className="form-label-input" htmlFor="eventName">Event Name</label>
                    <input required onChange={handleEventsFormChange} id="eventName" name="eventName" className="create-events-input" type="text" placeholder="Title"></input>
                </div>
                <div className="create-events-input">
                    <label className="form-label-input" htmlFor="eventDescription">Event Description</label>
                    <textarea id="eventDescription" required onChange={handleEventsFormChange} name="eventDescription" className="event-description create-events-input" type="textarea" placeholder="Description" ></textarea>
                </div>
                <div className="create-events-input">
                    <label  className="form-label-input" htmlFor="eventOrganizer">Event Organizer</label>
                    <input id="eventOrganiser" required onChange={handleEventsFormChange} name="eventOrganizer" className="create-events-input" type="text" placeholder="Organizer" />
                </div>



                {/* Event Date */}
                <div className="dates-input create-events-input">
                    <div className="date-input-left date-input-individual">
                        <label className="form-label" htmlFor="start-date-picker">Start Date</label>
                        <DatePicker required id="start-date-picker" className="date-picker" selected={eventFormInfo.eventStartDate} onChange={(date) => setEventFormInfo(prevInfo => ({
                            ...prevInfo,
                            eventStartDate: date
                        }))} />                        
                    </div>
                    <div className="date-input-right date-input-individual">
                        <label className="form-label" htmlFor="end-date-picker">End Date</label>
                        <DatePicker required id="end-date-picker" className="date-picker" selected={eventFormInfo.eventEndDate} onChange={(date) => setEventFormInfo(prevInfo => ({
                            ...prevInfo,
                            eventEndDate: date
                        }))} />                    
                    </div>
                </div>
                {/* Registration Date */}
                <div className="dates-input create-events-input">
                    <div className="date-input-individual">
                        <label className="form-label" htmlFor="registration-start-date-picker">Registration Opens</label>
                        <DatePicker required id="registration-start-date-picker" className="date-picker" selected={eventFormInfo.eventRegStartDate} onChange={(date) => setEventFormInfo(prevInfo => ({
                            ...prevInfo,
                            eventRegStartDate: date
                        }))} />                        
                    </div>
                    <div className="date-input-right date-input-individual">
                        <label className="form-label" htmlFor="registration-end-date-picker">Registration Closes</label>
                        <DatePicker id="registration-end-date-picker" className="date-picker" selected={eventFormInfo.eventRegEndDate} onChange={(date) => setEventFormInfo(prevInfo => ({
                            ...prevInfo,
                            eventRegEndDate: date
                        }))} />                    
                    </div>
                </div>




                {/* Location Form */}
                <div className="form-location">
                    <div className="create-events-input-location">
                        <div className="first two-location-inputs">
                            <label className="form-label-location" htmlFor="location-street">Street</label>
                            <input className="form-input-location" required onChange={handleEventsFormChange} type="text" id="location-street" name="eventStreet" placeholder="Street"></input>
                        </div>
                        <div className="two-location-inputs">
                            <label className="form-label-location" htmlFor="location-city">City</label>
                            <input className="form-input-location" required onChange={handleEventsFormChange} type="text" id="location-city" name="eventCity" placeholder="City"></input>
                        </div>

                    </div>
                    <div className="create-events-input-location">
                        <div className="first two-location-inputs">
                            <label className="form-label-location" htmlFor="location-state">State</label>
                            <Select className="form-state-dropdown" onChange={handleChange} options={states} />
                        </div>
                        <div className="two-location-inputs">
                            <label className="form-label-location" htmlFor="location-zip">Zip Code</label>
                            <input className="form-input-location" required onChange={handleEventsFormChange} type="text" id="location-zip" name="eventZip" placeholder="Zip Code"></input>
                        </div>
                    </div>
                </div>
  

                {/* Drop Image */}
                <div className="form-bottom-row">
                    <div className="img-drop">
                        <div {...getRootProps()}>
                            <input id="dropbox-image" {...getInputProps()} />
                            {
                            droppedImage ? <img className="image-preview" src={testImage.image}></img> 
                            :
                            <svg id="img-drop-icon" className="img-drop-icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43">
                            <path d="M48.4 26.5c-.9 0-1.7.7-1.7 
                            1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 
                            6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path>
                            </svg>
                            }
                        </div>
                        {/* <p id="drag-file-text">Drag a file in, or click the box</p>                             */}

                    </div>
                    {/* <input required type="file" name="pdf" onChange={handleEventsFormChange}></input> */}

                    <button className="events-form-submit" type="submit">Submit Event</button>
                </div>
            </form>      
           
        </div>
    )
}