import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useContext } from "react";
import * as yup from "yup";
import { userContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router-dom";



export default function Login() {
let {token ,setToken } = useContext(userContext);
const [isLoading, setisLoading] = useState(false);
const [apiErorr, setErorr] = useState(null);
const [userId, setUserId] = useState(""); 
let navigate = useNavigate();



async function login(value) {
    setisLoading(true);

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", value)
      .then((res) => {
        const token = res.data.token;

        // استخراج ID من التوكن
        const payload = JSON.parse(atob(token.split(".")[1]));
        const id = payload.id;

        // التخزين
        setToken(token);
        setUserId(id);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id);

        // التنقل
        navigate("/");
        console.log("User ID:", id);
      })
      .catch((error) => {
        setErorr(error.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول");
      })
      .finally(() => {
        setisLoading(false);
      });
  }


  // validationSchema
  let validationSchema = yup.object().shape({
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
  });

  // formik
  let formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema, //check validation first
    onSubmit: login, /// login after in check validation
  });

  return (
    <>
      <form onSubmit={formikLogin.handleSubmit} className="max-w-2xl m-auto">
        {apiErorr ? (
          <div
            className="p-4 mt-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <span className="font-medium">{apiErorr}</span>
          </div>
        ) : null}
        {/* email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikLogin.handleBlur}
            type="text"
            name="email" //نفس البروبيرتي في ال inatialvalues
            id="email"
            onChange={formikLogin.handleChange}
            value={formikLogin.values.email}
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-900 peer"
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 start-0 top-3 -z-10 origin-[0] peer-focus:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your email
          </label>
          {formikLogin.errors.email && formikLogin.touched.email && (
            <div
              className="p-4 mt-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <span className="font-medium">{formikLogin.errors.email}</span>
            </div>
          )}
        </div>
        {/* password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formikLogin.handleBlur}
            type="text"
            name="password"
            id="password"
            onChange={formikLogin.handleChange}
            value={formikLogin.values.password}
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-900 peer"
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 start-0 top-3 -z-10 origin-[0] peer-focus:text-blue-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your password
          </label>
          {formikLogin.errors.password && formikLogin.touched.password && (
            <div
              className="p-4 mt-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <span className="font-medium">{formikLogin.errors.password}</span>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-gray-900 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin text-xl text-green-500"></i>: "login"}
        </button>
      </form>
    </>
  );
}
