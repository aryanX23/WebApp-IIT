import React, { useEffect } from 'react'

import * as AOS from 'aos/dist/aos.js';
import { Link } from 'react-router-dom';
function Card({ title, desc, tag, tolink, img,b1,b2 }) {
  useEffect(() => {

    AOS.init({ duration: 500 });
  }, [])
  return (
    <div data-aos="fade-left">
      <div className="card mb-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded" style={{ maxWidth: "1240px" }}>
        <div className="row g-0">

          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{desc}</p>
              <p className="card-text"><small className="text-body-secondary">{tag}</small></p>
              {/* <Link to={tolink} className="btn btn-primary">Explore More!!</Link> */}
              {/* <button type="button" className="btn btn-primary btn-lg">Large button</button> */}
              <div className="d-grid gap-2">
                <Link to={tolink} className="btn btn-outline-dark" type="button">{b1}</Link>
                <Link to={tolink} className="btn btn-outline-dark" type="button">{b2}</Link>
              </div>

            </div>
          </div>
          <div className="col-md-4">
            {/* <img src="https://media.istockphoto.com/id/1156740048/vector/dashboard-great-design-for-any-site-purposes-business-infographic-template-vector-flat.jpg?s=612x612&w=0&k=20&c=0fPeh8a9ODDMvPk-3o9g5F-JRpt8d2lWIKCrXf_Yjv8=" className="img-fluid rounded-start" alt="..." /> */}
            <img style={{ height: "260px", width: "600px" }} src={img} className="img-fluid rounded  " alt="..." />
          </div>


        </div>
      </div>
    </div>
  )
}

export default Card
