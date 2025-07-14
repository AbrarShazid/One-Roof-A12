import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const {signIn,signInGoogle}=useAuth()

  const navigate = useNavigate();
  const location = useLocation();

  const from=location.state?.from || '/'

  const handleLogin = (data) => {
 
    
   
    signIn(data.email, data.password)
      .then(res => {
        toast.success("Log in Successful!");
       
          navigate(from)
         
      })
      .catch(err => {
        toast.error(err.message);
      })

   
  };


  const handleGoogleLogin = () => {
    signInGoogle()
      .then(res => {
        toast.success("Login successful!");
        navigate(from)
      })
      .catch(err => {
        toast.error(err.message);
      })
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden'
    >
      <section className="min-h-screen flex items-center justify-center relative  p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl border border-white/20 p-8 relative">
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-4xl font-bold bg-[#142921] bg-clip-text text-transparent mb-2"
                >
                  Welcome Back
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-gray-600 text-sm"
                >
                  Sign in to continue your journey
                </motion.p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#142921] text-gray-700 placeholder-gray-400 transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 to-teal-500/0 opacity-0 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("password", { required: true })}
                      type="password"
                      className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:[#142921]  text-gray-700 placeholder-gray-400 transition-all duration-300"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-sm text-gray-600 text-right"
                >
                  Don't have an account?{" "}
                  <Link to="/auth/register">
                    <span className="text-[#142921] font-semibold underline transition-colors duration-200">
                      Register
                    </span>
                  </Link>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  type="submit"
                  className="w-full py-3 bg-[#142921] text-white font-semibold rounded-xl  hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </motion.button>
              </form>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="relative my-8"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-800 font-medium">
                    Or continue with
                  </span>
                </div>
              </motion.div>

              {/* Google Sign In */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3 bg-white/70 border border-gray-200 rounded-xl hover:bg-white/90 hover:border-gray-300 transform hover:scale-[1.02] transition-all duration-300 text-gray-700 font-medium shadow-sm hover:shadow-md"
              >
                <FcGoogle size={20} />
                <span>Sign in with Google</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default LogIn;
