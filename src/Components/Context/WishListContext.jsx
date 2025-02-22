// WishListContext component

import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export let WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishList, setWishList] = useState([]);

  const headers = {
    token: localStorage.getItem('userToken')
  };

  async function addProductToWishList(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      );
      await getWishList();
      toast.success(data.message, {
        position: 'top-right'
      });
    } catch (err) {
      
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  }
  async function deleteProductFromWishList(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      await getWishList();
      
     toast.success(`${data.status}full Removal` , {
      duration : 1000 , 
      position: 'top-right'
     })
    } catch (err) {      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  }

async function getWishList() {

    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist' , {
      headers
    });
    setWishList(data); 
  
}

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <WishListContext.Provider value={{ addProductToWishList, wishList , deleteProductFromWishList }}>
      {children}
    </WishListContext.Provider>
  );
}
