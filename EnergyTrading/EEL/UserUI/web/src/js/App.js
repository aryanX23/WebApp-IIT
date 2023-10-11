import React, { useEffect,useState } from 'react'
import Navbar from './components/Navbar'
import Home from './views/Home'
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Monitor from './views/Monitor';
import MarketPlace from './views/MarketPlace';
import Forcasting from './views/Forcasting';
import About from './views/About';
import Register from './views/Register';
import Login from './views/Login';
function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Check if an access token exists in local storage
    const storedAccessToken = localStorage.getItem('access_token');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);
  return (
    <>
    <Router>

     <Navbar accessToken={accessToken} setAccessToken={setAccessToken} />
     <Routes>
     <Route exact path="/" element={<Home accessToken={accessToken} setAccessToken={setAccessToken}/>} />
     <Route exact path="/Monitor" element={<Monitor/>} />
     <Route exact path="/Marketplace" element={<MarketPlace/>} />
     <Route exact path="/Forcasting" element={<Forcasting/>} />
     <Route exact path="/About" element={<About/>} />
     <Route exact path="/Register" element={<Register/>} />
     <Route exact path="/Login" element={<Login accessToken={accessToken} setAccessToken={setAccessToken}/>} />
     
     </Routes>
    </Router>
    </>
  )
}

export default App
