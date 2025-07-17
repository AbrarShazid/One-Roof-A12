import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaPlus, FaTimes, FaPercent } from 'react-icons/fa';
import { FiGift } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/small_loading.json';

const ManageCoupon = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  

 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/coupons');
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (coupon) => {
      const res = await axiosSecure.post('/coupons', coupon);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['coupons']);
      toast.success('Coupon added successfully');
      setShowModal(false);
      reset();
    },
    onError: () => toast.error('Failed to add coupon'),
  });

  const onSubmit = (data) => {
    const discount = parseFloat(data.discount);
    if (isNaN(discount) || discount <= 0 || discount > 100) {
      return toast.error('Discount must be between 1 and 100');
    }

    mutation.mutate({
      code: data.code.trim(),
      discount,
      description: data.description.trim(),
    });
  };

  const handleAvailabilityToggle = async (coupon) => {
    try {
      await axiosSecure.patch(`/coupons/${coupon._id}`, {
        isAvailable: !coupon.isAvailable,
      });
      queryClient.invalidateQueries(['coupons']);
      toast.success('Availability updated');
    } catch {
      toast.error('Failed to update availability');
    }
  };

  return (
    <div className="bg-[#e4edec] min-h-screen py-6 px-3  md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 md:mb-8 gap-2 md:gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#142921] flex items-center gap-2">
              <FiGift className="text-[#1a3a32]" /> Manage Coupons
            </h2>
            <p className="text-gray-600">Create and manage discount coupons</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
            className="bg-[#142921] hover:bg-[#1a3a32] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center gap-2 shadow-md"
          >
            <FaPlus /> Add Coupon
          </motion.button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Lottie animationData={loadingAnimation} className="w-24" />
          </div>
        ) : coupons.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[#e4edec]">
              <FiGift className="text-2xl text-[#142921]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Coupons Found</h3>
            <p className="text-gray-600 mb-4">Create your first coupon to get started</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2 bg-[#142921] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Create Coupon
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full ">
                  <thead className="bg-[#142921] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-medium">Code</th>
                      <th className="px-6 py-4 text-left font-medium ">Discount</th>
                      <th className="px-6 py-4 text-left font-medium">Description</th>
                      <th className="px-6 py-4 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {coupons.map((coupon) => (
                      <tr key={coupon._id} className="hover:bg-gray-50 transition-colors ">
                        <td className="px-4 lg:px-6 py-4">
                          <span className="font-medium text-[#142921] bg-[#e4edec] px-3 py-1 rounded-full text-sm">
                            {coupon.code}
                          </span>
                        </td>
                        <td className="px-6 py-4 ">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold">{coupon.discount}</span>
                            <FaPercent className="text-xs text-gray-500" />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-600 whitespace-pre-line">{coupon.description}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAvailabilityToggle(coupon)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${coupon.isAvailable
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                              }`}
                          >
                            {coupon.isAvailable ? 'Available' : 'Unavailable'}
                          </motion.button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {coupons.map((coupon) => (
                <div key={coupon._id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span  
               
                    className="font-semibold text-[#142921] text-sm bg-[#e4edec] px-3 py-1 rounded-full">
                      {coupon.code}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAvailabilityToggle(coupon)}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${coupon.isAvailable
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {coupon.isAvailable ? 'Available' : 'Unavailable'}
                    </motion.button>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    Discount: <span className="font-medium ">{coupon.discount}%</span>
                  </div>
                  <div className="text-sm text-gray-600 whitespace-pre-line">Description: {coupon.description}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#142921]/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-md relative"
              >
                <button
                  onClick={() => {
                    setShowModal(false);
                    reset();
                  }}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-[#e4edec] p-2 rounded-lg">
                      <FiGift className="text-xl text-[#142921]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Add New Coupon</h3>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                      <input
                        {...register('code', { required: 'Code is required' })}
                        placeholder="e.g. SUMMER20"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#142921] outline-none"
                      />
                      {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                      <div className="relative">
                        <input
                          type="number"
                          {...register('discount', {
                            required: 'Discount is required',
                            min: { value: 1, message: 'Minimum is 1%' },
                            max: { value: 100, message: 'Maximum is 100%' },
                          })}
                          placeholder="e.g. 20"
                          className="w-full border rounded-lg px-4 py-2 pl-10 focus:ring-2 focus:ring-[#142921] outline-none"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaPercent />
                        </div>
                      </div>
                      {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        {...register('description', { required: 'Description is required' })}
                        placeholder="Describe the coupon purpose"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#142921] outline-none resize-none"
                        rows="3"
                      />
                      {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          reset();
                        }}
                        className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        type="submit"
                        className="px-5 py-2 bg-[#142921] text-white rounded-lg hover:bg-[#1a3a32]"
                        disabled={mutation.isLoading}
                      >
                        {mutation.isLoading ? 'Creating...' : 'Create Coupon'}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ManageCoupon;
