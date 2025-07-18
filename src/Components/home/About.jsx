import React from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Layout,
  Gift,
  Calendar,
  FolderOpen,
  Shield,
  ArrowRight,

} from 'lucide-react';
import aboutImg from "../../assets/about.jpg";
import { Link } from 'react-router';

const About = () => {
  const features = [
    { icon: Bell, title: 'Digital Notice', description: 'Instant notifications and announcements' },
    { icon: Layout, title: 'Digital Dashboard', description: 'Centralized management interface' },
    { icon: Gift, title: 'Coupons', description: 'Exclusive resident discounts' },
    { icon: Calendar, title: 'Event Management', description: 'Community events and bookings' },
    { icon: FolderOpen, title: 'Document Vault', description: 'Secure document storage' },
    { icon: Shield, title: 'Security', description: '24/7 building security system' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: .5,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-6 md:py-16 bg-[#bed4d1]/40 md:px-[3%] relative overflow-hidden  manrope ">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#142921]/90 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#bed4d1]/80 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-30" />

      <div className="container mx-auto px-3 md:px-0 relative z-10 ">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >


          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#142921] mb-4 tracking-tight"
          >
            About{' '}
            <span className="bg-[#142921]  bg-clip-text text-transparent">
              One Roof
            </span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-[#142921] to-[#bed4d1] mx-auto rounded-full"
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-8 md:mb-16 lg:mb-20 ">
          {/* Image Section */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={aboutImg}
                alt="Modern apartment building"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#142921]/20 to-transparent" />
            </div>

            {/* Floating stats card */}
            <motion.div
              className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-600">Happy Residents</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="space-y-4 md:space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants} className="space-y-2 md:space-y-4 lg:space-y-6">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
                <span className="font-semibold text-gray-900">One Roof</span> is a revolutionary smart platform that transforms apartment living by seamlessly connecting residents, managers, and property owners through cutting-edge digital solutions.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                From intelligent maintenance tracking to vibrant community networking, we're redefining traditional building management into a streamlined, modern experience that puts convenience and connection at the forefront.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              {['Smart Living', 'Digital First', 'Community Focused'].map((badge, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-[#bed4d1]/30 to-[#bed4d1]/20 text-[#142921] rounded-full text-sm font-medium border border-[#142921]/20"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          className="mb-6 md:mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-gray-900 text-center  mb-6 md:mb-12"
          >
            Comprehensive Digital Solutions
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}


                className="group bg-white flex items-center rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#bed4d1] transition-all duration-300 "
              >
                <div className="flex items-center gap-4 ">
                  <div className=" w-14 h-14 bg-gradient-to-br from-[#142921] to-[#bed4d1] rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7" />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-1  group-hover:text-[#142921] transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >

          <Link to={'/apartments'}>
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-4 md:px-8 py-4 bg-gradient-to-r from-[#142921] to-[#bed4d1] text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg md:text-xl font-light  hidden md:block">
                Live smarter. Stay connected. All under{' '}
                <span className="font-bold">One Roof</span>.
              </span>
              <span className="font-bold md:hidden">All Under One Roof</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

            </motion.div>
          </Link>



        </motion.div>
      </div>
    </section>
  );
};

export default About;