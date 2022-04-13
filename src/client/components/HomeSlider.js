import {useEffect, useState} from "react"
import {Image} from "cloudinary-react"
import axios from "axios" 


export default function HomeSlider({dataURL}){
    ///currentImage is the variable holding the index of the array
    const [currentImage, setCurrentImage] = useState(0)
    const [imageData, setImageData] = useState({})
    const [changeImageCheck, setChangeImageCheck] = useState()
    const [leftImage, setLeftImage] = useState()
    const [rightImage, setRightImage] = useState()
    const abortCont = new AbortController()

    ///Sets imageData to res.data
    useEffect(() =>{
        axios.get(`${dataURL}/eventsinfo`, {signal: abortCont.signal})
        .then(res => {
            setImageData(res.data)
            setLeftImage(1)
            setRightImage(res.data.length-1)
        })
        .catch(err => console.log(err))

        return () => abortCont.abort()
    }, [])    


    function clickRightArrowHome(){
        document.getElementById('slider-image').classList.add('slide-right')
        setChangeImageCheck(true)

        ///Removes slide left class after the slide is done
        setTimeout(() =>{
            document.getElementById('slider-image').classList.remove('slide-right')
            ///Variable for conditional rendering to remove onClick until animation is finished
            setChangeImageCheck(false)

            ///Checking left image movement
            if(leftImage >= imageData.length-1){
                setLeftImage(0)
            }else{
                setLeftImage(prev => prev + 1)
            }
            ///Checking right image movement
            if(rightImage >= imageData.length-1){
                setRightImage(0)
            }else{
                setRightImage(prev => prev + 1)
            }


            if(currentImage >= imageData.length-1){///changes ID and sets id back to 0 when at the end
                setCurrentImage(0)
            }else{
                setCurrentImage(prev => prev + 1) //Adds 1 to ID
            }

        }, 1000)
    }

    function clickLeftArrowHome(){
        document.getElementById('slider-image').classList.add('slide-left')
        setChangeImageCheck(true)


        ///Removes slide left class after the slide is done
        setTimeout(() =>{
            document.getElementById('slider-image').classList.remove('slide-left')
            ///Variable for conditional rendering to remove onClick until animation is finished
            setChangeImageCheck(false)

            ///Checking right image movement
            if(rightImage <= 0){
                setRightImage(imageData.length-1)
            }else{
                setRightImage(prev => prev - 1)
            }
            ///Checking left image movement
            if(leftImage <= 0){
                setLeftImage(imageData.length-1)
            }else{
                setLeftImage(prev => prev - 1)
            }

            if(currentImage <= 0){///changes ID and sets id back to the length of the array when at the beginning of the data
                setCurrentImage(imageData.length-1)
            }else{
                setCurrentImage(prev => prev - 1) //Subtracts 1 to ID
            }
            
        }, 1000)
    }



    return(
        <div id="home-slider" className="home-slider">
            
            {changeImageCheck ? ///Prevents clicking the arrow when animation is playing
            <div id="left-slider" className="left-slider">
                <div className="left-arrow arrow"></div>    
            </div>
            :
            <div onClick={clickLeftArrowHome} id="left-slider" className="left-slider">
                <div className="left-arrow arrow"></div>    
            </div>
            }

            
            
            
            <div id="slider-image" className="event-slider-holder">
                {/* Displayed when Right Clicked */}
                    <Image id="left-image" alt="Cannot find Image" className="event-image" cloud_name={process.env.REACT_APP_CLOUD_NAME} publicId={imageData[leftImage]?.eventImg} />
                {/* Middle Image */}
                    <Image id="center-image" alt="Cannot find Image" className="event-image" cloud_name={process.env.REACT_APP_CLOUD_NAME} publicId={imageData[currentImage]?.eventImg} />
                {/* Displayed when Left Clicked */}
                    <Image id="right-image" alt="Cannot find Image" className="event-image" cloud_name={process.env.REACT_APP_CLOUD_NAME} publicId={imageData[rightImage]?.eventImg} />
            </div>



            {changeImageCheck ? ///Prevents clicking the arrow when animation is playing
            <div id="right-slider" className="right-slider">
                <div className="right-arrow arrow"></div>
            </div> 
            :
            <div onClick={clickRightArrowHome} id="right-slider" className="right-slider">
                <div className="right-arrow arrow"></div>
            </div> 
            }

            <p>{leftImage?.eventImg}</p>
        </div>
    )
}