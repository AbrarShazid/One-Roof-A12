import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet, useLocation } from 'react-router';
import Footer from '../Components/Footer';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';



const HomeLayout = () => {

  const location = useLocation();
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    


  }, [])




  return (
    <div className='flex flex-col min-h-screen manrope'>
      <Navbar />
      <div className='flex-grow'>
        <AnimatePresence mode="wait">
          {/* Key based on location for transitions */}
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </div>

      <Footer />

    </div>
  );
};

export default HomeLayout;