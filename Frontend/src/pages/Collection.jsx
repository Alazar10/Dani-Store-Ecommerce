import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Title from '../components/Title';

const Collection = () => {
    const [showFilter, setShowFilter] = useState(false);

    const categories = ["Supplements", "Wears", "Belts", "Plates", "Dumbbells", "Gloves", "Shakers"];
    const types = ["Home Gym Equipment", "Outdoor Gear", "Weightlifting", "Recovery Tools", "Accessories"];
    const fixedPriceFilters = [
        { label: "Under 50 ETB", min: 0, max: 50 },
        { label: "50 ETB - 500 ETB", min: 50, max: 100 },
        { label: "500 ETB - 1000 ETB", min: 500, max: 1000 },
        { label: "1000 ETB - 5000 ETB", min: 1000, max: 5000 },
        { label: "5000 ETB - 10000 ETB", min: 5000, max: 10000 },
        { label: "10000 ETB - 20000 ETB", min: 10000, max: 20000 },
        { label: "20000+", min: 20000, max: "" },
    ];

    return (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t px-6">
            
            {/* Filters Header (Always Visible) */}
            <div className="min-w-60">
                <p className="text-xl font-semibold mb-4 sm:block hidden">FILTERS</p>

                {/* Mobile Toggle Button (Only Visible on Mobile) */}
                <button 
                    onClick={() => setShowFilter(!showFilter)} 
                    className="text-xl flex items-center cursor-pointer gap-2 font-semibold hover:text-blue-500 transition sm:hidden"
                >
                    FILTERS {showFilter ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {/* Filters (Always Visible on Desktop, Toggle on Mobile) */}
                <div className={`transition-all duration-300 ${showFilter ? "block" : "hidden"} sm:block`}>
                    
                    {/* Price Filter */}
                    <div className="border border-gray-300 pl-5 py-3 mt-4">
                        <p className="text-sm font-medium">PRICE RANGE</p>
                        <div className="mt-3">
                            {fixedPriceFilters.map((price, index) => (
                                <label key={index} className="flex gap-2 cursor-pointer">
                                    <input type="radio" name="price" className="w-4 accent-blue-500" /> {price.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="border border-gray-300 pl-5 py-3 mt-4">
                        <p className="text-sm font-medium">CATEGORIES</p>
                        <div className="mt-3">
                            {categories.map((category, index) => (
                                <label key={index} className="flex gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 accent-blue-500" /> {category}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='flex-1'>
                
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'}/>

                    {/* Product Sort*/}
                    <select className='border-2 border-gray-300 text-sm px-2'>
                        <option value="relavant">Sort by: Default</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>
            </div>

        </div>
    );
};

export default Collection;
