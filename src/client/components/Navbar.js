import tkdbImage from "../images/overlap.png"
import LoginCard from "./LoginCard"
import {useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom"

export default function Header(props){
    const [showLogin, setShowLogin] = useState(false)
    let navigate = useNavigate();

    function loginClickListener(){
        if(document.title == "Signup"){

        }else{
            setShowLogin(prev => !prev)
        }
    }
    function goHome(){
        document.title="Taekwondo Bulletin"
        navigate("/")
    }
    function changeNameToBlog(){
        document.title="Blog"
    }


    return(//shows header and login card
        <div className="navbar"> 
            <img alt="Cannot find Image" onClick={goHome} className="logo" src={tkdbImage} />
            <h1 className="title">{document.title}</h1>
            <div className="nav--right">
                <Link onClick={changeNameToBlog} to="/blog" className="blog-tab nav-tabs">Blog</Link>
                <Link onClick={() => document.title="Events"} to="/events" className="events-tab nav-tabs">Events</Link>
                <h4 onClick={loginClickListener} className="login-tab nav-tabs">Login</h4>
                {showLogin ? <LoginCard /> : null} 
            </div>
        </div>
    )
}