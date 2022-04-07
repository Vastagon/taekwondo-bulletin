import {useEffect, useState} from "react"
import {Image} from "cloudinary-react"
import axios from "axios"

export default function HomeSlider(props){
    ///currentImage is the variable holding the index of the array
    const [currentImage, setCurrentImage] = useState(0)
    const [imageData, setImageData] = useState({})
    const [changeImageCheck, setChangeImageCheck] = useState()
    const [clickedLeft, setClickedLeft] = useState()
    const [clickedRight, setClickedRight] = useState()
    let currentId = currentImage

    ///Sets imageData to res.data
    useEffect(() =>{
        axios.get("http://localhost:5000/eventsinfo")
        .then(res => setImageData(res.data))
    }, [])

    function clickRightArrowHome(){
        setClickedRight(true)
        setChangeImageCheck(true)


        ///Removes slide left class after the slide is done
        setTimeout(() =>{
            ///Variable for conditional rendering to remove onClick until animation is finished
            setChangeImageCheck(false)
            setClickedRight(false)

            if(currentId >= imageData.length-1){///changes ID and sets id back to 0 when at the end
                setCurrentImage(-1)
            }

            setCurrentImage(prev => prev + 1) //Adds 1 to ID
            currentId = currentImage;
        }, 1000)
    }


    function clickLeftArrowHome(){
        setClickedLeft(true)
        setChangeImageCheck(true)
        ///Removes slide left class after the slide is done
        setTimeout(() =>{
            ///Variable for conditional rendering to remove onClick until animation is finished
            setChangeImageCheck(false)
            setClickedLeft(false)

            if(currentId <= 0){///changes ID and sets id back to the length of the array when at the beginning of the data
                setCurrentImage(imageData.length)
            }
            setCurrentImage(prev => prev - 1) //Subtracts 1 to ID
            currentId = currentImage;

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
            
            {/* Shows Image if animation isn't playing */}
            {!clickedLeft && !clickedRight ? <Image id="central-image" alt="Cannot find Image" className="event-image" cloud_name="dg9s57jo8" publicId={imageData[currentImage]?.eventImg} /> : null } 

            {/* Show Left Arrow Animation */}
            {clickedLeft ?             
            <div id="event-slider-holder" className="slide-left event-slider-holder">
                <Image id="left-image" alt="Cannot find Image" className="event-image" cloud_name="dg9s57jo8" publicId={imageData[currentImage]?.eventImg} />
                <Image id="right-image" alt="Cannot find Image" className="previous-event-image event-image" cloud_name="dg9s57jo8" publicId={imageData[currentImage+1]?.eventImg}/>
            </div>
            :
                null
            }

            {/* Show Right Arrow Animation */}
            {clickedRight ?             
            <div id="event-slider-holder" className="slide-right event-slider-holder">
                <Image id="left-image" alt="Cannot find Image" className="event-image" cloud_name="dg9s57jo8" publicId={imageData[currentImage]?.eventImg} />
                <Image id="right-image" alt="Cannot find Image" className="previous-event-image event-image" cloud_name="dg9s57jo8" publicId={imageData[currentImage+1]?.eventImg}/>
            </div>
            :
                null
            }



            {changeImageCheck ? ///Prevents clicking the arrow when animation is playing
            <div id="right-slider" className="right-slider">
                <div className="right-arrow arrow"></div>
            </div> 
            :
            <div onClick={clickRightArrowHome} id="right-slider" className="right-slider">
                <div className="right-arrow arrow"></div>
            </div> 
            }
        </div>
    )
}

///Put two images on the page(maybe three), depending on if you click the left or right arrow, show certain images and slide these images 

///Make a div element with two images, show certain div depending on arrow press, use conditional rendering?


// function clickRightArrowHome(){
//     if(currentId >= imageData.length-1){///changes ID and sets id back to 0 when at the end
//         setCurrentImage(-1)
//     }
//     document.getElementById('slider-image').classList.add('slide-right')
//     setChangeImageCheck(true)
//     document.getElementById('previous-event-image').style.display= "block"
//     document.getElementById('previous-event-image').classList.add('slide-right')


//     ///Removes slide left class after the slide is done
//     setTimeout(() =>{
//         document.getElementById('slider-image').classList.remove('slide-right')
//         ///Variable for conditional rendering to remove onClick until animation is finished
//         setChangeImageCheck(false)
//         document.getElementById('previous-event-image').style.display= "none"
//     }, 1000)


//     setCurrentImage(prev => prev + 1) //Adds 1 to ID
//     currentId = currentImage;
// }