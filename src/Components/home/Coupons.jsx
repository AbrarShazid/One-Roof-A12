import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaPercentage, FaGift } from 'react-icons/fa';
import { RiCoupon2Fill, RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import loadingAnim from '../../assets/small_loading.json';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

const Coupons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['home-coupons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/coupons');
      return res.data;
    },
  });

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Copied: ${code}`, {
      position: 'bottom-center',
      style: {
        background: '#1a3a32',
        color: '#fff',
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Lottie animationData={loadingAnim} className="w-20" />
      </div>
    );
  }


  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1], // Smooth ease-in-out
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section className="py-8 xl:pb-0  px-4 sm:px-6 lg:px-8 bg-[#e4edec] manrope">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center bg-[#1a3a32] text-white px-4 py-2 rounded-full mb-4 shadow-sm">
            <FaGift className="mr-2" />
            <span className="text-sm font-medium tracking-wide">ALL COUPONS</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#142921] mb-3">
            Save More with Exclusive Offers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Tap into our latest discounts. Copy & use them before they expire.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {coupons.map((coupon, idx) => (
            <motion.div
              key={coupon._id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border ${
                coupon.isAvailable ? 'bg-white border-[#e0f2f1]' : 'bg-gray-100 border-gray-200'
              }`}
            >
              {coupon.isAvailable && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#1a3a32] transform rotate-45 translate-x-8 -translate-y-8"></div>
              )}

              <div className="p-6 relative z-10 flex flex-col h-full">
                {/* Content that can grow */}
                <div className="flex-grow">
                  {/* Title + Description */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-xl font-bold ${
                        coupon.isAvailable ? 'text-[#1a3a32]' : 'text-gray-500'
                      }`}>
                        {coupon.title || 'Special Offer'}
                      </h3>
                      <p className={`text-sm mt-1 ${
                        coupon.isAvailable ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {coupon.description}
                      </p>
                    </div>
                    <div className={`flex items-center justify-center p-3 rounded-lg ${
                      coupon.isAvailable ? 'bg-[#e8f5f2]' : 'bg-gray-200'
                    }`}>
                      <FaPercentage className={`text-xl ${
                        coupon.isAvailable ? 'text-[#1a3a32]' : 'text-gray-500'
                      }`} />
                    </div>
                  </div>
                </div>

               
                <motion.div 
                  className="mb-6"
                  whileTap={{ scale: 0.98 }} 
                >
                  <div className={`flex items-center justify-between p-3 rounded-lg border ${
                    coupon.isAvailable
                      ? 'bg-gray-50 border-dashed border-gray-300'
                      : 'bg-gray-100 border-gray-200'
                  }`}>
                    <span className={`font-mono font-bold tracking-wider ${
                      coupon.isAvailable ? 'text-[#1a3a32]' : 'text-gray-500'
                    }`}>
                      {coupon.code}
                    </span>
                    <button
                      onClick={() => copyToClipboard(coupon.code)}
                      disabled={!coupon.isAvailable}
                      className={`text-xs px-3 py-1 rounded transition-colors ${
                        coupon.isAvailable
                          ? 'bg-[#1a3a32] text-white hover:bg-opacity-90'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {coupon.isAvailable ? 'Copy' : 'Unavailable'}
                    </button>
                  </div>
                </motion.div>

                {/* Fixed position footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className={`text-sm font-medium ${
                    coupon.isAvailable ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <RiCoupon2Fill className="inline mr-1" />
                    {coupon.discount}% OFF
                  </span>
                  <span className={`text-xs flex items-center px-2 py-1 rounded-full ${
                    coupon.isAvailable
                      ? 'text-green-800 bg-green-100'
                      : 'text-red-800 bg-red-100'
                  }`}>
                    {coupon.isAvailable ? (
                      <>
                        <RiCheckboxCircleFill className="mr-1" />
                        Available
                      </>
                    ) : (
                      <>
                        <RiCloseCircleFill className="mr-1" />
                        Unavailable
                      </>
                    )}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coupons;