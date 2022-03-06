import {Link} from "react-router-dom"

export default function LoginCard(props){

    function goToSignUpPage(){
        document.title = "Signup"

    }

    return(
        <div id={props.id} className="login-card">
            <h3 className="login-title">Login</h3>
            <form className="login-form">
                <input center className="login-text" type="text" placeholder="Username" />
                <input className="login-text" type="text" placeholder="Password" />
                <div className="login-card-buttons">
                    <Link to="/signup">
                    <button onClick={goToSignUpPage} className="signup-button login-form-button">Sign up</button>
                    </Link>
                    <button className="login-form-button" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}


<Link onClick={() => document.title="Events"} to="/events" className="events-tab nav-tabs">Events</Link>