import React from 'react'
import Products from '../Products/Products'
import CatagoriesSlider from '../CatagoriesSlider/CatagoriesSlider.jsx'
import MainSlider from '../MainSlider/MainSlider.jsx'
// import { useState,useEffect } from 'react'
// import './Home.css'

export default function Home() {
  //  const[isLoading,setisLoading]=useState(false);
  
  return <>
 <MainSlider></MainSlider> 
<CatagoriesSlider></CatagoriesSlider>
<Products></Products>
  </>
}
