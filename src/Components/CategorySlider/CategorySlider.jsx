import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios';
import Slider from 'react-slick';

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategories(data.data);
  }
  var settings = {
    autoplay: true,
    autoplaySpeed : 1000,
    arrows: false,
  slidesToShow : 5,
    infinite: true,
    speed: 700,
    swipeToSlide:true
  };
  useEffect(()=>{
    getCategories();
  },[])
  return <>
  <h2 className='font-mono'>Shop Popular Categories</h2>
  <Slider {...settings}>
              {categories.map((category , index) => 
                <div className="my-3" key={index}>
                  <img src={category.image} className='h-[200px] w-full object-cover object-top' alt={category.name} />
                <h3 className='text-center'>{category.name}</h3>
                </div>
              )}
  </Slider>
  </>
}
