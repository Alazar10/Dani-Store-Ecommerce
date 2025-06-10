import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoChevronBack } from "react-icons/io5";

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        console.log("Searching for:", searchQuery);
        alert(`Searching for: ${searchQuery}`);
    };

    return (
        <div className='flex items-center justify-between py-3 px-6 font-medium shadow-md'>

            {/* Logo */}
            <Link to='/'><img src={assets.Dani_logo} className='w-36' alt='Dani Store Logo' /></Link>

            {/* Navbar Links OR Search Bar */}
            <div className="flex-1 flex justify-center transition-all duration-500">
                {!searchActive ? (
                    <ul className='hidden sm:flex gap-6 text-sm text-gray-700'>
                       <NavLink className="relative hover:text-black transition-all duration-300 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-black before:opacity-0 before:transition-all before:duration-300 hover:before:w-full hover:before:opacity-100" to="/">HOME</NavLink>
                        <NavLink className="relative hover:text-black transition-all duration-300 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full hover:before:opacity-100" to="/collection">COLLECTION</NavLink>
                        <NavLink className="relative hover:text-black transition-all duration-300 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full hover:before:opacity-100" to="/about">ABOUT</NavLink>
                        <NavLink className="relative hover:text-black transition-all duration-300 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full hover:before:opacity-100" to="/contact">CONTACT US</NavLink>

                    </ul>
                ) : (
                    <div className="relative w-80 sm:w-96">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full border border-black rounded-lg px-4 py-2 outline-none focus:border-gray-700 transition-all duration-500"
                            autoFocus
                        />
                        <button 
                            onClick={handleSearch} 
                            className="absolute right-3 top-2 text-black text-lg hover:text-gray-700 transition"
                        >
                            <FaSearch />
                        </button>
                    </div>
                )}
            </div>

            {/* Icons Section */}
            <div className='flex items-center gap-6'>
                {/* Toggle Search */}
                <div className='w-5 text-xl cursor-pointer' onClick={() => setSearchActive(!searchActive)}>
                    {!searchActive ? <FaSearch /> : <FaTimes />}
                </div>

                {/* Profile Dropdown */}
                <div className={`group relative ${searchActive ? "hidden" : "block"}`}>
                    <div className='w-5 text-2xl cursor-pointer'>
                        <CgProfile />
                    </div>
                </div>

                {/* Shopping Cart */}
                <Link to='/cart' className={`relative ${searchActive ? "hidden" : "block"}`}>
                    <div className='w-5 min-w-5 text-xl'>
                        <FaShoppingCart />
                    </div>
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
                </Link>

                {/* Mobile Hamburger Menu */}
                <div onClick={() => setVisible(true)} className={`w-5 text-xl cursor-pointer sm:hidden ${searchActive ? "hidden" : "block"}`}>
                    <GiHamburgerMenu />
                </div>
            </div>

            {/* Sidebar menu for mobile */}
            <div className={`fixed top-0 right-0 bottom-0 bg-white shadow-lg transition-transform duration-500 ${visible ? 'translate-x-0' : 'translate-x-full'} w-60`}>
                <div className='flex flex-col text-gray-600'>
                    {/* Back Button */}
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer hover:text-blue-600 transition'>
                        <IoChevronBack />
                        <p>Back</p>
                    </div>
                    
                    {/* Sidebar Links */}
                    <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border hover:bg-gray-100 transition' to="/">HOME</NavLink> 
                    <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border hover:bg-gray-100 transition' to="/collection">COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border hover:bg-gray-100 transition' to="/about">ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border hover:bg-gray-100 transition' to="/contact">CONTACT US</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
