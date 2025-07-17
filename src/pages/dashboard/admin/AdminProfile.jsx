import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaUsers, FaUserCheck, FaHotel, FaKey, FaFileContract } from 'react-icons/fa';
import { MdEmail, MdOutlineReportGmailerrorred } from 'react-icons/md';
import dummyPic from "../../../assets/dummy.webp";
import Lottie from 'lottie-react';
import loadingAnimation from "../../../assets/small_loading.json"

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-summary'],
    queryFn: async () => {
        const res = await axiosSecure.get('/admin/summary');
        return res.data;
      }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Lottie animationData={loadingAnimation} className="w-24" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 ">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center bg-white rounded-xl p-8 shadow-lg border border-gray-100"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-100">
            <MdOutlineReportGmailerrorred className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to load profile!</h3>
          <p className="text-gray-600 mb-6">We couldn't fetch the profile. Please try again.</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={refetch}
            className="px-6 py-2 bg-[#142921] text-white rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
          >
            Retry
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const {
    admin,
    totalUsers,
    totalMembers,
    totalRooms,
    availableRooms,
    agreementPercentage,
    availablePercentage
  } = data;

  const stats = [
    { icon: <FaUsers className="text-2xl text-[#142921]" />, title: "Total Users", value: totalUsers },
    { icon: <FaUserCheck className="text-2xl text-[#142921]" />, title: "Total Members", value: totalMembers },
    { icon: <FaHotel className="text-2xl text-[#142921]" />, title: "Total Rooms", value: totalRooms },
    { icon: <FaKey className="text-2xl text-[#142921]" />, title: "Available Rooms", value: `${availableRooms} (${availablePercentage}%)` },
    { icon: <FaFileContract className="text-2xl text-[#142921]" />, title: "Agreement Rate", value: `${agreementPercentage}%` },
  ];

  return (
    <div className="bg-[#e4edec] min-h-screen py-8 px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#142921] to-[#1a3a32] p-8 text-center text-white relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSI+PC9yZWN0PjxwYXRoIGQ9Ik0wIDBoMzB2MzBIMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2Utb3BhY2l0eT0iMC4xIj48L3BhdGg+PC9zdmc+')" }}></div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="mx-auto w-36 h-36 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl mb-6 relative"
            >
              <img
                className="w-full h-full object-cover"
                src={admin.image || dummyPic}
                alt="Admin"
                onError={(e) => {
                  e.target.src = dummyPic;
                }}
              />
            </motion.div>
            
            <h1 className="text-3xl font-bold mb-2 tracking-tight">{admin?.name}</h1>
            <div className="flex items-center justify-center gap-2 text-lg text-white/90">
              <MdEmail className="text-xl" />
              <span>{admin?.email}</span>
            </div>
            <div className="mt-4 text-sm text-white/80">Administrator</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-gray-50">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl p-5 flex items-start gap-5 shadow-sm border border-gray-200 hover:border-[#142921]/30 transition-all"
              >
                <div className="bg-[#e4edec] p-3 rounded-lg">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.title}</h3>
                  <p className="text-2xl font-bold text-[#142921] mt-1">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default AdminProfile;