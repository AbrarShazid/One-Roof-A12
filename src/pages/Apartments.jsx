import React from 'react';
import { motion } from 'framer-motion';

const Apartments = () => {
  return (
    <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.5 }}


    className='min-h-100vh bg-red-600'
  >
      its a apartments page.
    </motion.div>
  );
};

export default Apartments;