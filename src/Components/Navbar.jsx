import React, { use, useState } from 'react';
import logo from '../assets/logo.png';
import { Link, NavLink } from 'react-router';
import { FaSun, FaMoon } from 'react-icons/fa';
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from '../provider/ThemeProvider';

const Navbar = () => {
  const { isDark, toggleTheme } = use(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItemClass = ({ isActive }) =>
    isActive
      ? `border-b-2 ${isDark ? 'border-[#C2DFE3]' : 'border-[#253237]'} font-semibold`
      : "hover:opacity-80 transition-opacity";

  return (
    <div className={`w-full ${isDark ? 'bg-[#253237]/90 text-[#C2DFE3]' : 'bg-[#C2DFE3]/90 text-[#253237]'} sticky top-0 z-50 backdrop-blur-md shadow-sm`}>
      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <img 
              className="w-10 h-10 rounded-full border border-gray-500/30" 
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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isDark ? 'bg-[#4d575c] hover:bg-[#5a656b]' : 'bg-[#B0D4D9] hover:bg-[#9EC5CB]'} transition-colors`}
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
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-7 flex items-center rounded-full p-1 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`absolute w-5 h-5 rounded-full shadow-md flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}
                style={{ left: isDark ? 'calc(100% - 1.25rem)' : '0.25rem' }}
              >
                {isDark ? (
                  <FaMoon className="text-gray-300 text-xs" />
                ) : (
                  <FaSun className="text-yellow-500 text-xs" />
                )}
              </motion.div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
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
            className={`md:hidden overflow-hidden ${isDark ? 'bg-[#253237]' : 'bg-[#C2DFE3]'} shadow-lg`}
          >
            <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
              <NavLink 
                to="/" 
                className={`py-1 text-lg ${navItemClass}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              
              <NavLink 
                to="/apartments" 
                className={`py-1 text-lg ${navItemClass}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Apartments
              </NavLink>

              <div className="border-t border-gray-500/30 my-2"></div>

              <button
                onClick={() => {
                  setIsLoggedIn(!isLoggedIn);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 py-1 text-lg w-full rounded-lg transition-colors`}
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

              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 py-1 text-lg w-full rounded-lg transition-colors`}
              >
                {isDark ? (
                  <>
                    <FaSun className="text-xl text-yellow-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <FaMoon className="text-xl" />
                    <span>Dark Mode</span>
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