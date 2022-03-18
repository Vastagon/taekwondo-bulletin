import {Link} from "react-router-dom"
import {useState} from "react"

export default function LoginCard(){
    const [loginInfo, setLoginInfo] = useState({username:"", password:""})

    function loginSubmit(e){
        e.preventDefault()

    }
    
    function changeLoginInfo(e){
        setLoginInfo(prevLogin => ({
            ...prevLogin,
            [e.target.name] : e.target.value
        }))
    }

    
    console.log(loginInfo)
    return(
        <div className="login-card">
            <h3 className="login-title">Login</h3>
            <form onSubmit={loginSubmit} className="login-form">
                <input onChange={changeLoginInfo} className="login-text" name="username" type="text" placeholder="Username" />
                <input onChange={changeLoginInfo} className="login-text" name="password" type="text" placeholder="Password" />
                <div className="login-card-buttons">
                    <Link to="/signup">
                    <button className="signup-button login-form-button">Sign up</button>
                    </Link>
                    <button className="login-form-button" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}


<Link to="/events" className="events-tab nav-tabs">Events</Link>