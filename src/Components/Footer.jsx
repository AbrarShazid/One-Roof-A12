import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';

const Footer = () => {


  return (
    <footer className={`w-full bg-[#142921] text-[#F9F7F3] transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">One Roof</h3>
            <p className="text-sm">
              Elevated living, simplified - all under One Roof
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target='_blank' rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="https://www.x.com" target='_blank' rel="noopener noreferrer" aria-label="Twitter" className="hover:opacity-80 transition-opacity">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com" target='_blank' rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com" target='_blank' rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-80 transition-opacity">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className='hover:border hover:border-b-white hover:opacity-80 transition-opacity text-sm' >Home</Link></li>
              <li><Link to="/apartments" className=' hover:border-b-white hover:opacity-80 transition-opacity text-sm'>Apartments</Link></li>
              <li>  <Link to="/#about" className="hover:border hover:border-b-white hover:opacity-80 transition-opacity text-sm">
                About Us
              </Link></li>
              <li> <Link to="/#findUs" className="hover:border hover:border-b-white hover:opacity-80 transition-opacity text-sm">
                Find Us
              </Link></li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>House no-04, Sector-6, Uttara</span>
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
                className="px-4 py-2 rounded-lg text-sm bg-[#F9F7F3]/10 placeholder-[#F9F7F3]/70 focus:outline-none focus:ring-1 focus:ring-[#F9F7F3]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-[#F9F7F3] text-[#142921] hover:bg-[#F9F7F3]/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#F9F7F3]/20 mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} One Roof. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;