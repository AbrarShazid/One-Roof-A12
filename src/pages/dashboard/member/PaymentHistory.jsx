import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { FaReceipt } from 'react-icons/fa';
import loadingAnimation from "../../../assets/small_loading.json"
import Lottie from 'lottie-react';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Lottie animationData={loadingAnimation} className="w-28 h-28" />
        <p className=" text-gray-600 ">Loading payment history...</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#142921] px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-700">
              <FaReceipt className="text-xl" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Payment History</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {payments.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaReceipt className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">No payment history found</h3>
              <p className="text-gray-500">Your payment records will appear here once made</p>
            </div>
          ) : (
            <div className="w-full">
              {/* Mobile/Tablet View */}
              <div className="lg:hidden space-y-4">
                {payments.map((payment) => (
                  <div key={payment._id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500">Payment Date</p>
                        <p className="text-sm text-gray-900">
                          {payment.date ? formatDate(payment.date) : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Paid For</p>
                        <p className="text-sm text-gray-500">
                          {payment.month || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Amount</p>
                        <p className="text-sm font-semibold text-blue-600">
                          ${payment.rent?.toFixed(2) || '0.00'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Transaction ID</p>
                        <p className="text-sm text-gray-500 font-mono truncate">
                          {payment.transactionId || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden lg:block ">
                <table className="w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Payment Date
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Paid Month
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction ID
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment._id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.date ? formatDate(payment.date) : 'N/A'}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.month || 'N/A'}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-[#142921]">
                          ${payment.rent?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 font-mono break-all">
                          {payment.transactionId || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Simple footer showing count */}
        {payments.length > 0 && (
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Total records: <span className="font-medium">{payments.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;