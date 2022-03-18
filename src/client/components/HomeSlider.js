import {useEffect, useState} from "react"
import {Image} from "cloudinary-react"
import axios from "axios"

export default function HomeSlider(props){
    const [currentImage, setCurrentImage] = useState(0)
    const [imageData, setImageData] = useState({})
    let currentId = currentImage

    ///Sets imageData to res.data
    useEffect(() =>{
        axios.get("http://localhost:5000/eventsinfo")
        .then(res => setImageData(res.data))
    }, [])

    function clickRightArrowHome(){
        if(currentId >= imageData.length-1){///changes ID and sets id back to 0 when at the end
            setCurrentImage(-1)
        }

        setCurrentImage(prev => prev + 1) //Adds 1 to ID
        currentId = currentImage;
    }
    function clickLeftArrowHome(){
        if(currentId <= 0){///changes ID and sets id back to the length of the array when at the beginning of the data
            setCurrentImage(imageData.length-1)
        }

        setCurrentImage(prev => prev - 1) //Subtracts 1 to ID
        currentId = currentImage;
    }

    return(
        <div id="home-slider" className="home-slider">
            <div onClick={clickLeftArrowHome} className="left-slider">
                <div className="left-arrow arrow"></div>    
            </div>
            <Image alt="Cannot find Image" className="event-image" cloud_name="dg9s57jo8" publicId={imageData[currentImage]?.eventImg} />
            <div onClick={clickRightArrowHome} className="right-slider">
                <div className="right-arrow arrow"></div>
            </div>
        </div>
    )
}

