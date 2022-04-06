import Navbar from "./Navbar"
import "../styles/EventsCreatePage.css"
import "react-datepicker/dist/react-datepicker.css";
import {useState, useEffect} from "react"
import {useDropzone} from "react-dropzone"
import axios from "axios"
import DatePicker from "react-datepicker"
import states from "./states.json"
import Select from "react-select"

export default function EventsCreatePage(){
    const [eventFormInfo, setEventFormInfo] = useState({eventName:"",eventDescription:"", eventDate:new Date(), 
    eventImg:Math.random(0,20)+ new Date(), eventStreet: "", eventCity: "", eventState:""})

    // console.log(eventFormInfo)
    let formData = new FormData()
    const [droppedImage, setDroppedImage] = useState(true)
    const [testImage, setTestImage] = useState({image: ""})
    const [documentTitle, setDocumentTitle] = useState("Create New Event")

    ///formData for the cloudinary upload
    formData.append("api_key", "336683864383724")
    formData.append("file", testImage.image)
    formData.append("upload_preset", "zi4rfynp") 
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
///Uploads image to cloudinary
    function uploadImage(){
        axios.post("https://api.cloudinary.com/v1_1/zi4rfynp/image/upload", formData)
    }


///Handles styling when an image is dropped
    useEffect(() =>{
        imageDropped()
    }, [eventFormInfo.eventImg])

    ///Function that is called when an image is dropped
    function imageDropped(){
        if(!droppedImage){
            document.getElementById('drag-file-text').style.display = "none"
        }else{
            document.getElementById('drag-file-text').style.display = "absolute"
        }
    }

    ///Form submit handler
    function createEventFormSubmit(e){
        e.preventDefault()        
        uploadImage()

        setEventFormInfo((prevInfo) => ({
            ...prevInfo,
            eventImg: formData?.data?.public_id
        }))

        axios.post("http://localhost:5000/eventsinfo/add", eventFormInfo)
        .then(res => console.log(res.data))
        ///Sets all values to zero and resets page
        document.getElementById("eventName").value = ""
        document.getElementById("eventDescription").value = ""

        ///Sets eventImg in eventFormInfo to a new ID
        setEventFormInfo(prevInfo => ({
            ...prevInfo,
            eventImg:Math.random(0,20)+ new Date()
        }))
        setDroppedImage(false)
        // imageDropped()
    }

    ///Changes the info in the eventFormInfo object when changed on page
    function handleEventsFormChange(e){
        setEventFormInfo(prev =>({
            ...prev,
            [e.target.name]: e.target.value,
            value: e.target.value
        }))
        
        // console.log(Array.from(formData))
    }

    ///Function called when the state tag dropdown is changed
    function handleChange(props){
        setEventFormInfo(prev => ({
            ...prev,
            eventState: props.label
        }))
    }

    return(
        <div>
            <Navbar documentTitle={documentTitle} />
            <form onSubmit={createEventFormSubmit} className="create-events-form">
                <div className="create-events-input">
                    <label className="form-label" htmlFor="eventName">Event Name</label>
                    <input required onChange={handleEventsFormChange} id="eventName" name="eventName" className="create-events-input" type="text" placeholder="Title"></input>
                </div>
                <div className="create-events-input">
                    <label className="form-label" htmlFor="eventDescription">Event Description</label>
                    <textarea id="eventDescription" required onChange={handleEventsFormChange} name="eventDescription" className="event-description create-events-input" type="textarea" placeholder="Description" ></textarea>
                </div>
                <div className="create-events-input">
                    <label  className="form-label" htmlFor="eventOrganizer">Event Organizer</label>
                    <input id="eventOrganiser" required onChange={handleEventsFormChange} name="eventOrganizer" className="create-events-input" type="text" placeholder="Organizer" />
                </div>
                <div className="dates-input create-events-input">
                    <div className="date-input-individual">
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
                <div className="form-location">
                    <div className="create-events-input">
                        <div className="two-location-inputs">
                            <label className="form-label-location" htmlFor="location-street">Street</label>
                            <input required onChange={handleEventsFormChange} type="text" id="location-street" name="eventStreet" placeholder="Street"></input>

                        </div>

                        <label className="form-label-location" htmlFor="location-city">City</label>
                        <input required onChange={handleEventsFormChange} type="text" id="location-city" name="eventCity" placeholder="City"></input>

                    </div>
                    <div className="create-events-input">
                        <div className="two-location-inputs">
                            <label className="form-label-location" htmlFor="location-state">State</label>
                            <Select onChange={handleChange} options={states} />
                        </div>

                        <label className="form-label-location" htmlFor="location-zip">Zip Code</label>
                        <input required onChange={handleEventsFormChange} type="text" id="location-zip" name="eventZip" placeholder="Zip Code"></input>
                    </div>
                </div>
  

                <div className="form-bottom-row">
                    <div className="img-drop">
                        <div {...getRootProps()}>
                            <input id="dropbox-image" {...getInputProps()} />
                            {droppedImage ? <img className="image-preview" src={testImage.image}></img> 
                            :
                            <svg id="img-drop-icon" className="img-drop-icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43">
                            <path d="M48.4 26.5c-.9 0-1.7.7-1.7 
                            1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 
                            6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path>
                            </svg>
                            }
                            <p id="drag-file-text">Drag a file, or click the box</p>                            
                        </div>
                    </div>
                    {/* <input required type="file" name="pdf" onChange={handleEventsFormChange}></input> */}

                    <button className="events-form-submit" type="submit">Submit Event</button>
                </div>
            </form>      
            <div>    
            </div>
        </div>
    )
}