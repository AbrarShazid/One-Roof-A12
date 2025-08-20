import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check, X, ArrowRight } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsError(true);
      return;
    }
    
   
    setIsSubscribed(true);
    setIsError(false);
  };

  const handleReset = () => {
    setEmail("");
    setIsSubscribed(false);
    setIsError(false);
  };

  return (
    <div className="bg-[#e4edec] manrope py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden "
        >
          <div className="grid md:grid-cols-2">
            {/* Left side - Illustration */}
            <div className="bg-gradient-to-br from-[#142921] to-[#5e736d] p-8 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-6 w-32 h-32 rounded-full bg-white opacity-10"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-6 w-24 h-24 rounded-full bg-white opacity-10"></div>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-4 relative z-10"
              >
                <Mail className="w-16 h-16 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
                <p className="text-lg opacity-90 max-w-md mx-auto">
                  Join our newsletter and never miss out on new apartment listings, exclusive deals, and helpful renting tips.
                </p>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute bottom-6 left-6 w-12 h-12 rounded-lg bg-white opacity-10"></div>
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white opacity-10"></div>
            </div>

            {/* Right side - Form */}
            <div className="p-8 md:p-12">
              {!isSubscribed ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Subscribe to our newsletter</h3>
                    <p className="text-gray-600">
                      Get the latest updates directly to your inbox. No spam, just valuable information for renters.
                    </p>
                  </motion.div>

                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    viewport={{ once: true }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setIsError(false);
                          }}
                          placeholder="your.email@example.com"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                            isError
                              ? "border-red-500 focus:ring-red-200"
                              : "border-gray-300 focus:ring-[#5d6e69] "
                          }`}
                        />
                        {isError && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                          >
                            <X className="h-5 w-5 text-red-500" />
                          </motion.div>
                        )}
                      </div>
                      {isError && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-2 text-sm text-red-600"
                        >
                          Please enter a valid email address
                        </motion.p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#142921] to-[#5e736d] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-all hover:shadow-lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Subscribe Now
                    </motion.button>
                  </motion.form>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-8 pt-6 border-t border-gray-100"
                  >
                    <h4 className="font-medium text-gray-700 mb-3">What you'll receive:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-[#142921] mr-2" />
                        New apartment listings before they're public
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-[#142921] mr-2" />
                        Exclusive discounts and promotions
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-[#142921] mr-2" />
                        Helpful tips for renters
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-[#142921] mr-2" />
                        Market trends and insights
                      </li>
                    </ul>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">You're Subscribed!</h3>
                  <p className="text-gray-600 mb-2">
                    Thank you for subscribing to our newsletter. We've sent a confirmation email to
                  </p>
                  <p className="font-medium text-teal-600 mb-6">{email}</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors"
                  >
                    Subscribe another email <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Additional info section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Trusted by thousands of renters</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our newsletter has helped over 50,000 people find their perfect apartment and save money on renting costs.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Newsletter;