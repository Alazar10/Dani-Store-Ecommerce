import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoChevronBack } from "react-icons/io5";

const Navbar = () => {

    const [visible, setVisible] = useState(false)

  return (
    <div className='flex items-center justify-between py-2 font-medium'>

        <Link to='/'><img src={assets.Dani_logo} className='w-36' alt='' /></Link>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

            <NavLink className='flex flex-col items-center gap-1' to='/'>
                <p>HOME </p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>

            <NavLink className='flex flex-col items-center gap-1' to='/collection'>
                <p>COLLECTION </p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>

            <NavLink className='flex flex-col items-center gap-1' to='/about'>
                <p>ABOUT </p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>

            <NavLink className='flex flex-col items-center gap-1' to='/contact'>
                <p>CONTACT US </p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>
        </ul>

        <div className='flex items-center gap-6'>
            <div className='w-5 text-xl cursor-pointer'>
                <FaSearch/>
            </div>
            <div className='group relative'>
                <div className='w-5 text-2xl cursor-pointer'>
                    <CgProfile />
                </div>
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p className='cursor-pointer hover:text-black'>Orders</p>
                        <p className='cursor-pointer hover:text-black'>Logout</p>

                    </div>
                </div>
            </div>
            <Link to='/cart' className='relative'>
            <div className='w-5 min-w-5 text-xl'>
                <FaShoppingCart />
            </div>
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
        </Link>
        <div onClick={()=>setVisible(true)} className='w-5 text-xl curosr-pointer sm:hidden'>
            <GiHamburgerMenu />
        </div>       
        </div>

        {/* Sidebar menu for small screen*/}

        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                    <div className='h-4'>
                        <IoChevronBack />
                    </div>
                    <p>Back</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink> 
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT US</NavLink>
            </div>
        </div>
        

    </div>
  )
}

export default Navbar