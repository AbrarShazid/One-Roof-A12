import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

const AuthLayOut = () => {



  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    


  }, [])


  return (
    <div className='manrope'>
      <Navbar></Navbar>
      <div className=''>
        <AnimatePresence mode="wait">
          {/* Key based on location for transitions */}
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </div>
      
    </div>
  );
};

export default AuthLayOut;