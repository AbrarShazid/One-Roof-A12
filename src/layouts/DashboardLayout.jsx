import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import dummyPic from "../assets/dummy.webp"
import { IoMdHome } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { MdOutlineRememberMe, MdOutlinePayment } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { FaReceipt } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";
import { RiCoupon2Fill } from "react-icons/ri";
import { HiMiniDocumentCurrencyBangladeshi } from "react-icons/hi2";

import useUserRole from '../hooks/useUserRole';

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole()
  const { user } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, [])

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  if (roleLoading) {
    return <div></div>
  }

  return (
    <div className="flex min-h-screen bg-[#e4edec] manrope">
      {/* Mobile Menu Button - now shows on tablets too */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-2 left-4 z-300 p-2 bg-[#142921] text-white rounded-md shadow-lg"
      >
        {isSidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        w-80 lg:w-1/5 bg-[#142921] text-white fixed left-0 top-0 bottom-0 p-4 lg:py-6 lg:px-1 z-20 
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className='flex flex-col justify-center items-center gap-2'>
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 rounded-full overflow-hidden border border-[#e4edec]">
            <img
              className="w-full h-full object-cover"
              src={user.photoURL || dummyPic}
              alt="User"
            />
          </div>
          <div className='text-center mb-2'>
            <h1 className='text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold break-words'>{user.displayName}</h1>
            <h3 className='text-xs sm:text-sm lg:text-base break-all'>{user.email}</h3>
          </div>
        </div>

        <hr className="my-4 opacity-50" />

        <nav className="space-y-1 flex flex-col items-center mt-2 pb-6">
          <Link
            to={'/'}
            className='flex items-center gap-2 hover:bg-[#1e3a2e] p-2 rounded-md transition-colors w-full justify-center lg:justify-start'
            onClick={handleLinkClick}
          >
            <IoMdHome className="text-md" />
            <span className="text-sm lg:text-base">Home</span>
          </Link>

          <Link
            to="profile"
            className='flex items-center gap-2 hover:bg-[#1e3a2e] p-2 rounded-md transition-colors w-full justify-center lg:justify-start '
            onClick={handleLinkClick}
          >
            <ImProfile className="text-md" />
            <span className="text-sm lg:text-base">{role === "admin" ? 'Admin' : 'My'} Profile</span>
          </Link>

          {
            //  member only link here 

            role === 'member' &&

            <>
              <Link
                to="make-payment"
                className={`flex items-center gap-2 hover:bg-[#1e3a2e] p-2 rounded-md transition-colors w-full justify-center lg:justify-start ${role === 'admin' && 'hidden'}`}
                onClick={handleLinkClick}
              >
                <MdOutlinePayment className="text-md" />
                <span className="text-sm lg:text-base">Make Payment</span>
              </Link>



              <Link
                to="pay-history"
                className={`flex items-center gap-2 hover:bg-[#1e3a2e] p-2 rounded-md transition-colors w-full justify-center lg:justify-start ${role === 'admin' && 'hidden'}`}
                onClick={handleLinkClick}
              >
                <HiMiniDocumentCurrencyBangladeshi className="text-md" />
                <span className="text-sm lg:text-base">Payment History</span>
              </Link>

            </>

          }
          <Link
            to="announcement"
            className={`flex items-center gap-2 hover:bg-[#1e3a2e] p-2 rounded-md transition-colors w-full justify-center lg:justify-start ${role === 'admin' && 'hidden'}`}
            onClick={handleLinkClick}
          >
            <GrAnnounce className="text-md" />
            <span className="text-sm lg:text-base">Announcements</span>
          </Link>

          {/* all admin route */}
          {
            role === 'admin' &&
            <>
              <Link
                to="manage-members"
                className={`flex items-center gap-2 hover:bg-[#1e3a2e] p-2 rounded-md transition-colors w-full justify-center lg:justify-start`}
                onClick={handleLinkClick}
              >
                <MdOutlineRememberMe className='text-md' />
                <span className="text-sm lg:text-base">Manage Members</span>
              </Link>

              <Link
                to="make-announcement"
                className={`flex items-center gap-2 hover:bg-[#1e3a2e] p-2 rounded-md transition-colors w-full justify-center lg:justify-start`}
                onClick={handleLinkClick}
              >
                <GrAnnounce className="text-md" />
                <span className="text-sm lg:text-base">Make Announcements</span>
              </Link>

              <Link
                to="agreement-req"
                className={`flex items-center gap-2 hover:bg-[#1e3a2e] p-2 rounded-md transition-colors w-full justify-center lg:justify-start`}
                onClick={handleLinkClick}
              >
                <FaReceipt className="text-md" />
                <span className="text-sm lg:text-base">Agreement request</span>
              </Link>

              <Link
                to="manage-coupons"
                className={`flex items-center gap-2 hover:bg-[#1e3a2e] p-2 rounded-md transition-colors w-full justify-center lg:justify-start`}
                onClick={handleLinkClick}
              >
                <RiCoupon2Fill className="text-md" />
                <span className="text-sm lg:text-base">Manage Coupons</span>
              </Link>
            </>
          }
        </nav>
      </aside>

      {/* Main content area */}
      <main className="w-full lg:ml-[20%] lg:w-4/5 min-h-screen">
        {/* Sticky top nav */}
        <div className="sticky top-0 bg-[#e4edec] shadow-md z-200 px-4 lg:px-6 py-4 border-b border-[#c7d4d3]">
          {role === 'admin' && <Link to={'/dashboard'} className="text-base md:text-xl font-semibold text-[#142921] ml-12 lg:ml-0">Admin Dashboard</Link>}
          {role === 'member' && <Link to={'/dashboard'} className="text-base md:text-xl font-semibold text-[#142921] ml-12 lg:ml-0">Member Dashboard</Link>}
          {role === 'user' && <Link to={'/dashboard'} className="text-base md:text-xl font-semibold text-[#142921] ml-12 lg:ml-0">User Dashboard</Link>}
        </div>

        {/* Page content */}
        <div className="p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;