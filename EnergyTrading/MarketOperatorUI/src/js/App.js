import React from 'react'
import Navbar from './components/Navbar'
import Home from './views/Home'
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import MarketOperation from './views/MarketOperation';
import GR from './views/GR';
import Notification from './views/Notification';
function App() {
  return (
    <>
    <Router>

     <Navbar />
     <Routes>
     <Route exact path="/" element={<Home/>} />
     <Route exact path="/MarketOperation" element={<MarketOperation/>} />
     <Route exact path="/GrievanceRedressal" element={<GR/>} />
     <Route exact path="/Notification" element={<Notification/>} />

     {/* <Route exact path="/Monitor" element={<Monitor/>} /> */}
     {/* <Route exact path="/Marketplace" element={<MarketPlace/>} /> */}
     {/* <Route exact path="/Forcasting" element={<Forcasting/>} /> */}
     {/* <Route exact path="/About" element={<About/>} /> */}
    
     </Routes>
    </Router>
    </>
  )
}

export default App
