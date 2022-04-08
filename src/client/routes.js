import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home"
import Blog from "./Blog"
import Events from './components/Events';
import Signup from "./components/Signup"
import ErrorPage from './components/ErrorPage';
import EventsCreatePage from "./components/EventsCreatePage"
import TotalEventCardShown from "./components/TotalEventCardShown"

export default function routes({auth, routesInfo, dataURL}){
// console.log({routesInfo})

  ///Adds all created paths for showing additional info with the event cards
  const eventsRoutes = routesInfo?.map((prevInfo) =>{
    return(
      <Route key={prevInfo._id} path={`/events/${prevInfo._id}`} element={<TotalEventCardShown />} />
    )
  })


    return(
      <Router>
        <Routes>
          <Route path="/" element={<Home auth={auth} dataURL={dataURL} />} />
          <Route path="/blog" element={<Blog auth={auth} dataURL={dataURL} />} />
          <Route path="/events" element={<Events auth={auth} dataURL={dataURL} />} />
          <Route path="/signup" element={<Signup auth={auth} dataURL={dataURL} />} />
          <Route path="/eventsCreatePage" element={<EventsCreatePage auth={auth} dataURL={dataURL}/>} />
          {/* <Route path={`/events/Text%20Area`} element={<TotalEventCardShown />} /> */}
          {eventsRoutes}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    )
}