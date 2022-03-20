import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home"
import Blog from "./Blog"
import Events from './components/Events';
import Signup from "./components/Signup"
import ErrorPage from './components/ErrorPage';
import EventsCreatePage from "./components/EventsCreatePage"
import TotalEventCardShown from "./components/TotalEventCardShown"

export default function routes({routesInfo}){
// console.log({routesInfo})

  const eventsRoutes = routesInfo?.map((prevInfo) =>{
    return(
      <Route key={prevInfo._id} path={`/events/${prevInfo._id}`} element={<TotalEventCardShown />} />
    )
  })


    return(
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/events" element={<Events />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/eventsCreatePage" element={<EventsCreatePage />} />
          {/* <Route path={`/events/Text%20Area`} element={<TotalEventCardShown />} /> */}
          {eventsRoutes}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    )
}