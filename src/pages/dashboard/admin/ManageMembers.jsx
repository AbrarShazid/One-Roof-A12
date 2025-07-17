import React from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import loadingAnimation from "../../../assets/small_loading.json"
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import { motion } from 'framer-motion';

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: members = [], isLoading, isError ,refetch } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/members');
      return res.data;
    }
  });

  const removeMemberMutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`/users/remove-member/${email}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      Swal.fire({
        icon: 'success',
        title: 'Member removed successfully',
        toast: true,
        position: 'top-end',
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Failed to remove member',
        toast: true,
        position: 'top-end',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });

  const handleRemove = (email, name) => {
    Swal.fire({
      title: `Remove ${name}?`,
      text: 'This will revoke their member status and make their apartment available again.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      backdrop: `
        rgba(0,0,0,0.4)
        left top
        no-repeat
      `
    }).then((result) => {
      if (result.isConfirmed) {
        removeMemberMutation.mutate(email);
      }
    });
  };

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
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to load members!</h3>
          <p className="text-gray-600 mb-6">We couldn't fetch the members. Please try again.</p>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Members</h2>
          <p className="text-gray-600 mt-1">View and manage all building members</p>
        </div>
        
        {/* Desktop/Tablet View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                    No members found in the system.
                  </td>
                </tr>
              ) : (
                members.map(({ _id, name, email, photo }) => (
                  <tr key={_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={photo} className='h-10 w-10 rounded-full object-cover' alt={name} />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleRemove(email, name)}
                        disabled={removeMemberMutation.isPending}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                          removeMemberMutation.isPending 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-red-600 hover:bg-red-700'
                        } focus:outline-none  `}
                      >
                        {removeMemberMutation.isPending ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Removing...
                          </>
                        ) : 'Remove Member'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          {members.length === 0 ? (
            <div className="px-6 py-4 text-center text-gray-500">
              No members found in the system.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {members.map(({ _id, name, email, photo }) => (
                <div key={_id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={photo} className="h-10 w-10 rounded-full object-cover" alt={name} />
                      <div>
                        <div className="font-medium text-gray-900">{name}</div>
                        <div className="text-sm text-gray-500 truncate" style={{ maxWidth: '150px' }}>{email}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(email, name)}
                      disabled={removeMemberMutation.isPending}
                      className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white ${
                        removeMemberMutation.isPending 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-red-600 hover:bg-red-700'
                      } focus:outline-none `}
                    >
                      {removeMemberMutation.isPending ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Removing
                        </>
                      ) : 'Remove'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMembers;