import Navbar from "./Navbar"
import "../styles/ProfilePage.css"
import { useState } from "react"
import { updateProfile, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export default function ProfilePage({auth}){
    const [showInput, setShowInput] = useState(false)
    const [changeUsernameInput, setChangeUsernameInput] = useState("")
    let navigate = useNavigate()

    function changeUsername(){
        setShowInput(true)
    }
    function handleChangeUsername(e){
        e.preventDefault()

        updateProfile(auth.currentUser, {
            displayName: changeUsernameInput
        })
        setShowInput(false)
        
    }
    function handleInput(e){
        setChangeUsernameInput(e.target.value)
    }
    function handleSignOut(){
        signOut(auth)
        navigate("/")
        window.location.reload()    
    }

    return (
        <div className="profile-page">
            <Navbar />

            <div className="profile-info">
                <p>Email: {auth?.currentUser.email}</p>
                {auth?.currentUser.displayName ? <p>Username: {auth?.currentUser.displayName}</p> : <p>No Username</p>}
                <button onClick={changeUsername}>Change Username</button>

                { showInput ? <form onSubmit={handleChangeUsername}>
                    <input onChange={handleInput} type="text" placeholder="Enter new Username"></input>
                </form> : null}

                <button onClick={handleSignOut}>Sign Out</button>
            </div>

        </div>
    )
}