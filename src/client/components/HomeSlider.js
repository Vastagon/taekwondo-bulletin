import {useState} from "react"
import data from "./data"

export default function HomeSlider(props){
    const [currentImage, setCurrentImage] = useState(3)
    let currentId = currentImage

    function clickRightArrowHome(){
        console.log("currentID " + currentId)


        if(currentId >= data.length){///changes ID and sets id back to 1 when at the end
            setCurrentImage(0)
        }
        console.log("currentID2 " + currentId)

        setCurrentImage(prev => prev + 1) //Adds 1 to ID
        currentId = currentImage;
        console.log(currentId)
    }
    function clickLeftArrowHome(){
        console.log("currentID " + currentId)



        if(currentId <= 1){///changes ID and sets id back to 3 when at the beginning of the data
            setCurrentImage(data.length+1)
        }

        setCurrentImage(prev => prev - 1) //Adds 1 to ID
        currentId = currentImage;
        console.log(currentId)
    }

    return(
        <div id="home-slider" className="home-slider">
            <div onClick={clickLeftArrowHome} className="left-slider">
                <div className="left-arrow arrow"></div>
                
            </div>
            <img alt="Cannot find Image" src={data[currentId-1].img} />
            <div onClick={clickRightArrowHome} className="right-slider">
                <div className="right-arrow arrow"></div>
            </div>
        </div>
    )
}