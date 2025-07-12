import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, NavLink } from 'react-router';
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import BlurText from '../BlurText/BlurText';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);




  const navItemClass = ({ isActive }) =>
    isActive
      ? "border-b-2 border-[#BED4D1] px-2 py-1 "
      : "hover:bg-[#BED4D1]/20 px-2 py-1 hover:rounded-3xl  transition-opacity";

  return (
    <div className={`w-full text-[#F9F7F3] sticky top-0 z-50  bg-[#142921]  `}>

      <div className="container  py-2 mx-auto">
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
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#BED4D1] text-[#142921] hover:bg-[#BED4D1]/90 transition-colors`}
            >
              {isLoggedIn ? (
                <>
                  <MdOutlineLogout className="text-lg" />
                  <span>Sign Out</span>
                </>
              ) : (
                <>
                  <MdOutlineLogin className="text-lg" />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>
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

              <div className="border-t border-[#F9F7F3]/30 my-1"></div>

              <button
                onClick={() => {
                  setIsLoggedIn(!isLoggedIn);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 py-2 text-lg w-full rounded-lg ${isLoggedIn ? 'text-[#F9F7F3] hover:bg-[#BED4D1]/10' : 'bg-[#BED4D1] text-[#142921] hover:bg-[#BED4D1]/90'} transition-colors px-3`}
              >
                {isLoggedIn ? (
                  <>
                    <MdOutlineLogout className="text-xl" />
                    <span>Sign Out</span>
                  </>
                ) : (
                  <>
                    <MdOutlineLogin className="text-xl" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;