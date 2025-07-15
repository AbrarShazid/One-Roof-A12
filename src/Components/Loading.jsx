import Lottie from 'lottie-react';
import React from 'react';
import loading from "../assets/page loading.json"
const Loading = () => {
  return (
    <div className='max-w-[60%] '>
      <Lottie animationData={loading}></Lottie>
    </div>
  );
};

export default Loading;