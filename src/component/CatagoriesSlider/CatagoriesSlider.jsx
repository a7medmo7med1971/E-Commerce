import axios from 'axios';
import React from 'react'
import Slider from "react-slick";
import { useQuery } from '@tanstack/react-query'

export default function CatagoriesSlider() {



  async function getCatagory() {
 return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}

let {data} =useQuery({
queryKey:["categories"],
queryFn:getCatagory,
select:(res)=>res.data.data
})


    const settings = {
  dots: false,            // ممكن تخليها false عشان يبان إنه بيلف باستمرار
  infinite: true,         // لازم تكون true عشان يلف بشكل دائري
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,         // تشغيل الحركة الأوتوماتيكية
  speed: 2000,            // مدة التحريك (2 ثانية)
  autoplaySpeed: 0,       // الانتقال مباشرة بدون انتظار
  cssEase: "linear",      // حركة ناعمة وثابتة
  pauseOnHover: false,    // متوقفش لما تحط الماوس عليه
  };


  return <>
  <div className="max-w-7xl mx-auto px-4">
      <Slider {...settings} className='mb-5'>
{data?.map((catgory) => (
  <div key={catgory._id} className="px-2 text-center">
    <img
      src={catgory.image}
      className="w-40 h-40 mx-auto object-cover rounded-lg shadow-2xl "
      alt={catgory.name}
    />
    <h3 className="mt-2 text-sm font-semibold">{catgory.name}</h3>
  </div>
))}
      </Slider>
      </div>
  </>
}
