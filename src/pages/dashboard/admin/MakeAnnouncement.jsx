
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post('/announcement', data);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Announcement Posted',
        showConfirmButton: false,
        timer: 1500
      });
      reset();
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Failed to post',
        text: error.message || 'Something went wrong!'
      });
    }
  });

  const onSubmit = (data) => {
    mutate(data); 
  };

  return (
    <div className="flex justify-center items-start">
      <div className="bg-white/50 shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-[#142921] mb-6 text-center">
          Make Announcement
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter a title"
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e3a2e] outline-none"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              placeholder="Enter announcement details"
              {...register('description', { required: 'Description is required' })}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-[#1e3a2e] outline-none"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isPending}
              className={`bg-[#142921] text-white px-6 py-2 rounded-md transition hover:bg-[#1e3a2e] ${
                isPending && 'opacity-60 cursor-not-allowed'
              }`}
            >
              {isPending ? 'Submitting...' : 'Give an Announcement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
