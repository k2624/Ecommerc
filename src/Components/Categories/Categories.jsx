import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Loading from '../Loading/Loading';

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  
    const [loading, setLoading] = useState(true);
const [selectedCategory, setSelectedCategory] = useState(null)
  async function getCategories() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategories(data.data);
    setLoading(false)
  }
  
  useEffect(()=>{
    getCategories();
  },[])
  return <>
  {loading ? <Loading/> : <>

              <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3">
              {categories.map((category , index) => 

                <div className="my-3 product rounded-xl" onClick={()=> setSelectedCategory(category)} key={index}>
                  <img src={category.image}   className='rounded-t-xl h-80 w-full object-cover object-top' alt={category.name} />
                  <h3 className='text-center text-main font-bold my-10 text-xl'>{category.name}</h3>
                </div>
              )}
              </div>
              {
                selectedCategory &&     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
            <button
              className="absolute top-2 right-3 text-gray-500 text-xl"
              onClick={() => setSelectedCategory(null)}
            >
              <i className='fas fa-close text-white'></i>
            </button>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                src={selectedCategory.image}
                alt={selectedCategory.name}
                className="w-1/2 object-top object-cover rounded-lg"
              />
              <div>
                <h2 className="text-green-600 text-2xl font-bold">{selectedCategory.name}</h2>
                <h3 className="text-gray-500">{selectedCategory.slug}</h3>
              </div>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>}
  </>}
  </>
}
