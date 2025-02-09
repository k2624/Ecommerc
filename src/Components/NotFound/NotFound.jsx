import React from 'react'
import style from './NotFound.module.css'
import logo1 from '../../assets/images/error.svg'

export default function NotFound() {
  
  return <>
    <div className="flex justify-evenly flex-wrap">
      <div className="md:w-6/12">
        <img src={logo1} alt="logo" className='w-full' />
      </div>
    </div>
  </>
}
