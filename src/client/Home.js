import Navbar from "./components/Navbar";
import data from "./components/data"
import EventCard from './components/EventCard';
import HomeSlider from "./components/HomeSlider";

import "./App.css"

export default function Home(){



    return(
        <div>
            <Navbar 
                title = {"Events"}
            />
            <HomeSlider 
                image = {"https://upload.wikimedia.org/wikipedia/commons/5/5d/Milad_Kharchegani_at_the_2016_Summer_Olympics.jpg"}
            />
            <h1>About</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
        </div>
    )
}