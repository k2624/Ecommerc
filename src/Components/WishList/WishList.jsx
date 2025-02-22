import React, { useContext } from 'react';
import style from './WishList.module.css';
import { WishListContext } from '../Context/WishListContext';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';

export default function WishList() {
  let { wishList, deleteProductFromWishList } = useContext(WishListContext);
  const token = localStorage.getItem('userToken');
  let navigate = useNavigate();
  const decoded = jwtDecode(token);

  return (
    <div className=' container mx-auto'>
      <h1 className="text-center font-bold text-2xl my-4">
        Welcome {decoded.name} to your Wishlist
      </h1>
      <div className="pb-40">
      {wishList && wishList.count > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-200">
        
            {wishList.data?.map((product) => (
              <tr key={product.id} className="text-center flex md:table-row">
                <td className="border p-2 ">
                <Link to={`/productDetails/${product.id}`}>
                  <img src={product.imageCover} className="w-32 mx-auto" alt={product.slug} />
                </Link>
                </td>
                <td  className="border p-2">{product.title.split(' ' , 5).join(' ')}</td>
                <td className="border p-2">{product.price} EGP
                <blockquote className='mt-3'>{product.ratingsAverage} <i className='fas fa-star rating-color'></i> </blockquote>
                </td>
                <td className="border py-2 ps-6">
                <Link to={`/brand-detail/${product.brand._id}`}>
                  <img className='w-32' src={product.brand.image} alt="" />
                </Link>
                </td>
                <td className="border py-2 ps-6"><h3>{product.category.name}</h3></td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteProductFromWishList(product.id)}
                    className="text-red-600  bg-transparent hover:bg-transparent hover:text-red-800"
                  >
                    <i className="fas fa-trash-can fa-xl pe-3"></i> Remove
                  </button>
                </td>
              </tr>
            ))}
        </table>
      ) : (
        <p className="text-center text-gray-500 my-6">Your wishlist is empty.</p>
      )}

      </div>
    </div>
  );
}
