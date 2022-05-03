import Navbar from "./components/Navbar";
import HomeSlider from "./components/HomeSlider";
import "./styles/App.css"
import { useState } from "react";

export default function Home({dataURL, auth}){
    const [documentTitle, setDocumentTitle] = useState("Taekwondo Bulletin")

    return(
        <div>
            <Navbar dataURL={dataURL} auth={auth} documentTitle={documentTitle}/>
            <HomeSlider dataURL={dataURL}/>
            <h1 className="homepage-about-text">About</h1>
            <p className="homepage-about-text">A website where taekwondo competitors, coaches, and tournament sponsors can communicate and post events.</p>
        </div>
    )
}