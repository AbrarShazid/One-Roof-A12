import React, { use } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { ThemeContext } from '../provider/ThemeProvider';
import { NavLink } from 'react-router';

const Footer = () => {
  const { isDark } = use(ThemeContext);

  const navItemClass = ({ isActive }) =>{
    isActive
      ? `border-b-2 ${isDark ? 'border-[#C2DFE3]' : 'border-[#253237]'} font-semibold`
      : "hover:opacity-80 transition-opacity";
  }

  return (
    <footer className={`w-full ${isDark ? 'bg-[#253237] text-[#C2DFE3]' : 'bg-[#C2DFE3] text-[#253237]'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          {/* Column 1 - About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">One Roof</h3>
            <p className="text-sm">
            Your home, your tools — everything you need for apartment living, in one place.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target='_blank' aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="https://www.x.com" target='_blank' aria-label="Twitter" className="hover:opacity-80 transition-opacity">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com" target='_blank' aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com" target='_blank' aria-label="LinkedIn" className="hover:opacity-80 transition-opacity">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 flex flex-col">
            <NavLink to="/" className={navItemClass}>Home</NavLink>
            <NavLink to="/apartments" className={navItemClass}>Apartments</NavLink>
              <li><a href="#" className="hover:opacity-80 transition-opacity text-sm">About Us</a></li>
              <li><a href="#" className="hover:opacity-80 transition-opacity text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>House no-65, Sector-6, Uttara</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span>+88 01904382308</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📩</span>
                <span>info@oneroof.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Newsletter</h3>
            <p className="text-sm">Subscribe to get updates on new listings</p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email" 
                className={`px-4 py-2 rounded-lg text-sm ${isDark ? 'bg-[#4d575c] placeholder-[#C2DFE3]/70' : 'bg-white placeholder-[#253237]/70'}`}
              />
              <button 
                type="submit"
                className={`px-4 py-2 rounded-lg text-sm font-medium ${isDark ? 'bg-[#C2DFE3] text-[#253237] hover:bg-[#D4E7EA]' : 'bg-[#253237] text-[#C2DFE3] hover:bg-[#3A4A50]'} transition-colors`}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t ${isDark ? 'border-[#4d575c]' : 'border-[#B0D4D9]'} mt-5 pt-5 text-center text-sm`}>
          <p>© {new Date().getFullYear()} One Roof. All rights reserved.</p>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;