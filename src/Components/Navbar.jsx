import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, NavLink } from 'react-router';
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import BlurText from '../BlurText/BlurText';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import spinner from "../assets/small_loading.json"
import dummyProfile from "../assets/dummy.webp"
import Lottie from 'lottie-react';

const Navbar = () => {
  const { user, logOut, loading } = useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const signOut = () => {
    logOut()
      .then(res => {
        toast.success("Log Out successful!");

      })
      .catch(err => {
        toast.error(err.message);
      })
  }




  const navItemClass = ({ isActive }) =>
    isActive
      ? "border-b-2 border-[#BED4D1] px-2 py-1 "
      : "hover:bg-[#BED4D1]/20 px-2 py-1 hover:rounded-3xl  transition-opacity";

  return (
    <div className={`w-full text-[#F9F7F3] sticky top-0 z-5000  bg-[#142921]  `}>

      <div className="container  py-2 px-[3%] xl:px-0 xl:mx-auto">
        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-[#F9F7F3]/30"
              src={logo}
              alt="logo"
            />


            <BlurText
              text="One Roof"
              delay={150}
              animateBy="characters"
              direction="top"
              className='text-xl lg:text-2xl font-bold '

            />
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <div className='flex gap-8 items-center'>
              <NavLink to="/" className={navItemClass}>Home</NavLink>
              <NavLink to="/apartments" className={navItemClass}>Apartments</NavLink>
              <NavLink to="/faq" className={navItemClass}>FAQ</NavLink>
            </div>
          </div>

          {/* Right Side Buttons */}


          <div className="hidden md:flex items-center" >
            {loading ? (
              <Lottie animationData={spinner} className='h-10 lg:h-12 ' />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="focus:outline-none"
                >
                  <img
                    src={user.photoURL || dummyProfile}
                    alt="User"
                    className="w-10 h-10 lg:w-12 lg:h-12 border border-white/30 object-cover px-0.5 py-0.5 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white/50 backdrop-blur-md rounded-md shadow-lg z-50 border border-[#142921]/20"
                    >
                      <div className="py-1">
                        <div className="px-4 py-2 text-[#142921] border-b border-[#142921]/10">
                          <p className="font-medium">{user.displayName || 'User'}</p>
                        </div>
                        
                        <div className="px-4 py-2 text-[#142921] border-b border-[#142921]/10">
                          <Link to={'/dashboard'} className='font-medium'>Dashboard</Link>
                        </div>
                        <button
                          onClick={signOut}
                          className="w-full text-left px-4 py-2 text-[#142921] hover:bg-[#BED4D1]/50 flex items-center gap-2"
                        >
                          <MdOutlineLogout className="text-lg" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className='px-3 py-1.5 rounded-lg bg-[#BED4D1] text-[#142921] hover:bg-[#BED4D1]/90 transition-colors'>
                <NavLink to={'/auth'} className="flex items-center gap-2">
                  <MdOutlineLogin className="text-lg" />
                  <span>Sign In</span>
                </NavLink>
              </div>
            )}
          </div>























          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#F9F7F3]/20 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={`md:hidden overflow-hidden bg-[#142921] shadow-lg`}
          >
            <div className="container mx-auto px-4 py-3 flex flex-col gap-4">
              <NavLink
                to="/"
                className={`py-2 text-lg ${navItemClass}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>

              <NavLink
                to="/apartments"
                className={`py-2 text-lg ${navItemClass}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Apartments
              </NavLink>

            {
              user && 
              <NavLink
                to="/dashboard"
                className={`py-2 text-lg ${navItemClass}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            }
             











              {
                user &&
                <NavLink
                  className={`py-1.5 text-lg ${navItemClass} flex  items-center gap-1.5 bg-[#bed4d1] text-[#142921] rounded-xl w-fit px-3`}
                  onClick={() => {
                    setIsMenuOpen(false)
                    signOut()

                  }}
                >
                  <MdOutlineLogout className="text-xl" />
                  <span> Sign Out</span>

                </NavLink>
              }


              <div className="border-t border-[#F9F7F3]/30 my-1"></div>

              <button
                onClick={() => {

                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3  text-lg w-full rounded-lg ${user ? 'text-[#F9F7F3] hover:bg-[#BED4D1]/10' : ' py-2 bg-[#BED4D1] text-[#142921] hover:bg-[#BED4D1]/90'} transition-colors px-3`}
              >
                {
                  loading ? <Lottie animationData={spinner} className='h-10'></Lottie> :
                    user ? (
                      <>
                        <img
                          src={user.photoURL || dummyProfile}
                          alt="User"
                          className="w-12 h-12 rounded-full border border-white/30 object-cover"
                        />
                        <div>
                          <p > Name: {user.displayName}</p>

                        </div>


                      </>
                    ) : (
                      <>
                        <MdOutlineLogin className="text-xl" />
                        <NavLink to={'/auth'}>Sign In</NavLink>
                      </>
                    )




                }
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;