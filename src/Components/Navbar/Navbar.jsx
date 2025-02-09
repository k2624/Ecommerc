import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext.jsx'
import { CartContext } from '../Context/CartContext.jsx'
import { jwtDecode } from 'jwt-decode'
import { WishListContext } from '../Context/WishListContext.jsx'
export default function Navbar() {
  const {userToken , setUserToken} = useContext(UserContext);
  const {cart} = useContext(CartContext);
  const {wishList} = useContext(WishListContext);
  const [isOpen, setIsOpen] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  let navigate = useNavigate();
  const token =  localStorage.getItem('userToken');
  const decoded = jwtDecode(token);
  
  
  function logOut(){
    localStorage.removeItem('userToken');
          
    setUserToken(null);
    navigate('/login')
  }
  return <>

    <header className="bg-gray-200 fixed inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">

        <Link to={'home'} className="lg:pe-4">
          <span className="sr-only">Your Company</span>
          <img src={logo} width={120} alt='value' />
        </Link>
        <div onClick={() => setIsOpen(true)} className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-transparent hover:bg-gray-100">
            <span className="sr-only">Open main menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        {userToken && <div className="hidden lg:flex lg:gap-x-2 capitalize">

<NavLink to={'/'} className=" font-medium text-gray-900 ">home </NavLink>
<NavLink to={'cart'} className=" font-medium text-gray-900">cart </NavLink>
<NavLink to={'brands'} className=" font-medium text-gray-900">brands</NavLink>
<NavLink to={'categories'} className=" font-medium text-gray-900">categories</NavLink>
<NavLink to={'products'} className=" font-medium text-gray-900">products</NavLink>
</div>}

        <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-3">
        {userToken ? <>
          <NavLink to={'cart'} className=" font-medium text-gray-900"><i className="fa-solid fa-cart-shopping"></i><span>{cart?.numOfCartItems
          }</span>
          </NavLink>
          <NavLink to={'wishList'} className=" font-medium relative"><i className="fa-2x fa-solid fa-heart text-red-500"></i>
             <span className='text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 '>{wishList?.count}</span>
          </NavLink>
         <span onClick={()=> logOut()} className="cursor-pointer font-medium text-gray-900">Log Out</span> 
         <span className='px-3 rounded-lg text-white bg-main'>{decoded.name}</span>

        </> :
        
        <>
          <NavLink to={'register'} className=" font-medium text-gray-900">Register</NavLink>
          <NavLink to={'login'} className=" font-medium text-gray-900">Login <span aria-hidden="true">→</span></NavLink>

        </>
        }
         
        </div>
      </nav>

      <div className={isOpen ? "lg:hidden" : "hidden " } role="dialog" aria-modal="true">
       
        <div className="fixed inset-0 z-50 " />
        <div className="h-1/2 md:h-screen fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to={'/'} className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="" src={logo} width={120} alt="" />
            </NavLink>
            <div >
          {userToken ? <div className="gap-x-10 flex">
          <NavLink to={'cart'} className=" font-medium text-gray-900"><i className="fa-solid fa-cart-shopping"></i><span>{cart?.numOfCartItems
          }</span>
          </NavLink>
          <NavLink to={'wishList'} className=" font-medium relative"><i className="fa-2x fa-solid fa-heart text-red-500"></i>
             <span className='text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 '>{wishList?.count}</span>
          </NavLink>
        
         <span onClick={() => setShowMenu(!showMenu)} className='cursor-pointer px-3 rounded-lg text-white bg-main relative'>{decoded.name.slice("" , 1)}</span>
        {showMenu && ( <div className="absolute right-1/4 mt-9 bg-white rounded-lg shadow-lg border">
            <div className="px-4 py-2 mb-3 text-sm text-gray-700 border-b border-b-main">
              <p className="font-semibold my-3 text-main">{decoded.name}</p>
            </div>
            <span onClick={()=> logOut()} className=" p-4 text-center cursor-pointer font-medium text-gray-900">Log Out</span> 
            
          </div>) }
        </div> :
        
        <>
          <NavLink to={'register'} className=" font-medium text-gray-900">Register</NavLink>
          <NavLink to={'login'} className=" font-medium text-gray-900">Login <span aria-hidden="true">→</span></NavLink>

        </>
        }
          </div>
            <button onClick={() => setIsOpen(false)} type="button" className="-m-2.5  bg-transparent hover:bg-gray-100 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
          {userToken && <div className="space-y-2 py-6">
<NavLink to={'/'} className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50">home</NavLink>
<NavLink to={'cart'} className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50">cart</NavLink>
<NavLink to={'brands'} className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50">brands</NavLink>
<NavLink to={'categories'} className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50">categories</NavLink>
<NavLink to={'products'} className="block rounded-lg  text-base/7 font-medium text-gray-900 hover:bg-gray-50">products</NavLink>
</div>}    

         
            </div>
          </div>
        </div>
        
      </div>
    </header>

  </>
}
