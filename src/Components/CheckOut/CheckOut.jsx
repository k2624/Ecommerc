import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext.jsx';
import toast from 'react-hot-toast';


export default function CheckOut() {
  const [apiError, setApiError] = useState(null);
  const [loading , setLoading] = useState(false);
  const {cart} = useContext(CartContext);
  const headers = {
    token : localStorage.getItem('userToken')
  };
  async function CheckOut(shippingAddress) {
    try {
      setLoading(true);
      const callbackUrl = `${window.location.origin}`;
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=${callbackUrl}`,
        { shippingAddress },
        { headers }
      );
      toast.success('Checkout Successful');
      window.location.href = data.session.url;
    } catch (err) {
      setApiError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }
  
  

  let validationSchema = Yup.object().shape({
    details: Yup.string().min(10 , 'address must be at least 10 characters').required('details is required'),
     phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Invalid phone number , We need Egyption one').required('phone number is required'),
     city: Yup.string().required('city is required'),
  
  })
  let formik= useFormik({
    initialValues:{
      details : '',
      phone : '',
      city: ''
    },
    validationSchema,
    onSubmit : CheckOut
  })
  return <>
    <h2 className='mb-5'>CheckOut</h2>
    <form className='md:w-1/2 mx-auto' onSubmit={formik.handleSubmit}>
    {apiError &&
     <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {apiError}
    </div>
    }
    
    <div className="relative z-0 w-full mb-5 group">
  <input  onBlur={formik.handleBlur} value={formik.values.city} onChange={formik.handleChange} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-main dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
  <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your city</label>
</div>
{formik.errors.city && formik.touched.city &&
     <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.city}
    </div>
 }



 <div className="relative z-0 w-full mb-5 group">
  <input  onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-main dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
  <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>
</div>
{formik.errors.phone && formik.touched.phone &&
     <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.phone}
    </div>
    }





 <div className="relative z-0 w-full mb-5 group">
<label htmlFor="details"></label>
<textarea onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='details' id='details' className="w-full p-4 border-2 border-main rounded-lg focus:border-main  transition-all duration-200 placeholder-gray-400 placeholder:italic disabled:bg-gray-100 disabled:cursor-not-allowed resize-y shadow-sm" rows="4" placeholder="write Your Address here"></textarea>
</div>
{formik.errors.details && formik.touched.details &&
     <div className="px-4 py-2 mb-5 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.details}
    </div>
}







{loading ? <button type="button"><i className='fas fa-spin fa-spinner'></i></button>
      :
      <button type='submit' className='ring-blue-300 w-full'>Pay Now</button>

      }
     
    </form>

  </>
}
