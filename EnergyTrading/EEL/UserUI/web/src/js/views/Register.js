import React, { useState } from 'react'

import {  useNavigate ,Link} from 'react-router-dom';
const Register = () => {
  
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    city:'',
    zip:''
  });
  function generateUniqueNum() {
    const randomNum = Math.floor(Math.random() * 1000000);
    // const timestamp = new Date().getTime();
    return randomNum;
  }

  // Function to handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleFormSubmit = async() => {
    console.log('Form Data:', formData);
    const unum= generateUniqueNum()
    const user_code= await eel.get_mac_code(unum)();
   try {
    const dataToEncrypt = {
      username: formData.name,
      email: formData.email,
      password: formData.password,
      address:formData.address+","+formData.city+","+formData.zip+".",
      usercode:user_code.toString()
    };
    let uniqueID = localStorage.getItem('uniqueID');
    let key1=localStorage.getItem('key1').toString();
    let key2=localStorage.getItem('key2').toString();
    let key3=localStorage.getItem('key3').toString();
    console.log(dataToEncrypt)
    
    const msg = await eel.encrypt(JSON.stringify(dataToEncrypt), key1, key2, key3)();
    
    console.log(msg);
    const requestData={cid:uniqueID,msg:msg}
    try {
      const response = await fetch('http://127.0.0.1:8080/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        const dataa=await response.json()
        if(dataa["access_token"]){
        localStorage.setItem('access_token', dataa["access_token"]);
        localStorage.setItem('refresh_token', dataa["refresh_token"]);}
        console.log(dataa)
      } else {
        console.error('Failed to fetch data from the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    
    setFormData( {'name': '',
    'email': '',
    'password': '',
    'address': '',
    'city':'',
    'zip':''})
    navigate('/');
   } catch (error) {
    console.error('Error encrypting data:', error);
   }
  };
  return (
    <section className="vh-100 mt-3 ">
      <div className="container h-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register </p>
                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="form3Example1c" className="form-control" name="name"
                            value={formData.name}
                            onChange={handleInputChange} />
                          <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="email" id="form3Example3c" className="form-control" name="email"
                            value={formData.email}
                            onChange={handleInputChange} />
                          <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                        </div>
                      </div>
                      
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="form3Example4cd" className="form-control" name="address"
                            value={formData.address}
                            onChange={handleInputChange} />
                          <label className="form-label" htmlFor="form3Example4cd">Address</label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="form3Example4cd" className="form-control" name="city"
                            value={formData.city}
                            onChange={handleInputChange} />
                          <label className="form-label" htmlFor="form3Example4cd">City</label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="form3Example4cd" className="form-control" name="zip"
                            value={formData.zip}
                            onChange={handleInputChange} />
                          <label className="form-label" htmlFor="form3Example4cd">Zip</label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4c" className="form-control" name="password"
                            value={formData.password}
                            onChange={handleInputChange} />
                          <label className="form-label" htmlFor="form3Example4c">Create a Password</label>
                        </div>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                        <label className="form-check-label" htmlFor="form2Example3">
                          Already have an account ? <Link to="/Login">Click here to Login</Link>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="button" className="btn btn-primary btn-lg" onClick={handleFormSubmit}>Register</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
