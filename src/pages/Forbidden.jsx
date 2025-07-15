import React from 'react';
import animation from "../assets/No Entry.json"
import Lottie from 'lottie-react';
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      
    <Lottie animationData={animation}></Lottie>

    <div>

      <Link to={'/'} className='bg-gray-800 px-4 py-2 rounded-lg text-white'>Go Home</Link>
    </div>

    </div>
  );
};

export default Forbidden;