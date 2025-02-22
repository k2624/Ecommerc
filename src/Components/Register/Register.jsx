import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../Context/UserContext.jsx'

export default function Register() {
  const [apiError, setApiError] = useState(null);
  const [loading , setLoading] = useState(false);
  let {setUserToken} = useContext(UserContext);
  let navigate = useNavigate();
  async function register(values) {
    try{
      setLoading(true)
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
      console.log(data);
      localStorage.setItem('userToken' , data.token);
      setUserToken(data.token)
    navigate('/');
    }catch(err){
      setLoading(false)
      setApiError(err.response.data.message);
    }
  }
  

  let validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3 , "the minimum lenth of character is three").max(
      16, 'the maximum lenth of character is sixteen'
    ),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password should be at least 8 characters long').required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Invalid phone number , We need Egyption one'),
  })
  let formik= useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
    },
    validationSchema,
    onSubmit : register
  })
  return <>
    <h2>Register</h2>
    <form className='md:w-1/2 mx-auto' onSubmit={formik.handleSubmit}>
    {apiError &&
     <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {apiError}
    </div>
    }
    
    <div className="relative z-0 w-full mb-5 group">
  <input onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-main dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
  <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Name</label>
</div>   
    
    {formik.errors.name && formik.touched.name &&
     <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.name}
    </div>
    }
    


    <div className="relative z-0 w-full mb-5 group">
  <input  onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-main dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
  <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Email</label>
</div>
{formik.errors.email && formik.touched.email &&
     <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.email}
    </div>
    }

<div className="relative z-0 w-full mb-5 group">
  <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-main dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
  <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Password</label>
</div>
{formik.errors.password && formik.touched.password &&
     <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.password}
    </div>
    }
<div className="relative z-0 w-full mb-5 group">
  <input onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-main dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
  <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Repeat the same password</label>
</div>
{formik.errors.rePassword && formik.touched.rePassword &&
     <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.rePassword}
    </div>
    }

<div className="relative z-0 w-full mb-5 group">
  <input onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-main dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
  <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">the phone number please</label>
</div>

{formik.errors.phone && formik.touched.phone &&
     <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.phone}
    </div>
    }

    
      {loading ?  <button type="button"><i className='fas fa-spin fa-spinner'></i></button>
      :
      <button type='submit' className='bg-main w-1/6'>Submit</button>

      }
     
    </form>

  </>
}
