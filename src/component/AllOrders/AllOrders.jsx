import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";


export default function AllOrders() {


  async function getAllOrders() {
 
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`);
  }

  const { data } = useQuery({
    queryKey: ["getAllOrders"],
    queryFn: getAllOrders,
   select: (res) => res?.data.data
    
  });

  console.log(data);

  return <>
  {/* Array Of Array */}
       <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4">
  {data?.map((order) => (
    order.cartItems.map((item) => (
      <div
        key={item._id}
        className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between"
      >
        <div>
          <img
            src={item.product.imageCover}
            alt={item.product.title}
            className="w-full h-40 object-contain mb-4"
          />
          <h2 className="text-lg font-semibold text-gray-800">
            {item.product.title}
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            {item.product.brand?.name || "No Brand"}
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-600 font-semibold">
              {item.price} EGP
            </span>
            <span className="text-black text-sm flex items-center gap-1">
              {item.product.ratingsAverage}
              <i className="fa-solid fa-star text-amber-400"></i>
            </span>
          </div>
        </div>
      </div>
    ))
  ))}
</div>
  </>;
}
