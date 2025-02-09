import axios from 'axios';
import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
export let CartContext = createContext();
export default function CartContextProvider({children}) {
  const [cart , setCart] = useState(null);
  const headers = {
    token : localStorage.getItem('userToken')
  }
  async function addProductToCart(productId) {
    try{

        let {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
            productId
        },{
            headers
        });
       await getProductToCart()
       toast.success(data.message , {
        position: 'top-right'
       })
      console.log(cart);
      
      
    }catch(err){
      toast.error(err.message)
    }
  }
 
  async function getProductToCart() {
    try{
      if (!headers.token) return;
        const {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/cart` ,{
            headers
        });
       setCart(data);
    }catch(err){
      toast.error(err.message)
    }
  }
  async function updateProductCount(productId , count) {
    try{

      let {data} =await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
        count
      },{
          headers
      });
      setCart(data)
     toast.success(data.status , {
      duration : 1000 , 
      position: 'top-right'
     })
    
  }catch(err){
    toast.error(err.message)
  }
}
    
  async function deleteProduct(productId ) {
    try{

      let {data} =await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
          headers
      });
      setCart(data)
     toast.success(`${data.status}full Removal` , {
      duration : 1000 , 
      position: 'top-right'
     })
    
  }catch(err){
    toast.error(err.message)
  }
}

  async function clearAllProducts() {
    try {
      let {data} =await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,{
                  headers
              });
              console.log(data);
              
      setCart({...data, data: {...data.data, products: []}});
      toast.success(data.message , {
        position: 'top-right',
        duration : 1500
      });
    } catch(err) {
      
      toast.error(err?.message || 'Error clearing cart');
    }
  }
  
  useEffect(()=>{
    getProductToCart()
  },[])
  return <CartContext.Provider value={{addProductToCart , cart , clearAllProducts,  updateProductCount , deleteProduct }}>
    {children}
  </CartContext.Provider>
}
