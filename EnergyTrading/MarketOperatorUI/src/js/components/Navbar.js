import React from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Energy Trade!</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>


              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/MarketOperation"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Market-Operation
                </Link>
                <ul className="dropdown-menu">

                  <li><Link className="dropdown-item" to="/MarketOperation">Invite Bid</Link></li>
                  <li><Link className="dropdown-item" to="/MarketOperation">Bid Matching</Link></li>
                  <li><Link className="dropdown-item" to="/MarketOperation">Matched Bid Broadcast</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/GrievanceRedressal"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Grievance Redressal
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/GrievanceRedressal">Query Response</Link></li>
                  <li><Link className="dropdown-item" to="/GrievanceRedressal">Live Chat</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/Notification"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Notification
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/Notification">Compliance Report</Link></li>
                  <li><Link className="dropdown-item" to="/Notification">New Regulation</Link></li>
                </ul>
              </li>
              <li className="nav-item ">
                <button type="button" className="btn btn-outline-dark " >Login</button>

              </li>

            </ul>



          </div>
          <div className=" d-none d-lg-flex align-items-center">

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
