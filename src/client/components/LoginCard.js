import {Link} from "react-router-dom"
import {useState} from "react"
import "../styles/App.css"
import { signInWithEmailAndPassword } from "firebase/auth";


export default function LoginCard({auth}){
    const [loginInfo, setLoginInfo] = useState({email:"", password:""})

    ///Handles login submit
    function loginSubmit(e){
        e.preventDefault()
        ///Firebase sign in function
        signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
        .then((userCredential) => {
            const user = userCredential.user
            window.location.reload()

        })
        ///Handles errors
        .catch((error) =>{
            alert("Invalid Username or password")
        })

    }
    
    ///Handles login info change
    function changeLoginInfo(e){
        setLoginInfo(prevLogin => ({
            ...prevLogin,
            [e.target.name] : e.target.value
        }))
    }

    return(
        <div className="login-card">
            <h3 className="login-title">Login</h3>
            <form onSubmit={loginSubmit} className="login-form">
                <input onChange={changeLoginInfo} className="login-text-username login-text" name="email" type="text" placeholder="email" />
                <input onChange={changeLoginInfo} className="login-text-password login-text" name="password" type="text" placeholder="Password" />
                <div className="login-card-buttons">
                    <Link to="/signup">
                    <button type="button" className="signup-button login-form-button">Sign up</button>
                    </Link>
                    <button className="login-form-button" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}


<Link to="/events" className="events-tab nav-tabs">Events</Link>