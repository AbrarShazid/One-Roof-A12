import React from 'react';
import Banner from '../Components/home/Banner';
import About from '../Components/home/About';
import Coupons from '../Components/home/Coupons';
import Location from '../Components/home/Location';

const Home = () => {
  return (
    <div >
    <Banner></Banner>
    <About></About>
    <Coupons></Coupons>
    <Location></Location>
    </div>
  );
};

export default Home;