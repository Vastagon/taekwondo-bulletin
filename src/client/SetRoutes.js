import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Home from "./Home"
import Blog from "./Blog"
import Events from './components/Events';
import Signup from "./components/Signup"
import ErrorPage from './components/ErrorPage';
import EventsCreatePage from "./components/EventsCreatePage"
import TotalEventCardShown from "./components/TotalEventCardShown"
import ProfilePage from "./components/ProfilePage"

export default function SetRoutes({auth, routesInfo, dataURL}){


  const eventsRoutes = routesInfo?.map((prevInfo) =>{
    return <Route key={prevInfo._id} path={`/events/${prevInfo._id}`} element={<TotalEventCardShown info={prevInfo}/>} />
  })


    return(
      <Router>
        <Routes>
          <Route path="/" element={<Home auth={auth} dataURL={dataURL} />} />
          <Route path="/blog" element={<Blog auth={auth} dataURL={dataURL} />} />
          <Route path="/events" element={<Events auth={auth} dataURL={dataURL} />} />
          <Route path="/signup" element={<Signup auth={auth} dataURL={dataURL} />} />
          <Route path="/eventsCreatePage" element={<EventsCreatePage auth={auth} dataURL={dataURL}/>} />
          {eventsRoutes}
          <Route path="/profile/:id" element={<ProfilePage auth={auth}/>} />
          {/* <Route path="/events/:id" element={<TotalEventCardShown data={this.state.data}/>} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    )
}