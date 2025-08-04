import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function UserOrders() {
    let userId= localStorage.getItem("userId")

 async function getUserOrders() {
 
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getUserOrders"],
    queryFn: getUserOrders,
   select: (res) => res?.data
    
  });
 if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <i className="fas fa-spinner fa-spin text-4xl text-green-500"></i>
      </div>
    );
  }

  return <>
  {/* Array Of Array */}
{data?.map((order) => (
  <div key={order._id}>
    <h3 className="text-xl font-bold mb-2">
      Totalprice: {order.totalOrderPrice} EGP
    </h3>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-6">
      {order.cartItems.map((item) => (
        <div key={item._id} className="bg-white rounded-xl shadow-md p-4">
          <img src={item.product.imageCover} alt={item.product.title} className="w-full h-40 object-contain mb-4" />
          <h2 className="text-lg font-semibold text-gray-800">{item.product.title}</h2>
          <p className="text-sm text-gray-500 mb-2">{item.product.brand?.name || "No Brand"}</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-600 font-semibold">{item.price} EGP</span>
            <span className="text-black text-sm flex items-center gap-1">
              {item.product.ratingsAverage}
              <i className="fa-solid fa-star text-amber-400"></i>
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
))}

  </>;
}
