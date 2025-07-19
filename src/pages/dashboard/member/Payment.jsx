import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import Lottie from 'lottie-react';
import loadingAnim from '../../../assets/small_loading.json';
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleSubmit, formState: { isSubmitting } } = useForm();

  const paymentInfo = location.state;
  const [discountedRent, setDiscountedRent] = useState(paymentInfo?.rent || 0);
  const [couponCode, setCouponCode] = useState('');


  const savePayment = useMutation({
    mutationFn: (paymentData) => axiosSecure.post('/payments', paymentData),
    onSuccess: () => queryClient.invalidateQueries(['payments']),
  });

  const applyCoupon = async () => {
    if (!couponCode.trim()) return toast.error('Please enter a coupon code');
    try {
      const { data: coupons } = await axiosSecure.get('/coupons');
      const coupon = coupons.find(
        c => c.code === couponCode && c.isAvailable
      );

      if (!coupon) {
        toast.error('Invalid or unavailable coupon');
        setCouponCode('');
        return;
      }

      const discountAmount = (paymentInfo.rent * coupon.discount) / 100;
      const newRent = paymentInfo.rent - discountAmount;

      setDiscountedRent(newRent);
     
      toast.success(`Coupon applied! ${coupon.discount}% off`);
    } catch (error) {
      console.error('Coupon validation error:', error);
      toast.error('Failed to apply coupon');
    }
  };

  const onSubmit = async () => {
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return toast.error('Card information is incomplete');

    try {
      const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
      if (pmError) throw pmError;

      const { data } = await axiosSecure.post('/create-payment-intent', {
        rent: discountedRent,
      });

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: paymentMethod.id,
      });
      if (confirmError) throw confirmError;

      if (paymentIntent.status === 'succeeded') {
        const paymentData = {
          ...paymentInfo,
          rent: discountedRent,
          transactionId: paymentIntent.id,
          date: new Date(),
          status: 'completed',
         
          paymentMethod: paymentIntent.payment_method_types?.[0] || 'card',
        };

        await savePayment.mutateAsync(paymentData);

        await Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          html: `
            <div class="text-left">
              <p class="mb-2">${paymentInfo.month} Rent Payment</p>
              <p class="mb-2"><strong>Amount:</strong> $${discountedRent.toFixed(2)}</p>
              <p class="mb-2"><strong>Transaction ID:</strong> <code>${paymentIntent.id}</code></p>
            </div>
          `,
          confirmButtonText: 'View Payment',
          confirmButtonColor: '#1c3d35',
        });

        navigate('/dashboard/pay-history');
      }
    } catch (err) {
      toast.error(err.message || 'Payment failed. Please try again.');
      console.error('Payment error:', err);
    }
  };

  if (!paymentInfo) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-100">
            <MdErrorOutline className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Information Missing</h3>
          <p className="text-gray-600 mb-6">Please go back and fill out the payment form again.</p>
          <button
            onClick={() => navigate('/dashboard/make-payment')}
            className="px-6 py-2 bg-gradient-to-r from-[#142921] to-[#1e3a2e] text-white rounded-lg hover:opacity-90 transition-opacity shadow-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
        <div className="bg-gradient-to-r from-[#1a3a32] to-[#2c5a50] p-6 text-white">
          <div className="flex items-center justify-center space-x-3">
            <FaMoneyBillWave size={24} />
            <h2 className="text-2xl font-bold text-center">Complete Payment</h2>
          </div>
          <p className="text-center text-[#a7c4bc] mt-2">
            {paymentInfo.month} Rent - Apartment {paymentInfo.apartmentNo}, Block {paymentInfo.block}
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Amount Due</p>
              <p className="text-xl font-semibold text-[#1a3a32]">
                ${discountedRent.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">For Month</p>
              <p className="text-xl font-semibold text-[#1a3a32]">{paymentInfo.month}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Coupon Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg  focus:outline-none focus:ring focus:ring-green-200"
                placeholder="Enter coupon code"
              />
              <button
                onClick={applyCoupon}
                type="button"
                className="px-4 py-2 bg-[#1a3a32] text-white rounded-lg hover:bg-[#153029] transition"
              >
                Apply
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Card Details</label>
              <div className="border border-gray-300 rounded-lg p-3">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#1a3a32',
                        '::placeholder': { color: '#a7c4bc' },
                        fontFamily: 'Inter, sans-serif',
                      },
                      invalid: { color: '#ef4444' },
                    },
                    hidePostalCode: true,
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#1a3a32] to-[#2c5a50] hover:from-[#143029] hover:to-[#1e4a40] shadow-md'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Lottie animationData={loadingAnim} className="w-6 h-6 mr-2" />
                  Processing...
                </>
              ) : (
                `Pay $${discountedRent.toFixed(2)}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
