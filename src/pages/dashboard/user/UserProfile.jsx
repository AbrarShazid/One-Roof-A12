import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { MdEmail } from "react-icons/md";
import { PiBuildingApartmentFill } from "react-icons/pi";
import dummyImg from "../../../assets/dummy.webp"


const UserProfile = () => {
  const { user } = useAuth();


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
                  src={user?.photoURL || dummyImg}
                  alt="Profile"
                  className="h-32 w-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
              </div>
              {/* User Info */}
              <div className="text-center lg:text-left flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  {user?.displayName || 'No Name'}
                </h1>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600">
                  <MdEmail />
                  <span className="font-medium">{user?.email || 'No Email'}</span>
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
                { label: "Agreement Date",  value: "none" },
                { label: "Floor", value: "none" },
                { label: "Block",  value: "none" },
                { label: "Room No",  value: "none" },
                { label: "Rent",  value: "none" }
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

export default UserProfile;
