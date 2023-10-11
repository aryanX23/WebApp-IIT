import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
function Entry() {
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
    const [public_key_a, public_key_b, public_key_c,client_primitive_root_a,client_primitive_root_b,client_primitive_root_c,client_prime_a,client_prime_b,client_prime_c, private_a, private_b, private_c] = await new Promise((resolve) => {
      eel.keygeneration()(resolve);
    });
    // console.log(public_key_a, public_key_b, public_key_c,client_primitive_root_a,client_primitive_root_b,client_primitive_root_c,client_prime_a,client_prime_b,client_prime_c, private_a, private_b, private_c)
    const requestData = { uid: id, c_k1: public_key_a, c_k2: public_key_b, c_k3: public_key_c  };
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
          eel.sharedkeygenration(server_pub_a, private_a,  client_primitive_root_a,client_prime_a, server_pub_b, private_b, client_primitive_root_b,client_prime_b, server_pub_c, private_c, client_primitive_root_c,client_prime_c)(resolve);
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
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <button className="btn btn-dark btn-lg" onClick={handleRegisterButtonClick}>Continue to Register/Login</button>
    </div>
  )
}

export default Entry
