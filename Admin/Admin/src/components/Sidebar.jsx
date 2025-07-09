import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import SidebarNotifications from '../pages/SidebarNotifications'
import SidebarMessages from './SidebarMessages'

const linkClasses = 'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'

const Sidebar = ({ token }) => {
    const [unreadCount, setUnreadCount] = useState(0)
    console.log("🔐 Token received by Sidebar:", token)


    return (
        <div className="w-[18%] min-h-screen border-r-2 relative">
            {/* 🔁 Hidden component that updates unreadCount */}

            <div>
                <SidebarMessages token={token} setUnreadCount={setUnreadCount} />
            </div>

            <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
                <NavLink className={linkClasses} to="/add">
                    <img className="w-5 h-5" src={assets.add_icon} alt="Add" />
                    <p className="hidden md:block">Add Items</p>
                </NavLink>

                <NavLink className={linkClasses} to="/list">
                    <img className="w-5 h-5" src={assets.list_icon} alt="List" />
                    <p className="hidden md:block">List Items</p>
                </NavLink>

                <NavLink className={linkClasses} to="/orders">
                    <img className="w-5 h-5" src={assets.order_icon} alt="Orders" />
                    <p className="hidden md:block">Ordered Items</p>
                </NavLink>

                <NavLink className={linkClasses} to="/messages">
                    <div className="relative flex items-center gap-2">
                        <div className="relative w-5 h-5">
                            <img src={assets.message} alt="Messages" className="w-full h-full" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-[6px] -right-[6px] bg-red-600 text-white text-[10px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full leading-none">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <p className="hidden md:block">Messages</p>
                    </div>
                </NavLink>






                <div className={linkClasses}>
                    <SidebarNotifications token={token} />
                    <p className="hidden md:block">Notifications</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
