import React, { useState, useContext } from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter
} from 'react-icons/fa';
import Title from '../components/Title';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { backendUrl } = useContext(ShopContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/contact/submit`, formData);
      toast.success(res.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message.');
    }
  };

  return (
    <div>
      {/* Page Title */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-[#333333] text-center mt-1">
          Reach out to us anytime. We’re here to help!
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-8">
          {/* Contact Details */}
          <div className="flex-1 bg-[#F3F3F3] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-[#FF8C00]">📞 Get In Touch</h3>
            <p className="text-[#333333] flex items-center gap-2"><FaPhoneAlt /> +251-XXX-XXX-XXX</p>
            <p className="text-[#333333] flex items-center gap-2"><FaEnvelope /> support@danistore.com</p>
            <p className="text-[#333333] flex items-center gap-2"><FaMapMarkerAlt /> Hawassa, Ethiopia</p>

            {/* Social Media Links */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-[#FF8C00] hover:text-[#333333] text-2xl"><FaFacebook /></a>
              <a href="#" className="text-[#FF8C00] hover:text-[#333333] text-2xl"><FaInstagram /></a>
              <a href="#" className="text-[#FF8C00] hover:text-[#333333] text-2xl"><FaTwitter /></a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md border border-[#FF8C00]">
            <h3 className="text-xl font-semibold mb-4 text-[#FF8C00]">💬 Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="border border-[#FF8C00] rounded-lg p-3 outline-none text-[#333333]"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="border border-[#FF8C00] rounded-lg p-3 outline-none text-[#333333]"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="border border-[#FF8C00] rounded-lg p-3 outline-none text-[#333333] h-24"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-[#FF8C00] hover:bg-orange-500 text-white py-3 rounded-lg font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
