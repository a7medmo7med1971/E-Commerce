import React from 'react'; // ✅ لازم ده
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


//  import '../node_modules/@fortawesome/react-fontawesome';
//  import '../node_modules/@fortawesome/free-solid-svg-icons';
//  import '../node_modules/@fortawesome/fontawesome-svg-core';
//  import '../node_modules/@fortawesome/fontawesome-common-types';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);