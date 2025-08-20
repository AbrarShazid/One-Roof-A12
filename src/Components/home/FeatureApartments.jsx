import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiLayers, FiHome, FiHash, FiDollarSign, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router";
import Loading from "../../Components/Loading";

const FeatureApartments = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  
  const { data: apartmentsData, isLoading, isError, refetch } = useQuery({
    queryKey: ['featured-apartments'],
    queryFn: async () => {
      const res = await axiosSecure.get("/apartments?limit=6");
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 60000,
    onError: (error) => {
      console.error("Error fetching apartments:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch apartments. Please try again later.',
        confirmButtonColor: '#142921'
      });
    }
  });

  const apartments = apartmentsData?.apartments || [];

  const handleShowAll = () => {
    navigate('/apartments');
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#e4edec]">
        <Loading />
      </div>
    );
  }

  return (
    <div className='pt-16 pb-6 bg-[#e4edec] manrope overflow-hidden relative'>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#142921]/90 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#bed4d1]/80 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl  font-bold text-[#142921] mb-4">
            Featured Apartments
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of beautifully designed apartments with modern amenities
          </p>
        </motion.div>

        {/* Apartments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {apartments.map((apt, index) => (
            <motion.div
              key={apt._id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => navigate('/apartments')}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-56">
                <motion.img
                  loading="lazy"
                  src={apt.image || '/default-apartment.jpg'}
                  alt={`Apartment ${apt.apartmentNo}`}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-[#142921] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg">
                  <FiDollarSign className="text-xs" />
                  <span>{apt.rent.toLocaleString()}/mo</span>
                </div>
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-">
                  <h3 className="text-xl font-semibold text-[#142921] mb-2">
                    Apartment {apt.apartmentNo}
                  </h3>
                  
                </div>

                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FiLayers className="text-[#142921] mr-3" />
                    <div>
                      <p className="text-xs text-gray-500">Floor</p>
                      <p className="font-semibold text-[#142921]">{apt.floor}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FiHome className="text-[#142921] mr-3" />
                    <div>
                      <p className="text-xs text-gray-500">Block</p>
                      <p className="font-semibold text-[#142921]">{apt.block}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FiHash className="text-[#142921] mr-3" />
                    <div>
                      <p className="text-xs text-gray-500">Unit No</p>
                      <p className="font-semibold text-[#142921]">{apt.apartmentNo}</p>
                    </div>
                  </div>
                </div>

                {/* Status indicator instead of button */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        {apartments.length > 0 && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={handleShowAll}
              className="bg-white text-[#142921] border-2 border-[#142921] px-8 py-4 rounded-full font-semibold hover:bg-[#142921] hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto group/btn2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Apartments
              <FiArrowRight className="group-hover/btn2:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </motion.div>
        )}

        {/* Empty State */}
        {apartments.length === 0 && !isLoading && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              No Apartments Available
            </h3>
            <p className="text-gray-500">
              Check back later for new apartment listings
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FeatureApartments;