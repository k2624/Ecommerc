import React, { createContext, useState } from 'react'
import { useEffect } from 'react';
export let UserContext = createContext(); 
export default function UserContextProvider({children}) {
    const [userToken , setUserToken] = useState(null);
    
    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            setUserToken(localStorage.getItem('userToken'));
        }
    }, []);
    
  
  return <UserContext.Provider value={{userToken , setUserToken}}>
  {children}
  </UserContext.Provider>
  
}
