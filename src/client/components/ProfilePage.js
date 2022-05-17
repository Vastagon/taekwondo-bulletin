import Navbar from "./Navbar"
import "../styles/ProfilePage.css"
import { useState } from "react"
import { updateProfile, signOut, sendEmailVerification } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export default function ProfilePage({auth}){
    const [showInput, setShowInput] = useState(false)
    const [changeUsernameInput, setChangeUsernameInput] = useState("")
    let navigate = useNavigate()

    console.log(auth?.currentUser.emailVerified)
    function changeUsername(){
        setShowInput(true)
    }
    ///On form submit for username change
    function handleChangeUsername(e){
        e.preventDefault()

        updateProfile(auth.currentUser, {
            displayName: changeUsernameInput
        })
        setShowInput(false)
    }
    ///Handle username text input
    function handleInput(e){
        setChangeUsernameInput(e.target.value)
    }
    ///Sign user out
    function handleSignOut(){
        signOut(auth)
        navigate("/")
        window.location.reload()    
    }
    ///Send new Verification Email
    function sendVerificationEmail(){
        sendEmailVerification(auth.currentUser)
        .then(alert("Verification Email Sent"))
    }

    return (
        <div className="profile-page">
            <Navbar />

            <div className="profile-info">
                <p>Email: {auth?.currentUser.email}</p>
                {auth?.currentUser.emailVerified ? <p>Email is Verified</p> : <p>Email is Not Verified</p>}
                {auth?.currentUser.displayName ? <p>Username: {auth?.currentUser.displayName}</p> : <p>No Username</p>}
                <button onClick={changeUsername}>Change Username</button>

                { showInput ? <form onSubmit={handleChangeUsername}>
                    <input onChange={handleInput} type="text" placeholder="Enter new Username"></input>
                </form> : null}

                <button onClick={handleSignOut}>Sign Out</button>

                <button onClick={sendVerificationEmail}>Send Verification Email</button>
            </div>

        </div>
    )
}