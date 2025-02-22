import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function Brands() {
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(true);
  let [search , setSearch] = useState("") 
  async function getBrands() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    setBrand(data?.data);
    setLoading(false);
  }
  useEffect(() => {
    getBrands();
  }, []);
  const filterBrands = brand.filter((brand)=>
    brand?.name.toLowerCase().includes(search.toLowerCase())
    );
  return <>
       <div className="container mx-auto">
     <input type="text" name="result" placeholder="search....." className="w-full p-2 my-4 border border-gray-300 rounded-md" value={search} onChange={(e) => setSearch(e.target.value)} />
      {loading ? <Loading/> : 
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-8">
        <div className=" py-4 px-2 rounded-lg">
              <h2 className='text-main font-bold mb-5'>Our Brands</h2>
               <h3 className='text-2xl text-gray-400 font-mono '>You can see our brands and each brand includes the products in it</h3>
              </div>
        {filterBrands.map((brand) =>
            <div className="w-full" key={brand._id}>
        <Link to={`/brand-detail/${brand._id}`}>
              <div className="product py-4 px-2 rounded-lg">
               <img src={brand.image} alt={brand.slug} />
               <h3 className='font-bold text-center text-main'>{brand.name}</h3>
              </div>


        </Link>
            </div>
          )}
        </div>
      }
    </div>
  </>
}
