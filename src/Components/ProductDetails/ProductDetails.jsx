import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Loading from '../Loading/Loading'
import { CartContext } from "../Context/CartContext";
import { WishListContext } from "../Context/WishListContext";

export default function ProductDetails() {
  var settings = {
    autoplay: true,
    autoplaySpeed : 3000,
    arrows: false,
  
    infinite: true,
    speed: 400,
  };
  let navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  let { addProductToCart  }= useContext(CartContext);
  let { id } = useParams();
  let {addProductToWishList , wishList , deleteProductFromWishList} = useContext(WishListContext);
  
  async function getProductDetails(productId) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    setProducts(data.data);
    setLoading(false);
  }
  useEffect(() => {
    getProductDetails(id);
  }, []);
  const isInWishList = (productId) => {
    return wishList?.data?.some(item => item.id === productId)
  }

  return (
    <>
  
      <div className="mx-auto container">
        {loading ? <Loading/> :  <>

            <i className="fas fa-close fa-2xl my-3 me-4 cursor-pointer flex flex-row-reverse text-main" onClick={()=> navigate(`/`)}></i>
          <div className="md:flex p-8 items-center mx-auto">
            <div className="md:w-1/4 mx-auto w-full">
            <Slider {...settings}>
              {products.images.map((image , index) => 
                <img src={image} key={index} className="w-full mb-9 md:mb-0 mx-auto" alt={products.title} />
              )}
            </Slider>
            
            </div>
            <div className="md:w-3/4 ps-0 md:ps-20 mx-auto ">
             
              <h2 className="font-semibold">{products.title}</h2>
              <p className="my-2 text-gray-600">{products.description}</p>
              <p className="my-2">{products.category.name}</p>
              <div className="flex justify-between items-center">
                <span>{products.price} EGP</span>
                <span>
                  <i className="fas fa-star rating-color"></i>{" "}
                  {products.ratingsAverage}
                </span>
                <button onClick={()=> isInWishList(products.id) ?
                 deleteProductFromWishList(products.id) :
                 addProductToWishList(products.id)}
                 className="focus:ring-0 bg-transparent hover:bg-transparent">
                <i className={`fas fa-heart fa-2xl ${isInWishList(products.id) ? 'text-red-600' : 'text-gray-400'} `}></i>
                </button>
              </div>
              <button className="btn capitalize w-full mt-5 " onClick={()=> addProductToCart(products.id)}>add to cart</button>
             
            </div>
          </div>
        </>
    }
      </div>
   
    </>
  );
}
