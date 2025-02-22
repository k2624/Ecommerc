
import style from './Login.module.css'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../Context/UserContext.jsx'


export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [loading , setLoading] = useState(false);
  let navigate = useNavigate();
  const {setUserToken} = useContext(UserContext);
  async function login(values) {
    try{
      setLoading(true)
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
      console.log(data);
      localStorage.setItem('userToken' , data.token);
      setUserToken(data.token);
      navigate('/');
    }catch(err){
      setLoading(false)
      setApiError(err.response.data.message);
    }
  }
  

  let validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password should be at least 8 characters long').required('Password is required'),
  
  })
  let formik= useFormik({
    initialValues:{
   
      email:'',
      password:'',
     
    },
    validationSchema,
    onSubmit : login
  })
  return <>
    <h2 className='mb-5'>Login</h2>
    <form className='md:w-1/2 mx-auto' onSubmit={formik.handleSubmit}>
    {apiError &&
     <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {apiError}
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

      {loading ?  <button type="button"><i className='fas fa-spin fa-spinner'></i></button>
      :
      <button type='submit' className='bg-main w-1/6'>Submit</button>

      }
     
    <Link to='/forget-password'>
      <h1 className='text-main'>forgotten password ? </h1>
    </Link>
    </form>
    
  </>
}
