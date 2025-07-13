import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { FaSearch, FaShoppingCart, FaBell, FaTimes } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoChevronBack } from "react-icons/io5"
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const [searchActive, setSearchActive] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [showMenu, setShowMenu] = useState(false)

    const {
        getCartCount,
        navigate,
        token,
        logoutUser,
        backendUrl,
        setSearchResults,
        notificationCount
    } = useContext(ShopContext)

    const handleSearch = async () => {
        try {
            const res = await fetch(`${backendUrl}/api/product/search?q=${encodeURIComponent(searchQuery)}`)
            const data = await res.json()
            if (data.success) {
                setSearchResults(data.products)
                navigate('/search-results')
            } else {
                alert("No matching products found.")
            }
        } catch (err) {
            console.error("Search failed:", err)
            alert("Search failed. Please try again.")
        }
    }

    return (
        <div className="flex items-center justify-between py-3 px-6 font-medium shadow-md bg-black text-white">
            {/* Logo */}
            <Link to="/"><img src={assets.Dani_logo} className="w-36" alt="Dani Store Logo" /></Link>

            {/* Center Navigation or Search */}
            <div className="flex-1 flex justify-center transition-all duration-500">
                {!searchActive ? (
                    <ul className="hidden sm:flex gap-6 text-sm text-[#FF8C00]">
                        <NavLink className="hover:text-orange-500 transition" to="/">HOME</NavLink>
                        <NavLink className="hover:text-orange-500 transition" to="/collection">COLLECTION</NavLink>
                        <NavLink className="hover:text-orange-500 transition" to="/about">ABOUT</NavLink>
                        <NavLink className="hover:text-orange-500 transition" to="/contact">CONTACT US</NavLink>
                    </ul>
                ) : (
                    <div className="relative w-80 sm:w-96">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full border border-[#FF8C00] bg-black text-white placeholder:text-gray-400 rounded-lg px-4 py-2 outline-none focus:border-orange-500 transition-all"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-3 top-2 text-[#FF8C00] hover:text-orange-400"
                        >
                            <FaSearch />
                        </button>
                    </div>
                )}
            </div>

            {/* Icons Section */}
            <div className="flex items-center gap-6">
                {/* 🔍 Search Toggle */}
                <div className="w-5 text-xl cursor-pointer text-[#FF8C00]" onClick={() => setSearchActive(!searchActive)}>
                    {!searchActive ? <FaSearch /> : <FaTimes />}
                </div>

                {/* 🔔 Notification Bell (Conditional) */}
                {token && !searchActive && (
                    <Link to="/notifications" className="relative">
                        <FaBell className="text-xl text-[#FF8C00]" />
                        {notificationCount > 0 && (
                            <span className="absolute -top-1 -right-2 w-4 h-4 text-[10px] bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                                {notificationCount}
                            </span>
                        )}
                    </Link>
                )}

                {/* 👤 Profile (Responsive Toggle) */}
                {!searchActive && (
                    <div className="relative">
                        <div
                            onClick={() => token ? setShowMenu(prev => !prev) : navigate('/login')}
                            className="w-5 text-2xl cursor-pointer text-[#FF8C00]"
                        >
                            <CgProfile />
                        </div>
                        {token && showMenu && (
                            <div className="absolute right-0 mt-2 z-40">
                                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-[#1f1f1f] text-[#FF8C00] text-sm border border-[#FF8C00] rounded-lg">
                                    <p onClick={() => setShowMenu(false)} className="cursor-pointer hover:text-white">
                                        My Profile
                                    </p>
                                    <p onClick={() => {
                                        navigate('/orders')
                                        setShowMenu(false)
                                    }} className="cursor-pointer hover:text-white">
                                        Orders
                                    </p>
                                    <p onClick={() => {
                                        logoutUser()
                                        setShowMenu(false)
                                    }} className="cursor-pointer hover:text-white">
                                        Logout
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>
                )}

                {/* 🛒 Cart (Conditional) */}
                {token && !searchActive && (
                    <Link to="/cart" className="relative">
                        <div className="w-5 min-w-5 text-xl text-[#FF8C00]">
                            <FaShoppingCart />
                        </div>
                        {getCartCount() > 0 && (
                            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#FF8C00] text-black aspect-square rounded-full text-[8px]">
                                {getCartCount()}
                            </p>
                        )}
                    </Link>
                )}

                {/* 🍔 Mobile Menu */}
                {!searchActive && (
                    <div onClick={() => setVisible(true)} className="w-5 text-xl cursor-pointer sm:hidden text-[#FF8C00]">
                        <GiHamburgerMenu />
                    </div>
                )}
            </div>

            {/* 📱 Mobile Sidebar */}
            <div className={`fixed top-0 right-0 bottom-0 bg-black text-white shadow-lg transition-transform duration-500 ${visible ? 'translate-x-0' : 'translate-x-full'} w-60 z-50`}>
                <div className="flex flex-col">
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer hover:text-[#FF8C00]">
                        <IoChevronBack />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-b border-[#FF8C00] hover:text-[#FF8C00]" to="/">HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-b border-[#FF8C00] hover:text-[#FF8C00]" to="/collection">COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-b border-[#FF8C00] hover:text-[#FF8C00]" to="/about">ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-b border-[#FF8C00] hover:text-[#FF8C00]" to="/contact">CONTACT US</NavLink>
                    {token && (
                        <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border-b border-[#FF8C00] hover:text-[#FF8C00]" to="/notifications">NOTIFICATIONS</NavLink>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
