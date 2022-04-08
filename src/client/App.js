import './styles/App.css';
import Routes from "./routes.js"
import {useEffect, useState} from "react"
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

function App() {
  const [eventCardInfo, setEventCardInfo] = useState()

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
      };

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app);
  connectAuthEmulator(auth, "http://localhost:9099")
  

  useEffect(() =>{
    axios.get("http://localhost:5000/eventsinfo")
    .then(res => setEventCardInfo(res.data))
    .catch(err => console.log(err))
}, [])

  return (
    <div>
      <Routes auth={auth} routesInfo={eventCardInfo} />
    </div>

  );
}

export default App;
