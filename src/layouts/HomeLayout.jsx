import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import Lenis from 'lenis';


const HomeLayout = () => {
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
        <Outlet />
      </div>

      <Footer />

    </div>
  );
};

export default HomeLayout;