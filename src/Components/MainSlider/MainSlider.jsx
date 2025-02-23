import React from "react";
const slide1 = `${import.meta.env.BASE_URL}assets/images/slider-image-1.jpeg`;
const slide2 = `${import.meta.env.BASE_URL}assets/images/slider-image-2.jpeg`;
const slide3 = `${import.meta.env.BASE_URL}assets/images/slider-image-3.jpeg`;
const banner1 = `${import.meta.env.BASE_URL}assets/images/banner-4.jpeg`;
const banner2 = `${
  import.meta.env.BASE_URL
}assets/images/grocery-banner-2.jpeg`;

import Slider from "react-slick";

// زر السابق
const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
    onClick={onClick}
  >
    ❮
  </button>
);

// زر التالي
const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
    onClick={onClick}
  >
    ❯
  </button>
);

export default function MainSlider() {
  var settings = {
    autoplay: true,
    DragEvent,
    autoplaySpeed: 2000,
    arrows: true,
    slidesToShow: 1,
    infinite: true,
    speed: 700,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="flex mb-10 relative">
      <div className="w-3/4 relative">
        <Slider {...settings}>
          <img
            src={slide1}
            className="w-full object-cover object-right h-[400px]"
          />
          <img
            src={slide2}
            className="w-full object-cover object-right h-[400px]"
          />
          <img
            src={slide3}
            className="w-full object-cover object-right h-[400px]"
          />
        </Slider>
      </div>
      <div className="w-1/4">
        <img src={banner1} className="w-full object-cover h-[200px]" />
        <img
          src={banner2}
          className="w-full object-cover object-right h-[200px]"
        />
      </div>
    </div>
  );
}
