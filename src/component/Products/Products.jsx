import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { contextCarts } from '../ContextCarts/ContextCarts'
import toast from 'react-hot-toast';
 import { contextWshlist } from '../ContextWshlist/ContextWshlist';


export default function Products() {

let {addToCart}=useContext(contextCarts)
 let {postWshlist}=useContext(contextWshlist)


async function Kobry(productId) {
 let flag= await addToCart(productId)
 console.log(flag)
 if(flag){
  toast.success("Product added successfully to your cart",{
      style: {
    backgroundColor: '#fff',
    color: '#222',
    padding: '12px 20px',
  }})}
}
async function KobrypostWshlist(productId) {
 let flag= await postWshlist(productId)
 console.log(flag)
 if(flag){
  toast.success("Product added successfully to your Wshlist",{
      style: {
    backgroundColor: '#fff',
    color: '#222',
    padding: '12px 20px',
  }})}
}


async function getData() {
 return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
}

let {data, isLoading, isError, isSuccess} =useQuery({
queryKey:["products"],
queryFn:getData,
select:(res)=>res?.data.data
})
console.log(data)

if(isLoading){
  return <div className="flex justify-center items-center min-h-screen">
  <i className="fas fa-spinner fa-spin text-4xl text-gray-900"></i>
  </div>
}



return<>

 <div className="max-w-7xl mx-auto px-4">
  <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-5">
    {data?.map((product) => (
      <div key={product.id} className="text-start shadow-2xl p-3 rounded-3xl">
        <Link to={`/ProductDetiels/${product.id}/${product.category.name}`}>
          <img className="rounded-3xl" src={product.imageCover} alt={product.title} />
        </Link>

        <div className="flex justify-between items-start">
          <h3 className="text-green-600">{product.category.name}</h3>
          <button>
            <svg
              onClick={() => KobrypostWshlist(product.id)}
              className="h-8 w-6 cursor-pointer hover:text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
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
          onClick={() => Kobry(product.id)}
          className="w-full mt-1 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer"
        >
          <span className="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent group-hover:text-white">
            Add To Cart
          </span>
        </button>
      </div>
    ))}
  </div>
</div>
  
  </>
}
