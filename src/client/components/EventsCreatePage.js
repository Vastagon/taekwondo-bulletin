import Navbar from "./Navbar"
import "../EventsCreatePage.css"
import "react-datepicker/dist/react-datepicker.css";
import {useState, useEffect} from "react"
import {useDropzone} from "react-dropzone"
import axios from "axios"
import DatePicker from "react-datepicker"
import {v4 as uuid} from "uuid"


export default function EventsCreatePage(){
    // const [eventFormInfo, setEventFormInfo] = useState({eventName:"",eventDescription:"",eventTime:"",eventDate:"",eventSlots:0, eventImage:[]})
    const [eventFormInfo, setEventFormInfo] = useState({eventName:"",eventDescription:"",eventTime:"",eventDate:new Date(), eventSlots:0, id:""})
    const [startDate, setStartDate] = useState(new Date())
    let formData = new FormData()
    const [droppedImage, setDroppedImage] = useState(false)
    const [testImage, setTestImage] = useState({image: ""})
    formData.append("api_key", "336683864383724")
    formData.append("file", testImage.image)
    formData.append("public_id", Math.random(0,2).toString())
    formData.append("timestamp", + new Date())
    formData.append("upload_preset", "zi4rfynp")
    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            const reader = new FileReader()
            const imageResult = acceptedFiles[0]
            reader.onload = () =>{
                setTestImage({image: reader.result})
            }
            reader.readAsDataURL(imageResult)
            
            // reader.onload = () =>{
            //     setEventFormInfo((prevInfo) =>({
            //         ...prevInfo,
            //         eventImage: reader.result
            //     }))
            // }
            // reader.readAsDataURL(imageResult)

            
            // setEventFormInfo((prevInfo) =>({
            //     ...prevInfo,
            //     eventImage: acceptedFiles.map((file) => Object.assign(file, {
            //         preview: URL.createObjectURL(file)
            //     }))
            // }))
        }
    })

    function uploadImage(){
        ///https://api.cloudinary.com/v1_1/demo/image/upload
        // console.log(files[0].preview)
        // axios.post("cloudinary://336683864383724:8MbNKmImBmB1XfLn5v0PFnmYR6M@dg9s57jo8", testImage.image)
        // axios.post("http://localhost:5000/addimage/add", testImage)        

        axios.post("https://api.cloudinary.com/v1_1/zi4rfynp/image/upload", formData)
        .then(res => console.log(res))
    }


///Handles styling when an image is dropped
    useEffect(() =>{
        imageDropped()
    }, [eventFormInfo.eventImage])
    function imageDropped(){
        setDroppedImage(prev => !prev)
        if(droppedImage){
            document.getElementById('drag-file-text').style.display = "none"
        }else{
            document.getElementById('drag-file-text').style.display = "relative"
        }
        // console.log(droppedImage)
    }
    
    function createEventFormSubmit(e){
        e.preventDefault()

        axios.post("http://localhost:5000/eventsinfo/add", eventFormInfo)
        .then(res => console.log(res.data))

        uploadImage()
        window.location.reload()
    }
    function handleEventsFormChange(e){

        setEventFormInfo(prev =>({
            ...prev,
            [e.target.name]: e.target.value,
            id: Math.random(0,5).toString()
        }))
    }///+eventFormInfo.eventName.toString()

    console.log(testImage)
    console.log(eventFormInfo.id)
    return(
        <div>
            <Navbar />
            <form onSubmit={createEventFormSubmit} className="create-events-form">
                <div className="create-events-input">
                    <label className="form-label" htmlFor="eventName">Event Name</label>
                    <input required onChange={handleEventsFormChange} id="eventName" name="eventName" className="create-events-input" type="text" placeholder="Title"></input>
                </div>
                <div className="create-events-input">
                    <label className="form-label" htmlFor="eventDescription">Event Description</label>
                    <input id="eventDescription" required onChange={handleEventsFormChange} name="eventDescription" className="create-events-input" type="text" placeholder="Description" />
                </div>
                <div className="create-events-input">
                    <label className="form-label" htmlFor="eventSlots">Total Slots</label>
                    <input id="eventSlots" onChange={handleEventsFormChange} name="eventSlots" className="create-events-input" type="number" placeholder="Slots" />
                </div>
                <div className="create-events-input">
                    <label  className="form-label" htmlFor="eventTime">Event Time</label>
                    <input id="eventTime" required onChange={handleEventsFormChange} name="eventTime" className="create-events-input" type="text" placeholder="Time" />
                </div>
                <div className="create-events-input">
                    <label className="form-label" htmlFor="date-picker">Event Date</label>
                    <DatePicker id="date-picker" className="date-picker" selected={startDate} onChange={(date:Date) => setStartDate(date)} />
                </div>
                
  

                <div className="form-bottom-row">
                    <div className="img-drop">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {!droppedImage ? <img className="image-preview" src={testImage.image}></img> 
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
                        <button className="events-form-submit" type="submit">Submit Event</button>
                </div>
                <p>{startDate.toUTCString()}</p>
            </form>      
            <div>    
            </div>
        </div>
    )
}