import React, { useContext } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { contextCarts } from '../ContextCarts/ContextCarts'
import toast from 'react-hot-toast';


export default function ProductDetiels() {
  let {id,category} =useParams()  // url اللي بعته في ال  id بيسحب 
  let {addToCart}=useContext(contextCarts)

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

{/**ProductDetiels*/}

  async function getDetiels() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  {/**ProductCategory*/}
    async function getcategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["ProductDetiels", id],
    queryFn: getDetiels,
    select: (res) => res.data.data,
  });

    let { data: categoryProducts, isLoading: isCategoryLoading, isError: isCategoryError } = useQuery({
    queryKey: ["Productcategory", category],
    queryFn: getcategory,
    select: (res) => res.data.data.filter(product => product.category.name === category),
  });
  console.log(categoryProducts)


  return <>
{/**ProductDetiels*/}
<div className="max-w-7xl mx-auto px-4">
      <div className='grid items-center grid-cols-[1fr_2fr] gap-5'>
        <div>
          <img src={data?.imageCover} alt={data?.title} />
        </div>

        <div>
          <h2 className='text-2xl'>{data?.title}</h2>
          <h3>{data?.description}</h3>
          <h3>{data?.category.name}</h3>

          {data?.priceAfterDiscount ? (
            <div className='text-sm'>
              <span className='text-red-600 line-through'>{data?.price} EGP</span>
              <span>{data?.priceAfterDiscount} EGP</span>
            </div>
          ) : (
            <span>{data?.price} EGP</span>
          )}

          <span>
            <i className="fa-solid fa-star text-amber-300"></i>{data?.ratingsAverage}
          </span>

<button
onClick={() => Kobry(id)}
className=" w-full mt-1 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer">
  <span className=" w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent group-hover:text-white">
  Add To Cart
  </span>
</button>
        </div>
      </div>
{/**ProductCategory*/}
 <div  className="grid lg:grid-cols-6 md:grid-cols-4 sm: grid-cols-2 gap-5 mt-5">
   {categoryProducts?.map((product)=>  // امشيلي علي منتج منتج
    <div key={product.id} className='text-start shadow-lg p-3 rounded-lg'>
        <Link to={`/ProductDetiels/${product.id}/${product.category.name}`} > {/* `/ProductDetiels/${product.id}/${product.category.name} */}
      <img src={product.imageCover} alt={product.title}></img>
      <h3 className='text-green-600'>{product.category.name}</h3>
      <h2>{product.title.split(" ",2).join(" ")}</h2>
      <div className='flex  flex-nowrap justify-between items-center '>
        {/* condition priceAfterDiscount  */}
     {product.priceAfterDiscount?
     <div className='text-sm'>        {/* لو علية تخفيض  */}
      <span className='text-red-600 line-through'>{product.price}EGP</span>
      <span >{product.priceAfterDiscount}EGP</span>
     </div> : <span>{product.price}EGP</span>}
        <span ><i className="fa-solid fa-star text-amber-300  "></i>{product.ratingsAverage}</span>
      </div>
        </Link>

<button 
      onClick={() => Kobry(product.id)} className=" w-full mt-1 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer">
  <span className=" w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent group-hover:text-white">
  Add To Cart
  </span>
</button>
   </div>
  )}
 </div>
  
</div>

</>
}



  
