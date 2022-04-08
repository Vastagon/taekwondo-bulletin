import Navbar from "./Navbar"
import axios from 'axios';
import {useState} from "react"
import "../styles/SignupPage.css"
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup({auth}){
    const [userInfo, setUserInfo] = useState({username:"", password:"", email:""})
    const [documentTitle, setDocumentTitle] = useState("Signup")
        

    function submitSignup(e){
        e.preventDefault()
        ///checks if both password inputs match
        if(document.getElementById('password').value !== document.getElementById('repeat-password').value){
            alert("Passwords don't match")
        }else{
            ///Might get rid of this
            axios.post("https://taekwondo-bulletin.herokuapp.com/users/add", userInfo)
            .then(res => console.log(res.data))

            ///Creates a new account with firebase function
            createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then((userCredential) =>{
                const user = userCredential.user
                console.log(user)
            })
            ///Handles errors
            .catch((error) =>{
                const errorCode = error.code
                const errorMessage = error.message
            })


            window.location.reload()
        }
    }
    function onChange(e){
        setUserInfo(prev =>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return(
        <div className="centered">
            <Navbar documentTitle={documentTitle}/>
            <div className="signup-page">
                <h1 className="signup-page-message">Welcome to Taekwondo Bulletin</h1>
                <form onSubmit={submitSignup}>
                    <p className="signup-page-titles">Email</p>
                    <input onChange={onChange} name="email" required className="signup-page-inputs" placeholder="Email"></input>
                    {/* <p className="signup-page-titles">Username</p>
                    <input onChange={onChange} name="username" required className="signup-page-inputs" placeholder="Username"></input> */}
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


