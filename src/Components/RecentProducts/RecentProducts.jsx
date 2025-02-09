import React, { useState, useEffect } from "react";
import style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from '../Loading/Loading'

import { useContext } from "react";
import {CartContext} from "../Context/CartContext";
import { WishListContext } from "../Context/WishListContext";
export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  let {addProductToCart} = useContext(CartContext);
  let {addProductToWishList , wishList , deleteProductFromWishList} = useContext(WishListContext)
  let [search , setSearch] = useState("") 
  async function getProducts() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setProducts(data?.data);
    setLoading(false);
  }
  useEffect(() => {
    getProducts();
  }, []);
  const filterProducts = products.filter((product)=>
  product.title.toLowerCase().includes(search.toLowerCase())
  );
  const isInWishList = (productId) => {
    return wishList?.data?.some(item => item.id === productId)
  }

  return (
    <>
    <div className="container mx-auto">
    <input type="text" name="result" placeholder="search....." className="w-full p-2 my-4 border border-gray-300 rounded-md" value={search} onChange={(e) => setSearch(e.target.value)} />
      {loading ? <Loading/> : 
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 py-8">
          {filterProducts.map((product) =>
            <div className="w-full relative" key={product.id}>
              <div className="product bg-transparent py-4 px-2 rounded-lg">
            <Link to={`/productDetails/${product.id}`}>
                <img src={product.imageCover} className="w-full" alt={product.title} />
                <h3 className="text-main">{product.category.name}</h3>
                <h3>{product.title.split(' ' , 2).join(' ')}</h3>
                <div className="flex justify-between">
                  <span>{product.price} EGP</span>
                  <span ><i className="fas fa-star rating-color"></i> {product.ratingsAverage}</span>
                </div>
            </Link>

                <button className="btn w-full" onClick={ () => addProductToCart(product.id)} >Add To Cart</button>
                <button onClick={()=> isInWishList(product.id) ?
                 deleteProductFromWishList(product.id) :
                 addProductToWishList(product.id)}
                 className="focus:ring-0 bg-transparent hover:bg-transparent absolute top-0 right-0">
                <i className={`fas fa-heart fa-2xl ${isInWishList(product.id) ? 'text-red-600' : 'text-gray-400'} `}></i>
                </button>
               </div>

            </div>
          )}
        </div>
      }
    </div>
    </>
  );
}
