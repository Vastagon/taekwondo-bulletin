import Navbar from "./Navbar"

export default function Signup(){
    return(
        <div className="centered">
            <Navbar />
            <div className="signup-page">
                <h1 className="signup-page-message">Welcome to Taekwondo Bulletin</h1>
                <form>
                    <p className="signup-page-titles">Email</p>
                    <input className="signup-page-inputs" placeholder="Email"></input>
                    <p className="signup-page-titles">Username</p>
                    <input className="signup-page-inputs" placeholder="Username"></input>
                    <p className="signup-page-titles">Password</p>
                    <input className="signup-page-inputs" placeholder="Password"></input>
                    <p className="signup-page-titles">Repeat Password</p>
                    <input className="signup-page-inputs" placeholder="Repeat Password"></input>
                </form>
            </div>
        </div>
    )
}