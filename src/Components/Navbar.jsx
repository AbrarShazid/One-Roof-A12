import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, NavLink } from 'react-router';
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItemClass = ({ isActive }) => 
    isActive
      ? "border-b-2 border-[#F9F7F3] font-semibold"
      : "hover:opacity-80 transition-opacity";

  return (
    <div className={`w-full bg-[#37423D]/80 text-[#F9F7F3] sticky top-0 z-50 backdrop-blur-md shadow-sm`}>
      
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
    
          <div className="flex items-center gap-3">
            <img 
              className="w-10 h-10 rounded-full border border-[#F9F7F3]/30" 
              src={logo} 
              alt="logo" 
            />
            <Link 
              to="/" 
              className="text-xl font-bold tracking-tight"
            >
              One Roof
            </Link>
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
            {/* Auth Button */}
            <motion.button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F9F7F3] text-[#37423D] hover:bg-[#F9F7F3]/90 transition-colors`}
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
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden bg-[#37423D] shadow-lg`}
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
                className={`flex items-center gap-3 py-2 text-lg w-full rounded-lg ${isLoggedIn ? 'text-[#F9F7F3] hover:bg-[#F9F7F3]/10' : 'bg-[#F9F7F3] text-[#37423D] hover:bg-[#F9F7F3]/90'} transition-colors px-3`}
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