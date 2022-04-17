import Navbar from "./Navbar"
import {useState} from "react"
import "../styles/SignupPage.css"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Signup({showLogin, setShowLogin, auth, dataURL}){
    const [userInfo, setUserInfo] = useState({username:"", password:"", email:""})
    const [documentTitle, setDocumentTitle] = useState("Signup")

        
    function submitSignup(e){
        e.preventDefault()
        ///checks if both password inputs match
        if(document.getElementById('password').value !== document.getElementById('repeat-password').value){
            alert("Passwords don't match")
        }else{

            ///Creates a new account with firebase function
            createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then(result =>{
                ///Gives profile a username
                updateProfile(auth.currentUser, {
                    displayName: userInfo.username
                })
                window.location.reload()
            })
        
            ///Handles errors
            .catch((error) => {
                console.log(error)
                alert(error.message)
            })

        }
    
    }
    function onChange(e){
        setUserInfo(prev =>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return(
        <div onClick={() => setShowLogin(false)} className="centered">
            <Navbar dataURL={dataURL} documentTitle={documentTitle}/>
            <div className="signup-page">
                <h1 className="signup-page-message">Welcome to Taekwondo Bulletin</h1>
                <form onSubmit={submitSignup}>
                    <p className="signup-page-titles">Email</p>
                    <input type="email" onChange={onChange} name="email" required className="signup-page-inputs" placeholder="Email"></input>
                    <p className="signup-page-titles">Username</p>
                    <input onChange={onChange} name="username" required id="username" className="signup-page-inputs" placeholder="Username"></input>
                    <p className="signup-page-titles">Password</p>
                    <input onChange={onChange} name="password" id="password" required className="signup-page-inputs" placeholder="Password"></input>
                    <p className="signup-page-titles">Repeat Password</p>
                    <input id="repeat-password" required className="signup-page-inputs" placeholder="Repeat Password"></input>
                        <br></br>
                    <button className="signup-page-button">Sign up</button>
                </form> 
            </div>
        </div>
    )
}


