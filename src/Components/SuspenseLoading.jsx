import Lottie from 'lottie-react';
import React from 'react';

import smallLoading from "../assets/small_loading.json"

const SuspenseLoading = () => {
  return (
    <div className='h-[100vh]'>
      <Lottie animationData={smallLoading} className='h-[33%]'></Lottie>
      
    </div>
  );
};

export default SuspenseLoading;