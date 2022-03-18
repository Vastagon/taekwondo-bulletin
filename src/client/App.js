import './styles/App.css';
import Routes from "./routes.js"
import {useEffect, useState} from "react"
import axios from 'axios';

function App() {
  const [eventCardInfo, setEventCardInfo] = useState()

  useEffect(() =>{
    axios.get("http://localhost:5000/eventsinfo")
    .then(res => setEventCardInfo(res.data))
    .catch(err => console.log(err))
}, [])

  return (
    <div>
      <Routes routesInfo={eventCardInfo} />
    </div>

  );
}

export default App;
