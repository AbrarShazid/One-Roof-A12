import React from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { ChevronLeft, ChevronRight, Star, Users, Building, Shield } from 'lucide-react';

import banner1 from "../../assets/1.jpg";
import banner2 from "../../assets/2.jpg";
import banner3 from "../../assets/3.jpg";
import banner4 from "../../assets/4.jpg";

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, NavLink } from 'react-router';

const Banner = () => {
  const slides = [
    {
      id: 1,
      image: banner1,
      title: "Urban Luxury",
      subtitle: "Skyline Living Redefined",
      description: "High-rise apartments with premium city views",
      features: ["24/7 Security", "Pool & Gym", "Parking"]
    },
    {
      id: 2,
      image: banner2,
      title: "Modern Residences",
      subtitle: "Smart Living Simplified",
      description: "Spacious smart homes with luxury finishes",
      features: ["Smart Tech", "Concierge Service"]
    },
    {
      id: 3,
      image: banner3,
      title: "Total Security",
      subtitle: "Always Protected",
      description: "24/7 surveillance and emergency response",
      features: ["Guarded Patrols", "Fire Alarms"]
    },
    {
      id: 4,
      image: banner4,
      title: "Elite Fitness",
      subtitle: "Train Relax Repeat",
      description: "Premium gym and sports facilities",
      features: ["Turf Field", "Gym Access"]
    }
  ];

  const stats = [
    { icon: Building, value: "150+", label: "Apartments" },
    { icon: Users, value: "500+", label: "Residents" },
    { icon: Star, value: "4.9", label: "Rating" },
    { icon: Shield, value: "24/7", label: "Security" }
  ];

  return (
    <div className='banner-container manrope'>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="mySwiper"
        style={{ height: "80vh" }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className='relative'>
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className='w-full h-full object-cover'
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#142921] to-transparent z-10" />

            {/* Slide Content */}
            <div className="absolute inset-0 z-20 grid md:grid-cols-2 items-center   px-6 md:px-12 lg:px-16 gap-6 py-6 md:py-8  lg:py-12 ">

              {/* Left Section */}
              <div className="text-white space-y-2 md:space-y-3 lg:space-y-6  flex flex-col justify-between  ">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">{slide.title}</h2>
                <h4 className="text-xl text-[#bed4d1] md:text-2xl lg:text-4xl font-semibold opacity-90">{slide.subtitle}</h4>
                <p className="opacity-90 text-white lg:text-2xl">{slide.description}</p>

                {/* Features */}
                <div className="flex gap-3 flex-wrap pt-2">
                  {slide.features.map((feature, i) => (
                    <span
                      key={i}
                      className="backdrop-blur-md bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-sm font-medium shadow-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Explore Button */}

                <Link to={'/apartments'} className="w-max my-3 px-6 py-2 rounded-full bg-[#142921] text-[#bed4d1] font-semibold hover:scale-105 transition duration-300 shadow-md">
                  Explore Apartments
                </Link>

              </div>

              {/* Right Section (Stats) – Hidden on Mobile */}
              <div className="hidden md:grid grid-cols-2 gap-4 lg:gap-6 w-[100%]">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-6 py-4 shadow-md text-white flex flex-col items-center justify-center gap-1 text-center "
                  >
                    <stat.icon size={28} />

                    <div className="text-xl font-bold text-[#bed4d1]">{stat.value}</div>
                    <div className="text-lg  ">{stat.label}</div>

                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
