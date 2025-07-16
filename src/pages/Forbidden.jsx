import React from 'react';
import animation from "../assets/No Entry.json"
import Lottie from 'lottie-react';
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-7'>
      <h1 className='lg:text-3xl text-[#142921]'>Access Denied!!!</h1>
      
        <Lottie animationData={animation} className='h-[40%]' ></Lottie>

   



      <div>

        <Link to={'/'} className='bg-[#142921] px-4 py-2 rounded-lg text-white'>Go Home</Link>
      </div>

    </div>
  );
};

export default Forbidden;