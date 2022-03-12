import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home"
import Blog from "./Blog"
import Events from './components/Events';
import Signup from "./components/Signup"
import ErrorPage from './components/ErrorPage';
import EventsCreatePage from "./components/EventsCreatePage"

export default function routes(){
    return(
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/events" element={<Events />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/eventsCreatePage" element={<EventsCreatePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    )
}