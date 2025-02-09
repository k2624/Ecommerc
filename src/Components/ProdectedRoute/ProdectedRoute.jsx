import React from 'react'
import style from './ProdectedRoute.module.css'
import { Navigate } from 'react-router-dom';

export default function ProdectedRoute({children}) {
  if (localStorage.getItem('userToken')) {
    return children;
  }else{
   return <Navigate to={'/login'}/>;
  }
 
}

