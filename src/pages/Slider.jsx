import React from 'react'

const Slider = () => {
  return (
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src={require('../assests/F.jpg')} class="d-block w-100" height="550x"/>
      </div>
      <div class="carousel-item">
      <img src={require('../assests/E.jpg')} class="d-block w-100" height="550px"/>
      </div>
      <div class="carousel-item">
      <img src={require('../assests/B.jpeg')} class="d-block w-100" height="550px"/>
      </div>
      <div class="carousel-item">
      <img src={require('../assests/C.jpg')} class="d-block w-100" height="550px"/>
      </div>
      <div class="carousel-item">
      <img src={require('../assests/D.png')} class="d-block w-100" height="550px"/>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  )
}

export default Slider
