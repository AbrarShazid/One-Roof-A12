import React from 'react';
import { Camera } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const Register = () => {
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { createUser, signInGoogle } = useAuth()

  const axiosSecure =useAxiosSecure()

  const handleSignUp = async (data) => {
    const imageFile = data.photo[0];
    const imgbbAPIKey = import.meta.env.VITE_imgBB;
  
    const formData = new FormData();
    formData.append('image', imageFile);
  
    try {
      const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, formData);
      const imageUrl = imgRes.data.data.url;
  
      const res = await createUser(data.email, data.password);
  
      await updateProfile(res.user, {
        displayName: data.name,
        photoURL: imageUrl
      });
  
      // ✅ Save to database
      const userData = {
        name: data.name,
        email: data.email,
        photo: imageUrl,
        role: "user", 
        createdAt: new Date()
      };
  
      await axiosSecure.post("/users", userData);
      navigate('/')
  
      toast.success("Sign Up Successful!");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      console.error("Error:", err);
    }
  };


  const handleGoogleLogin = () => {
    signInGoogle()
      .then(async (res) => {
        const user = res.user;
  
        const userData = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "user",
          createdAt: new Date()
        };
  
        await axiosSecure.post("/users", userData);
        navigate('/')

        toast.success("Sign Up successful!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };




  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden'
    >
      <section className="min-h-screen flex items-center justify-center relative p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl border border-white/20 p-6 relative">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center mb-8"
              >
                <h2 className="text-4xl font-bold bg-gradient-to-r from-[#142921] to-[#1a332a] bg-clip-text text-transparent mb-2">
                  Welcome
                </h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-gray-600 text-sm"
                >
                  Sign up to continue your journey
                </motion.p>
              </motion.div>

              <form className="space-y-6">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#142921]"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#142921]"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </motion.div>

                {/* Photo Upload (Simplified) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Photo
                  </label>
                  <input

                    type="file"
                    accept="image/*"
                    {...register("photo", { required: "Photo is required" })}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl text-sm text-gray-700 cursor-pointer file:cursor-pointer file:border-0 file:mr-4 file:bg-[#142921] file:text-white file:rounded file:px-4 file:py-2"
                  />
                  {errors.photo && (
                    <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
                  )}
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Must be at least 6 characters"
                      },
                      validate: {
                        hasUppercase: (value) =>
                          /[A-Z]/.test(value) || "Must contain an uppercase letter",
                        hasLowercase: (value) =>
                          /[a-z]/.test(value) || "Must contain a lowercase letter"
                      }
                    })}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#142921]"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-sm text-gray-600 text-right"
                >
                  Have an account?{" "}
                  <a href="/auth" className="text-[#142921] font-semibold underline">
                    Log In
                  </a>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  type="submit"
                  onClick={handleSubmit(handleSignUp)}
                  className="w-full py-3 bg-[#142921] text-white font-semibold rounded-xl hover:scale-[1.02] transition-all"
                >
                  Sign Up
                </motion.button>

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

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 py-3 bg-white/70 border border-gray-200 rounded-xl hover:bg-white/90 hover:border-gray-300"
                >
                  <FcGoogle size={20} />
                  <span>Sign up with Google</span>
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Register;
