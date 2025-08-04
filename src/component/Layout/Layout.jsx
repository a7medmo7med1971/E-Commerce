import React from 'react';
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* محتوى الصفحة يملأ الفراغ المتبقي */}
      <div className="flex-grow pt-20 px-4 mt-5">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
