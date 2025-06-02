import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Title from '../components/Title';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Message Sent:", formData);
        setFormData({ name: '', email: '', message: '' });
        alert("Message sent successfully!");
    };

    return (
        <div>

            <div className="text-2xl text-center pt-8 border-t">
                <Title text1={'CONTACT'} text2={'US'}/>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Page Title */}
            
            <p className="text-gray-500 text-center mt-1">Reach out to us anytime. We’re here to help!</p>

            {/* Contact Details */}
            <div className="mt-10 flex flex-col sm:flex-row gap-8">
                <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">📞 Get In Touch</h3>
                    <p className="text-gray-600 flex items-center gap-2"><FaPhoneAlt /> +251-XXX-XXX-XXX</p>
                    <p className="text-gray-600 flex items-center gap-2"><FaEnvelope /> support@danistore.com</p>
                    <p className="text-gray-600 flex items-center gap-2"><FaMapMarkerAlt /> Hawassa, Ethiopia</p>

                    {/* Social Media Links */}
                    <div className="flex gap-4 mt-6">
                        <a href="#" className="text-blue-600 hover:text-black text-2xl"><FaFacebook /></a>
                        <a href="#" className="text-pink-600 hover:text-black text-2xl"><FaInstagram /></a>
                        <a href="#" className="text-blue-400 hover:text-black text-2xl"><FaTwitter /></a>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md border">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">💬 Send Us a Message</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="Your Name" 
                            className="border rounded-lg p-3 outline-none text-gray-700"
                            required
                        />
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="Your Email" 
                            className="border rounded-lg p-3 outline-none text-gray-700"
                            required
                        />
                        <textarea 
                            name="message" 
                            value={formData.message} 
                            onChange={handleChange} 
                            placeholder="Your Message" 
                            className="border rounded-lg p-3 outline-none text-gray-700 h-24"
                            required
                        ></textarea>
                        <button 
                            type="submit" 
                            className="bg-black text-white py-3 rounded-lg font-semibold cursor-pointer transition"
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
