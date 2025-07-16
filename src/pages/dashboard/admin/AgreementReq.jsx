import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/small_loading.json';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import {   FiHome, FiLayers, FiCalendar } from 'react-icons/fi';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import dummyImg from "../../../assets/dummy.webp"

const AgreementReq = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  
  // Fetch pending agreements
  const { data: agreements = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['agreements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/agreements?status=pending');
      return res.data;
    }
  });

  //  Accept agreement
  const acceptMutation = useMutation({
    mutationFn: async (agreement) => {
      return axiosSecure.patch(`/agreements/accept/${agreement._id}`);
    },
    onSuccess: (data, agreement) => {
      Swal.fire('Accepted!', `${agreement.userName} is now a member.`, 'success');
      queryClient.invalidateQueries(['agreements']);
    },
    onError: (error) => {
      const msg = error.response?.data?.message || 'Failed to accept request.';
      Swal.fire('Error', msg, 'error');
    }
  });

  //Reject agreement
  const rejectMutation = useMutation({
    mutationFn: async (agreementId) => {
      return axiosSecure.patch(`/agreements/reject/${agreementId}`);
    },
    onSuccess: () => {
      Swal.fire('Rejected!', 'Request has been rejected.', 'info');
      queryClient.invalidateQueries(['agreements']);
    },
    onError: () => {
      Swal.fire('Error', 'Failed to reject request.', 'error');
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div className="max-w-md text-center bg-white rounded-xl p-8 shadow-md">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-100">
            <MdOutlineReportGmailerrorred className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to load agreements</h3>
          <p className="text-gray-600 mb-6">We couldn't fetch the agreements. Please try again.</p>
          <button
            onClick={refetch}
            className="px-6 py-2 bg-[#142921] text-white rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#142921] mb-2">
          Agreement Requests
        </h1>
        <p className="text-center text-gray-500">
          {agreements.length} pending request{agreements.length !== 1 ? 's' : ''}
        </p>
      </div>

      {agreements.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#e4edec] flex items-center justify-center">
              <FiHome className="text-3xl text-[#142921]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No pending requests</h3>
            <p className="text-gray-600">All agreement requests have been processed.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {agreements.map((a) => (
            <div
              key={a._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#e4edec] flex items-center justify-center mr-4">
                    <img src={a.userImg ||dummyImg} className='w-12 h-12 rounded-full object-cover' alt="" />
                    
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#142921]">{a.userName}</h3>
                    <p className="text-gray-500">{a.userEmail}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <FiHome className="text-[#142921] mr-2" />
                    <span className="text-gray-600">Floor {a.floor}</span>
                  </div>
                  <div className="flex items-center">
                    <FiLayers className="text-[#142921] mr-2" />
                    <span className="text-gray-600">Block {a.block}</span>
                  </div>
                  <div className="flex items-center">
                    <FiHome className="text-[#142921] mr-2" />
                    <span className="text-gray-600">Room {a.apartmentNo}</span>
                  </div>
                  <div className="flex items-center">
                    <FaBangladeshiTakaSign  className="text-[#142921] mr-2" />
                    <span className="text-gray-600">{a.rent} BDT</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <FiCalendar className="mr-2" />
                  <span>Requested on {new Date(a.createdDate).toLocaleDateString()}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => acceptMutation.mutate(a)}
                    disabled={acceptMutation.isLoading}
                    className="flex-1 bg-[#142921] hover:bg-[#1e3a2e] text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    {acceptMutation.isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Accepting...
                      </>
                    ) : 'Accept'}
                  </button>
                  <button
                    onClick={() => rejectMutation.mutate(a._id)}
                    disabled={rejectMutation.isLoading}
                    className="flex-1 bg-white border border-red-500 hover:bg-red-50 text-red-500 py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    {rejectMutation.isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Rejecting...
                      </>
                    ) : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgreementReq;