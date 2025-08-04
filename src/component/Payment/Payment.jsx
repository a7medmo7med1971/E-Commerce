import axios from "axios";
import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { contextCarts } from "../ContextCarts/ContextCarts";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



export default function Payment() {
  let { token } = useContext(contextCarts); ///token
  const [cartId, setcartId] = useState(""); // Get cartId
  const navigate = useNavigate();

  async function getCartId() {
    /// استخدمتها عشان اجيب ال cartId هاااااام
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: {
        token: token,
      },
    });
  }
  let { data } = useQuery({
    queryKey: ["CartId"],
    queryFn: getCartId,
    select: (res) => res?.data,
  });
  console.log(cartId)
  useEffect(() => {
    setcartId(data?.cartId);
  }, [data]);

  console.log(cartId);

  /*(POST)=>>>   Create Cash Order */

  async function paymentOrder(value) {
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: value },
        { headers: { token } }
      )
      .then((res) => {
        console.log(res.data);
         navigate("/UserOrders")
         // هينقلك للصفحة الرئيسية
        if (res.data.status == "success") {
          toast.success(" Products have been reserved. ", {
            style: {
              backgroundColor: "#222",
              color: "#fff",
              padding: "12px 20px",
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("  The product has not been reserved.", {
          style: {
            backgroundColor: "#222",
            color: "#fff",
            padding: "12px 20px",
          },
        });
      });
  }

  // formikPayment
  let formikPayment = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    // validationSchema: validationSchema, //check validation first
    onSubmit: paymentOrder,
  });

  return (
    <>
      <form onSubmit={formikPayment.handleSubmit} className="max-w-2xl m-auto">
        {/* details */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikPayment.handleBlur}
            type="text"
            name="details" //نفس البروبيرتي في ال inatialvalues
            id="details"
            onChange={formikPayment.handleChange}
            value={formikPayment.values.details}
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-900 peer"
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 start-0 top-3 -z-10 origin-[0] peer-focus:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your details
          </label>
          {formikPayment.errors.details && formikPayment.touched.details && (
            <div
              className="p-4 mt-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <span className="font-medium">
                {formikPayment.errors.details}
              </span>
            </div>
          )}
        </div>
        {/* phone */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikPayment.handleBlur}
            type="tel"
            name="phone"
            id="phone"
            onChange={formikPayment.handleChange}
            value={formikPayment.values.phone}
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-900 peer"
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 start-0 top-3 -z-10 origin-[0] peer-focus:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your phone
          </label>
          {formikPayment.errors.phone && formikPayment.touched.phone && (
            <div
              className="p-4 mt-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <span className="font-medium">{formikPayment.errors.phone}</span>
            </div>
          )}
        </div>
        {/* city */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikPayment.handleBlur}
            type="text"
            name="city"
            id="city"
            onChange={formikPayment.handleChange}
            value={formikPayment.values.city}
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-900 peer"
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 start-0 top-3 -z-10 origin-[0] peer-focus:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your city
          </label>
          {formikPayment.errors.city && formikPayment.touched.city && (
            <div
              className="p-4 mt-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <span className="font-medium">{formikPayment.errors.city}</span>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-emerald-600 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-amber-300 dark:focus:ring-emerald-600"
        >
          Payment
        </button>
      </form>
    </>
  );
}
