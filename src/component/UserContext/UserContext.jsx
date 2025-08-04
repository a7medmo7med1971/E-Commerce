import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
//create contesxt
export let userContext= createContext()

export default function UserContext({children}) {
const[token,setToken]=useState(null)

useEffect(()=>{
  if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'))
  }
},[])



  return <userContext.Provider value={{token,setToken}}>
  {children}
  </userContext.Provider>
}
