import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Lottie from 'lottie-react';
import loadingAnimation from "../../assets/small_loading.json";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { HiOutlineEmojiSad } from "react-icons/hi";

const Announcement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcement');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Lottie animationData={loadingAnimation} className="w-28 h-28" />
        <p className=" text-gray-600 ">Loading announcements...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-100">
        
            <MdOutlineReportGmailerrorred  className='w-8 h-8 text-red-500' />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to load announcements</h3>
          <p className="text-gray-600 mb-6">We couldn't fetch the announcements. Please try again.</p>
          <button
            onClick={refetch}
            className="px-6 py-2 bg-gradient-to-r from-[#142921] to-[#1e3a2e] text-white rounded-lg hover:opacity-90 transition-opacity shadow-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#142921] mb-2">Latest Announcements</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-[#142921] to-[#1e3a2e] mx-auto  rounded-full"></div>
      </div>

      {announcements.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-100">
          <HiOutlineEmojiSad  className="w-8 h-8 text-gray-400" />
           
          </div>
          <h3 className="text-lg font-medium text-gray-700">No announcements yet</h3>
          <p className="text-gray-500 mt-1">Check back later for updates</p>
        </div>
      ) : (
        <div className="space-y-6">
          {announcements.map((a) => (
            <div 
              key={a._id} 
              className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#142921] to-[#1e3a2e]"></div>
              <div className="pl-5">
                <div className="flex justify-between items-start mb-1">
                  <h2 className="text-xl font-semibold text-gray-800">{a.title}</h2>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{a.description}</p>
                <div className="text-xs text-gray-400">
                  Posted: {new Date(a.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcement;





