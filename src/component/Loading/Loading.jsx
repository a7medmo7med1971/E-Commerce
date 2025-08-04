import React from 'react'; 

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
