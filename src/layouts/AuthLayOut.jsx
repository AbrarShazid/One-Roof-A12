import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import { AnimatePresence } from 'framer-motion';

const AuthLayOut = () => {
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