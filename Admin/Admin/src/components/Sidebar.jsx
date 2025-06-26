// src/components/Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import SidebarNotifications from '../pages/SidebarNotifications'


const linkClasses =
    'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'

const Sidebar = ({ token }) => {
    return (
        <div className="w-[18%] min-h-screen border-r-2">
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

                {/* Notification bell & dropdown */}
                <div className={linkClasses}>
                    <SidebarNotifications token={token} />
                    <p className="hidden md:block">Notifications</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
