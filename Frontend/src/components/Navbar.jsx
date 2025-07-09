import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoChevronBack } from "react-icons/io5"
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const {
    setShowSearch, // optional
    getCartCount,
    navigate,
    token,
    logoutUser,
    backendUrl,
    setSearchResults // ✅ added
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
    <div className='flex items-center justify-between py-3 px-6 font-medium shadow-md'>
      {/* Logo */}
      <Link to='/'><img src={assets.Dani_logo} className='w-36' alt='Dani Store Logo' /></Link>

      {/* Navbar Links or Search Bar */}
      <div className="flex-1 flex justify-center transition-all duration-500">
        {!searchActive ? (
          <ul className='hidden sm:flex gap-6 text-sm text-gray-700'>
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/collection">COLLECTION</NavLink>
            <NavLink to="/about">ABOUT</NavLink>
            <NavLink to="/contact">CONTACT US</NavLink>
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
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
        <div className='w-5 text-xl cursor-pointer' onClick={() => setSearchActive(!searchActive)}>
          {!searchActive ? <FaSearch /> : <FaTimes />}
        </div>

        {/* Profile Dropdown */}
        <div className={`group relative ${searchActive ? "hidden" : "block"}`}>
          <div onClick={() => token ? null : navigate('/login')} className='w-5 text-2xl cursor-pointer'>
            <CgProfile />
            {token && (
              <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 text-sm'>
                  <p className='cursor-pointer hover:text-black'>My Profile</p>
                  <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                  <p onClick={logoutUser} className='cursor-pointer hover:text-black'>Logout</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Shopping Cart */}
        <Link to='/cart' className={`relative ${searchActive ? "hidden" : "block"}`}>
          <div className='w-5 min-w-5 text-xl'><FaShoppingCart /></div>
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>

        {/* Mobile Hamburger Menu */}
        <div onClick={() => setVisible(true)} className={`w-5 text-xl cursor-pointer sm:hidden ${searchActive ? "hidden" : "block"}`}>
          <GiHamburgerMenu />
        </div>
      </div>

      {/* Sidebar menu for mobile */}
      <div className={`fixed top-0 right-0 bottom-0 bg-white shadow-lg transition-transform duration-500 ${visible ? 'translate-x-0' : 'translate-x-full'} w-60`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer hover:text-blue-600 transition'>
            <IoChevronBack />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} to="/collection">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} to="/contact">CONTACT US</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
