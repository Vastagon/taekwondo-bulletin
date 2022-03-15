import tkdbImage from "../images/overlap.png"
import LoginCard from "./LoginCard"
import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"

export default function Header({documentTitle}){
    const [showLogin, setShowLogin] = useState(false)
    let navigate = useNavigate();
    
///Shows Login card
    function loginClickListener(){
        if(document.title != "Signup"){
            setShowLogin(prev => !prev)
        }
    }
///Goes to home page and blog
    function goHome(){
        navigate("/")
    }

    return(//shows header and login card
        <div className="navbar"> 
            <img alt="Cannot find Image" onClick={goHome} className="logo" src={tkdbImage} />
            <h1 className="title">{documentTitle}</h1>
            <div className="nav--right">
                <Link to="/blog" className="blog-tab nav-tabs">Blog</Link>
                <Link to="/events" className="events-tab nav-tabs">Events</Link>
                <h4 onClick={loginClickListener} className="login-tab nav-tabs">Login</h4>
                {showLogin ? <LoginCard /> : null} 
            </div>
        </div>
    )
}