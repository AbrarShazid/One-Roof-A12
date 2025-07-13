// import React from 'react';
// import { motion } from 'framer-motion';
// const Login = () => {
//   return (
//     <motion.div
//     initial={{ opacity: 0, x: -50 }}
//     animate={{ opacity: 1, x: 0 }}
//     exit={{ opacity: 0, x: -50 }}
//     transition={{ duration: 0.5 }}
//     className='bg-[#e4edec] min-h-screen'
//   >
//       Log in page her e
//     </motion.div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaGoogle, FaBuilding } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className='bg-[#e4edec] min-h-screen flex items-center justify-center p-4'
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Branding & Info */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:block"
          >
            <motion.div variants={itemVariants} className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#142921] to-[#2a5a47] rounded-full mb-6 shadow-lg">
                <FaBuilding className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-[#142921] mb-4">
                ApartmentHub
              </h1>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Find your perfect apartment with our comprehensive management platform
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <FaBuilding className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#142921]">Browse Apartments</h3>
                  <p className="text-gray-600 text-sm">Discover available units in your area</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <FaUser className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#142921]">Easy Application</h3>
                  <p className="text-gray-600 text-sm">Apply for apartments with just a few clicks</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaEnvelope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#142921]">Stay Connected</h3>
                  <p className="text-gray-600 text-sm">Get updates on your applications</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
              <motion.div variants={itemVariants} className="text-center mb-8">
                <div className="lg:hidden mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#142921] to-[#2a5a47] rounded-full mb-4">
                    <FaBuilding className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-[#142921] mb-2">ApartmentHub</h1>
                </div>
                
                <h2 className="text-2xl font-bold text-[#142921] mb-2">
                  {isLogin ? 'Welcome Back' : 'Join ApartmentHub'}
                </h2>
                <p className="text-gray-600">
                  {isLogin ? 'Sign in to browse and apply for apartments' : 'Create an account to start your apartment search'}
                </p>
              </motion.div>

              <div className="space-y-6">
                {!isLogin && (
                  <motion.div variants={itemVariants} className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/70 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#142921] focus:border-transparent transition-all duration-300"
                      placeholder="Full Name"
                      required={!isLogin}
                    />
                  </motion.div>
                )}

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/70 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#142921] focus:border-transparent transition-all duration-300"
                    placeholder="Email Address"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-4 bg-white/70 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#142921] focus:border-transparent transition-all duration-300"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </motion.div>

                {!isLogin && (
                  <motion.div variants={itemVariants} className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-4 bg-white/70 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#142921] focus:border-transparent transition-all duration-300"
                      placeholder="Confirm Password"
                      required={!isLogin}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                    </button>
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#142921] to-[#2a5a47] hover:from-[#0f1f16] hover:to-[#1f4236] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    )}
                  </button>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center px-4 py-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 text-gray-700 font-medium shadow-sm hover:shadow-md"
                  >
                    <FaGoogle className="w-5 h-5 mr-3 text-red-500" />
                    Continue with Google
                  </button>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="mt-8 text-center">
                <p className="text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="ml-2 text-[#142921] hover:text-[#2a5a47] font-semibold transition-colors"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;