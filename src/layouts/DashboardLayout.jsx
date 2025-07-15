import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

const DashboardLayout = () => {



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
    <div className='manrope'>
      Its a Dashboard

      <AnimatePresence mode="wait">
          {/* Key based on location for transitions */}
          <Outlet key={location.pathname} />
        </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;