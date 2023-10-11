import React from 'react'

function Carousel() {
  return (
    <div>
    <div id="carouselExampleCaptions" className="carousel slide">
<div className="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div className="carousel-inner">
  <div className="carousel-item active">
    <img style={{ height:"500px" }} src="https://montanafreepress.org/wp-content/uploads/2023/02/Untitled-design-315.png" className="d-block w-100" alt="..."/>
    <div className="carousel-caption d-none d-md-block">
      <h5>First slide label</h5>
      <p>Some representative placeholder content for the first slide.</p>
    </div>
  </div>
  <div className="carousel-item">
    <img style={{ height:"500px" }} src="https://cdn.pixabay.com/photo/2017/03/28/12/05/windmills-2181904_640.jpg" className="d-block w-100" alt="..."/>
    <div className="carousel-caption d-none d-md-block">
      <h5>Second slide label</h5>
      <p>Some representative placeholder content for the second slide.</p>
    </div>
  </div>
  <div className="carousel-item">
    <img style={{ height:"500px" }} src="https://media.istockphoto.com/id/934147490/photo/candlestick-stock-exchange-background.jpg?s=612x612&w=0&k=20&c=OIfv-H2gMp_GdlPdv8kWLzydC2y3SpA8YOxQmu8W2IQ=" className="d-block w-100" alt="..."/>
    <div className="carousel-caption d-none d-md-block">
      <h5>Third slide label</h5>
      <p>Some representative placeholder content for the third slide.</p>
    </div>
  </div>
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>
</div>
    </div>
  )
}

export default Carousel

{/* <div id="carouselExampleCaptions" className="carousel slide">
<div className="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div className="carousel-inner">
  <div className="carousel-item active">
    <img style={{ height:"500px" }} src="https://montanafreepress.org/wp-content/uploads/2023/02/Untitled-design-315.png" className="d-block w-100" alt="..."/>
    <div className="carousel-caption d-none d-md-block">
      <h5>First slide label</h5>
      <p>Some representative placeholder content for the first slide.</p>
    </div>
  </div>
  <div className="carousel-item">
    <img style={{ height:"500px" }} src="https://cdn.pixabay.com/photo/2017/03/28/12/05/windmills-2181904_640.jpg" className="d-block w-100" alt="..."/>
    <div className="carousel-caption d-none d-md-block">
      <h5>Second slide label</h5>
      <p>Some representative placeholder content for the second slide.</p>
    </div>
  </div>
  <div className="carousel-item">
    <img style={{ height:"500px" }} src="https://media.istockphoto.com/id/934147490/photo/candlestick-stock-exchange-background.jpg?s=612x612&w=0&k=20&c=OIfv-H2gMp_GdlPdv8kWLzydC2y3SpA8YOxQmu8W2IQ=" className="d-block w-100" alt="..."/>
    <div className="carousel-caption d-none d-md-block">
      <h5>Third slide label</h5>
      <p>Some representative placeholder content for the third slide.</p>
    </div>
  </div>
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>
</div> */}
