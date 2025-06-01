import React from 'react';
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa"; // Import icons
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="w-full bg-white py-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm px-6 sm:px-12">
        
        {/* Logo & Brand Story */}
        <div>
          <img src={assets.Dani_logo} className="mb-5 w-32" alt="Dani Store Logo"/>
          <p className="w-full md:w-2/3 text-gray-600">
            Elevate your fitness journey with premium-quality gear designed for strength, endurance, and performance. At **Dani Store**, we believe in pushing limits and unlocking your full potential. Train smart, perform better, and achieve greatness with us!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-800">Quick Links</h3>
          <ul className="text-gray-600 space-y-2">
            <li><a href="/about" className="hover:text-black transition">About Us</a></li>
            <li><a href="/collection" className="hover:text-black transition">Shop Collection</a></li>
            <li><a href="/contact" className="hover:text-black transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-800">Get in Touch</h3>
          <p className="text-gray-600">📧 support@danistore.com</p>
          <p className="text-gray-600">📞 +251-XXX-XXX-XXX</p>
          <p className="text-gray-600">📍 Hawassa, Ethiopia</p>
        </div>
      </div>

      {/* Developer Section */}
      <div className="mt-12 border-t border-gray-300 pt-8 text-center px-6 sm:px-12">
        <h3 className="text-lg font-semibold text-gray-800">🚀 Built by: Alazar</h3>
        <p className="text-gray-600 text-sm mt-2">
          A passionate **MERN Developer & problem-solver**, skilled in **eCommerce, branding, troubleshooting, and modern web development**.
        </p>
        <p className="text-gray-600 text-sm">
          Expert in **React.js, Express.js Node.js, MongoDB, Context API, Git**, and creative UI/UX solutions to transform ideas into reality.
        </p>

        {/* Social Media Links with Icons */}
        <div className="flex justify-center gap-6 mt-4">
          <a href="https://github.com/alazar" className="text-gray-600 hover:text-black transition text-2xl"><FaGithub /></a>
          <a href="https://linkedin.com/in/alazar" className="text-blue-500 hover:text-black transition text-2xl"><FaLinkedin /></a>
          <a href="https://portfolio.com/alazar" className="text-gray-600 hover:text-black transition text-2xl"><FaGlobe /></a>
        </div>
      </div>

      {/* Copyright Section */}
      <p className="text-center text-gray-500 mt-8 text-xs">
        © {new Date().getFullYear()} Dani Store | Developed by Alazar | All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
