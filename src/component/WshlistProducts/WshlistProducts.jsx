import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { contextWshlist } from '../ContextWshlist/ContextWshlist'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function WshlistProducts() {
    let {token}=useContext(contextWshlist)
     const queryClient = useQueryClient();

async function getAllWshlist() {
 return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers:{token}})
    
}
let{data,isLoading}=useQuery({
    queryKey:["AllWshlist"],
    queryFn:getAllWshlist,
   select:(res)=>res?.data.data
})

async function removeWshlist(id) {
 return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers:{token}})
    
}
const { mutate, isLoading: isRemoving } = useMutation({
  mutationFn: (id) => removeWshlist(id),
  onSuccess: () => {
    queryClient.invalidateQueries(["AllWshlist"]);
            toast.success("The product has been deleted.", {
         style: {
        backgroundColor: "#222",
        color: "#fff",
        padding: "12px 20px",
      }
    })
  },
});

if(isLoading){
      return <div className="flex justify-center items-center min-h-screen">
  <i className="fas fa-spinner fa-spin text-4xl text-gray-900"></i>
  </div>
}



  return <>
  <div className="max-w-7xl mx-auto px-4">
 <div  className="grid lg:grid-cols-5 md:grid-cols-4 sm: grid-cols-2 gap-5 mt-5">
   {data?.map((product)=>  // امشيلي علي منتج منتج
    <div key={product.id} className='text-start shadow-2xl p-3 rounded-3xl'>
      <Link to={`/ProductDetiels/${product.id}/${product.category.name}`}>
        <img className="rounded-3xl" src={product.imageCover} alt={product.title} />
      </Link>

      <div className="flex justify-between items-start">
        <h3 className="text-green-600">{product.category.name}</h3>

      </div>

      <Link to={`/ProductDetiels/${product.id}/${product.category.name}`}>
        <h2>{product.title.split(" ", 2).join(" ")}</h2>

        <div className="flex justify-between items-center">
          {product.priceAfterDiscount ? (
            <div className="text-sm">
              <span className="text-red-600 line-through">{product.price} EGP</span>
              <span className="ml-1">{product.priceAfterDiscount} EGP</span>
            </div>
          ) : (
            <span>{product.price} EGP</span>
          )}

          <span>
            <i className="fa-solid fa-star text-amber-300"></i> {product.ratingsAverage}
          </span>
        </div>
      </Link>

             <button
  onClick={() => mutate(product.id)}
  className={`text-sm mt-2 ${isRemoving ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:underline'}`}
  disabled={isRemoving}
>
  {isRemoving ? 'Removing...' : 'Remove'}
</button>

   </div>
  )}
 </div>
 </div>
  </>
}
