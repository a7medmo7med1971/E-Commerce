import React from 'react';
import Slider from "react-slick";
import slide1 from './image/slider-image-1.jpeg';
import slide2 from './image/slider-image-2.jpeg';
import slide3 from './image/slider-image-3.jpeg';
import img1 from './image/grocery-banner.png';
import img2 from './image/grocery-banner-2.jpeg';

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 2,
    cssEase: "linear",
    pauseOnHover: false,
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 p-5">
      {/* Main Slider */}
      <div className="overflow-hidden rounded-xl shadow-md">
        <Slider {...settings}>
          <div>
            <img src={slide1} className="w-full h-[300px] object-cover " alt="Slide 1" />
          </div>
          <div>
            <img src={slide2} className="w-full h-[300px] object-cover " alt="Slide 2" />
          </div>
          <div>
            <img src={slide3} className="w-full h-[300px] object-cover" alt="Slide 3" />
          </div>
        </Slider>
      </div>

      {/* Side Banners */}
      <div className="flex flex-col gap-4">
        <img src={img1} className="w-full h-[145px] object-cover rounded-xl shadow-md" alt="Banner 1" />
        <img src={img2} className="w-full h-[145px] object-cover rounded-xl shadow-md" alt="Banner 2" />
      </div>
    </div>
    </div>
  );
}
