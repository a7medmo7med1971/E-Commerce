import axios from 'axios'
import React, { Children, createContext } from 'react'


export  let contextWshlist=createContext()

export default function ContextWshlist({children}) {


let token=localStorage.getItem("token")
async function postWshlist(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{headers:{token}})
    .then((res)=>{
        console.log(res.data)
         return true
    }).catch((erorr)=>{
        console.log(erorr)
        return false
    })
}




  return <contextWshlist.Provider value={{postWshlist,token}}>
  
  {children}
  </contextWshlist.Provider>
}
