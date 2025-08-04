import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from "../UserContext/UserContext";
import { FaShopify } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, setToken } = useContext(userContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/Login");
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-3xl font-bold flex items-center gap-2">
          <FaShopify />
          <span>FreshCart</span>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-5 me-auto gap-5 p-5">
          {token && (
            <>
              <li><NavLink className="hover:text-gray-500" to="/">Home</NavLink></li>
              <li><NavLink className="hover:text-gray-500" to="Carts">Carts</NavLink></li>
              <li><NavLink className="hover:text-gray-500" to="Products">Products</NavLink></li>
              {/* <li><NavLink className="hover:text-gray-500" to="Brands">Brands</NavLink></li> */}
            </>
          )}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <>
              <NavLink onClick={logOut} to="#">Logout</NavLink>
              <NavLink to="WshlistProducts">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </NavLink>
              <NavLink to="UserOrders">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="Register">Register</NavLink>
              <NavLink to="Login">Login</NavLink>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 py-2 bg-gray-900 space-y-2">
          {token ? (
            <>
              <NavLink className="block hover:text-gray-300" to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
              <NavLink className="block hover:text-gray-300" to="Carts" onClick={() => setIsOpen(false)}>Carts</NavLink>
              <NavLink className="block hover:text-gray-300" to="Products" onClick={() => setIsOpen(false)}>Products</NavLink>
              {/* <NavLink className="block hover:text-gray-300" to="Brands" onClick={() => setIsOpen(false)}>Brands</NavLink> */}
              <NavLink className="block hover:text-gray-300" to="#" onClick={() => { logOut(); setIsOpen(false); }}>Logout</NavLink>
            </>
          ) : (
            <>
              <NavLink className="block hover:text-gray-300" to="Register" onClick={() => setIsOpen(false)}>Register</NavLink>
              <NavLink className="block hover:text-gray-300" to="Login" onClick={() => setIsOpen(false)}>Login</NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
}
