import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Protected({ children }) {
  //  check Tokenلو يعمل  Tokenلو المستخدم عامل تسجيل دخول بالتالي معاه ال  
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/Login" />;
  }
}
