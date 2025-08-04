import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userContext } from "../UserContext/UserContext";

export default function Register() {
  const [apiErorr, setErorr] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let { setToken } = useContext(userContext);
  let navigate = useNavigate();
  async function getData(value) {
    setisLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", value)
      .then((res) => {
        navigate("/Home");
        setToken(res.data.token);
        setisLoading(true);
        localStorage.setItem("token", res.data.token);
      })
      .catch((erors) => {
        setErorr(erors.response.data.message);
        setisLoading(true);
      });
  }
  ///validationObjectSchema//
  let validationObjectSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "الاسم لازم يكون على الأقل 3 حروف")
      .max(10, "الاسم لازم يكون أقل من 10 حروف")
      .required("الاسم مطلوب"),

    email: yup
      .string()
      .email("صيغة البريد الإلكتروني غير صحيحة")
      .required("البريد الإلكتروني مطلوب"),

    password: yup
      .string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "كلمة السر يجب أن تحتوي على حروف وأرقام ويكون طولها من 6 إلى 10"
      )
      .required("كلمة السر مطلوبة"),

    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "كلمة السر غير متطابقة")
      .required("تأكيد كلمة السر مطلوب"),

    phone: yup
      .string()
      .matches(
        /^01[0125][0-9]{8}$/,
        "رقم الهاتف غير صحيح، يجب أن يكون رقم مصري"
      ),
  });

  let formikRegister = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationObjectSchema,
    onSubmit: getData,
    //call As A function getData()
  });

  return (
    <>
      <form onSubmit={formikRegister.handleSubmit} className="max-w-2xl m-auto">
        {/* alertRegisterHandeler */}
        {apiErorr ? (
          <div
            className="p-4 mt-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <span className="font-medium">{apiErorr}</span>
          </div>
        ) : null}

        {/* name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikRegister.handleBlur}
            type="text"
            name="name"
            id="name"
            onChange={formikRegister.handleChange}
            value={formikRegister.values.name}
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-900 peer"
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 start-0 top-3 -z-10 origin-[0] peer-focus:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Name
          </label>
          {formikRegister.errors.name && formikRegister.touched.name && (
            <div
              className="p-4 mt-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <span className="font-medium">{formikRegister.errors.name}</span>
            </div>
          )}
        </div>

        {/* email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikRegister.handleBlur}
            type="text"
            name="email"
            id="email"
            onChange={formikRegister.handleChange}
            value={formikRegister.values.email}
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-900 peer"
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 start-0 top-3 -z-10 origin-[0] peer-focus:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your email
          </label>
          {formikRegister.errors.email && formikRegister.touched.email && (
            <div
              className="p-4 mt-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <span className="font-medium">{formikRegister.errors.email}</span>
            </div>
          )}
        </div>
        {/* password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikRegister.handleBlur}
            type="text"
            name="password"
            id="password"
            onChange={formikRegister.handleChange}
            value={formikRegister.values.password}
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-900 peer"
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 start-0 top-3 -z-10 origin-[0] peer-focus:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your password
          </label>
          {formikRegister.errors.password &&
            formikRegister.touched.password && (
              <div
                className="p-4 mt-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                role="alert"
              >
                <span className="font-medium">
                  {formikRegister.errors.password}
                </span>
              </div>
            )}
        </div>
        {/* rePassword */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikRegister.handleBlur}
            type="text"
            name="rePassword"
            id="rePassword"
            onChange={formikRegister.handleChange}
            value={formikRegister.values.rePassword}
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-900 peer"
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 start-0 top-3 -z-10 origin-[0] peer-focus:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your rePassword
          </label>
          {formikRegister.errors.rePassword &&
            formikRegister.touched.rePassword && (
              <div
                className="p-4 mt-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                role="alert"
              >
                <span className="font-medium">
                  {formikRegister.errors.rePassword}
                </span>
              </div>
            )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikRegister.handleBlur}
            type="tel"
            name="phone"
            id="phone"
            onChange={formikRegister.handleChange}
            value={formikRegister.values.phone}
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-900 peer"
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 start-0 top-3 -z-10 origin-[0] peer-focus:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your phone
          </label>

          {formikRegister.errors.phone && formikRegister.touched.phone && (
            <div
              className="p-4 mt-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <span className="font-medium">{formikRegister.errors.phone}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-gray-900 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin text-xl text-green-500"></i>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </>
  );
}
