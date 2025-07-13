import React from 'react';
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="w-full bg-black text-[#FF8C00] py-10 border-t border-[#FF8C00] mt-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm px-6 sm:px-12">

        {/* Logo & Brand Story */}
        <div>
          <img src={assets.Dani_logo} className="mb-5 w-32" alt="Dani Store Logo"/>
          <p className="w-full md:w-2/3 text-[#FFCC99] leading-relaxed">
            Elevate your fitness journey with premium-quality gear designed for strength, endurance, and performance. At <strong>Dani Store</strong>, we believe in pushing limits and unlocking your full potential. Train smart, perform better, and achieve greatness with us!
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/collection" className="hover:text-white transition">Shop Collection</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Get in Touch</h3>
          <p>📧 support@danistore.com</p>
          <p>📞 +251-XXX-XXX-XXX</p>
          <p>📍 Hawassa, Ethiopia</p>
        </div>
      </div>

      {/* Developer Section */}
      <div className="mt-12 border-t border-[#FF8C00] pt-8 text-center px-6 sm:px-12">
        <h3 className="text-lg font-semibold text-white">🚀 Built by: Alazar</h3>
        <p className="text-[#FFCC99] text-sm mt-2">
          A passionate <strong>MERN Developer & problem-solver</strong>, skilled in <strong>eCommerce, branding, troubleshooting, and modern web development</strong>.
        </p>
        <p className="text-[#FFCC99] text-sm">
          Expert in <strong>React.js, Express.js Node.js, MongoDB, Context API, Git</strong>, and creative UI/UX solutions to transform ideas into reality.
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mt-4">
          <a href="https://github.com/alazar10" className="hover:text-white text-2xl"><FaGithub /></a>
          <a href="https://linkedin.com/in/alazar10" className="hover:text-white text-2xl"><FaLinkedin /></a>
          <a href="https://portfolio.com/alazar" className="hover:text-white text-2xl"><FaGlobe /></a>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-[#FFCC99] mt-8 text-xs">
        © {new Date().getFullYear()} Dani Store | Developed by Alazar | All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
