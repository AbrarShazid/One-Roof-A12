import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { MdEmail, MdOutlineReportGmailerrorred } from "react-icons/md";
import { PiBuildingApartmentFill } from "react-icons/pi";
import dummyImg from "../../../assets/dummy.webp"
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import loadingAnimation from "../../../assets/small_loading.json";
import Lottie from 'lottie-react';



const MemberProfile = () => {
  const { user } = useAuth();

  const axiosSecure=useAxiosSecure();

  const { data: userInfo = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['userInfo', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
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
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to load User Info</h3>
          <p className="text-gray-600 mb-6">We couldn't fetch the user info. Please try again.</p>
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
    <div className=" py-4 px-2">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden ">

          <div className="px-4 py-4  relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6">
              {/* Profile Image */}
              <div className="flex justify-center lg:justify-start mb-6 lg:mb-0">
                <img
                  src={userInfo?.photo || dummyImg}
                  alt="Profile"
                  className="h-32 w-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
              </div>
              {/* User Info */}
              <div className="text-center lg:text-left flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  {userInfo?.name || 'No Name'}
                </h1>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600">
                  <MdEmail />
                  <span className="font-medium">{userInfo?.email || 'No Email'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Apartment Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-[#e4edec] to-white border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <PiBuildingApartmentFill />
              <span>Apartment Information</span>
            </h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: "Agreement Date",  value:  new Date(userInfo.agreementAt).toLocaleDateString('en-GB')||"00/00/0000" },
                { label: "Floor", value: userInfo.floor||"none" },
                { label: "Block",  value: userInfo.block||"none" },
                { label: "Room No",  value: userInfo.apartmentNo||"none" },
                { label: "Rent",  value: userInfo.rent||"none" }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1 ml-6">
                  
              
                    <span className="text-sm font-medium text-gray-500">{item.label}</span>
                  
                  <p className="text-lg font-semibold text-gray-800 ">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
