import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Lottie from 'lottie-react';
import loadingAnim from '../../../assets/small_loading.json';
import useAuth from "../../../hooks/useAuth";
import { FaMoneyBillWave, FaCalendarAlt, FaHome, FaEnvelope, FaLayerGroup, FaBuilding, FaArrowRight } from 'react-icons/fa';
import { MdErrorOutline, MdOutlineReportGmailerrorred } from 'react-icons/md';

const MakePayment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: memberData,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['member-data', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    navigate('/dashboard/payment', { state: { ...data, rent: memberData?.rent } });
  };



  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Lottie animationData={loadingAnim} className="w-28 h-28" />
        <p className=" text-gray-600 ">Loading announcements...</p>
      </div>
    );
  }


  if (isError ) {
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
    <div className=" py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
        <div className="bg-gradient-to-r from-[#1a3a32] to-[#2c5a50] p-6 text-white">
          <div className="flex items-center justify-center space-x-3">
            <FaMoneyBillWave size={24} />
            <h2 className="text-2xl font-bold text-center">Pay Your Rent</h2>
          </div>
          <p className="text-center text-[#a7c4bc] mt-2">
            Apartment {memberData.apartmentNo}, Block {memberData.block}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaEnvelope className="mr-2 text-[#1a3a32]" />
                Email
              </label>
              <input
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a32] bg-gray-50"
                defaultValue={memberData.email}
                {...register('email')}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaLayerGroup className="mr-2 text-[#1a3a32]" />
                Floor
              </label>
              <input
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a32] bg-gray-50"
                defaultValue={memberData.floor}
                {...register('floor')}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaBuilding className="mr-2 text-[#1a3a32]" />
                Block
              </label>
              <input
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a32] bg-gray-50"
                defaultValue={memberData.block}
                {...register('block')}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaHome className="mr-2 text-[#1a3a32]" />
                Apartment No
              </label>
              <input
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a32] bg-gray-50"
                defaultValue={memberData.apartmentNo}
                {...register('apartmentNo')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <FaMoneyBillWave className="mr-2 text-[#1a3a32]" />
              Rent Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                readOnly
                className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a32] bg-gray-50"
                defaultValue={memberData.rent}
                {...register('rent')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <FaCalendarAlt className="mr-2 text-[#1a3a32]" />
              Select Month <span className="text-red-500">*</span>
            </label>
            <select
              {...register('month', { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a32]"
              defaultValue=""
            >
              <option value="" disabled>Select month</option>
              {[
                'January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December',
              ].map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            {errors.month && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <MdErrorOutline className="mr-1" /> Please select a month
              </p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1a3a32] to-[#2c5a50] hover:from-[#143029] hover:to-[#1e4a40] text-white py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center shadow-md"
            >
              <span>Proceed to Payment</span>
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakePayment;