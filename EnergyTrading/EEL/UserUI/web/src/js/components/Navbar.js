import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
function Navbar({ accessToken, setAccessToken }) {
  const navigate = useNavigate();
  function generateUniqueID() {
    const randomNum = Math.floor(Math.random() * 1000000);
    const timestamp = new Date().getTime();
    return `client_${timestamp}_${randomNum}`;
  }

  // Function to get or generate a unique ID and store it in localStorage
  function getOrCreateUniqueID() {
    let uniqueID = localStorage.getItem('uniqueID');
    if (!uniqueID) {
      uniqueID = generateUniqueID();
      localStorage.setItem('uniqueID', uniqueID);
    }
    return uniqueID;
  }


  const handleRegisterButtonClick = async () => {
    const id = getOrCreateUniqueID();

    console.log("i am clicked")
    const [public_key_a, public_key_b, public_key_c, client_primitive_root_a, client_primitive_root_b, client_primitive_root_c, client_prime_a, client_prime_b, client_prime_c, private_a, private_b, private_c] = await new Promise((resolve) => {
      eel.keygeneration()(resolve);
    });
    // console.log(public_key_a, public_key_b, public_key_c,client_primitive_root_a,client_primitive_root_b,client_primitive_root_c,client_prime_a,client_prime_b,client_prime_c, private_a, private_b, private_c)
    const requestData = { uid: id, c_k1: public_key_a, c_k2: public_key_b, c_k3: public_key_c };
    // console.log(public_key_a)
    try {
      const response = await fetch('http://127.0.0.1:8080/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("data", data)
        const server_pub_a = data["s_key1"]
        const server_pub_b = data["s_key2"]
        const server_pub_c = data["s_key3"]


        console.log("keys received from server")


        // console.log(server_public_a,server_public_b,server_public_c)
        const [shared_a, shared_b, shared_c] = await new Promise((resolve) => {
          eel.sharedkeygenration(server_pub_a, private_a, client_primitive_root_a, client_prime_a, server_pub_b, private_b, client_primitive_root_b, client_prime_b, server_pub_c, private_c, client_primitive_root_c, client_prime_c)(resolve);
        });
        console.log("shared keys generated ")
        console.log(shared_a, shared_b, shared_c)
        localStorage.setItem('key1', shared_a);
        localStorage.setItem('key2', shared_b);
        localStorage.setItem('key3', shared_c);
        navigate('/Login');
      } else {
        console.error('Failed to fetch data from the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };
  const handleRefresh = async () => {
    const refreshToken = localStorage.getItem('refresh_token');;

    fetch('http://127.0.0.1:8080/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const newAccessToken = data.access;
        localStorage.setItem('access_token', newAccessToken);
        console.log('New Access Token:', newAccessToken);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  const handleTest = () => {
    const accessToken = localStorage.getItem('access_token');;

    fetch('http://127.0.0.1:8080/api/tokentest/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(async (response) => {
        if (response.status === 401) {
          console.log('Unauthorized - Token is invalid or expired');
          console.log(response.json());
          handleRefresh()

          // Handle unauthorized user
        } else if (response.status === 200) {
          ress = await response.json()
          console.log(ress);
          console.log("token is valid")
        } else {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          console.log("other")
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken(null);
    navigate('/');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Energy Trade!!!</Link>
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
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Monitoring and Control
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/Monitor">Load Monitoring</Link></li>
                  <li><Link className="dropdown-item" to="#">Energy Monitoring</Link></li>
                  <li><Link className="dropdown-item" to="#">Energy Management</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Energy MarketPlace
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="#">Buy bid</Link></li>
                  <li><Link className="dropdown-item" to="#">Sell bid</Link></li>
                  <li><Link className="dropdown-item" to="#">Transaction History</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Forcasting
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="#">Load</Link></li>
                  <li><Link className="dropdown-item" to="#">Energy</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="#">
                  Help
                </Link>
              </li>
              <button className="btn btn-dark d-lg-none" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" >
                Register
              </button>
            </ul>
          </div>


          {/* <div className="d-none d-lg-flex align-items-center">
            <button className="btn btn-dark" onClick={handleRefresh}>Refresh</button>
          </div>
          <div className="d-none d-lg-flex align-items-center">
            <button className="btn btn-dark" onClick={handleTest}>Test</button>
          </div> */}
          {accessToken ? (<div className="d-none d-lg-flex align-items-center">
            <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
          </div>) : (<div className="d-none d-lg-flex align-items-center">
            <button className="btn btn-dark" onClick={handleRegisterButtonClick}>Login</button>
          </div>)}


        </div>
      </nav>
    </div>
  )
}

export default Navbar;
