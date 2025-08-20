import React from 'react';
import Banner from '../Components/home/Banner';
import About from '../Components/home/About';
import Coupons from '../Components/home/Coupons';
import Location from '../Components/home/Location';
import { motion } from 'framer-motion';
import Newsletter from '../Components/home/Newsletter';
import FaqHome from '../Components/home/FaqHome';
import FeatureAppartments from '../Components/home/FeatureApartments';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Banner></Banner>
      <FeatureAppartments></FeatureAppartments>
      <About></About>
      <Coupons></Coupons>
      <Location></Location>

      <FaqHome></FaqHome>
      <Newsletter></Newsletter>
    </motion.div>
  );
};

export default Home;