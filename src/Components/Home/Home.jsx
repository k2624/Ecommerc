import React, { useEffect, useState } from 'react'
import RecentProducts from '../RecentProducts/RecentProducts'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider.jsx'




export default function Home() {


  return <div className='gap-y-20 container mx-auto'>
    
    <MainSlider/>
    <CategorySlider/>
    <RecentProducts/>
  </div>
}
