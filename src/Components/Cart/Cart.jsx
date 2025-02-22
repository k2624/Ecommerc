import React from 'react'
import style from './Cart.module.css'
import { CartContext } from '../Context/CartContext'
import { useContext } from 'react'
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function Cart() {
  let {cart , updateProductCount , deleteProduct , clearAllProducts}= useContext(CartContext);
  
  return <div className='container mx-auto'>

  {  cart?.data?.products?.length > 0 ? <div>

    <h2 className='text-center mb-5'>Cart</h2>
    <div className="d-flex justify-content-between mb-4">
         <Link to="/products" className="btn btn-outline-main">
            Continue Shopping
          </Link>
          <button 
            onClick={clearAllProducts}
            className="btn btn-outline-danger"
          >
            Clear Entire Cart
          </button>
        </div> 
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="  w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="opacity-0 md:opacity-100 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          remove
        </th>
     
      </tr>
    </thead>
    <tbody>
   
    {cart.data.products.map((item , index) =>  
      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.product.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.product.title}
        </td>
       
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=> item.count === 1 ? deleteProduct(item.product.id) : updateProductCount(item.product.id , item.count-1)}  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {item.count}
              </span>
            </div>
            <button onClick={()=> updateProductCount(item.product.id , item.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.price * item.count}
        </td>
        <td className="px-6 py-4 ">
          <button onClick={()=> deleteProduct(item.product.id)} className="font-medium  bg-transparent hover:bg-transparent text-red-600 dark:text-red-500 hover:underline">Remove</button>
        </td>      
      </tr>
      
    
    )}
    </tbody>
  </table>
</div>
    <div className="flex justify-between mt-9">
      <h2 className='text-2xl font-bold'>Total Price : {cart.data.totalCartPrice}</h2>
    <Link to={'/checkOut'}> <button>Check Out</button> </Link>
    </div> 
    </div> 
    : cart?.data?.products?.length === 0 ? (
      <div className="text-center py-5">
        <h3 className='mb-5'>Your cart is empty</h3>
        <span>(click here) <i className='fas fa-arrow-right me-5'></i></span>
        <Link to="/products" className="btn btn-main mt-3 text-main hover:underline">
          Start Shopping    
        </Link>

      </div>
    )   : <Loading/>
  }


  </div>
}




