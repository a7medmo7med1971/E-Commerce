import axios from 'axios'
import React, { createContext } from 'react'


   export   let contextCarts=createContext()
   
   export default function ContextCart({children}) {
    //creatContext
    let token=localStorage.getItem("token")
    // creatFunctionPostInCarts
     async function addToCart(productId) {
      return  await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},
            {headers:
            {
            token:token
            }
            }
        ).then((res)=>{
            console.log(res)
            return true
        }).catch((error)=>{
            console.log(error)
            return false
        })
     }
       

  return <contextCarts.Provider value={{addToCart,token}}>
  {children}
  </contextCarts.Provider>

}
