import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Collection = () => {
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ["Supplements", "Wears", "Belts", "Plates", "Dumbbells", "Gloves", "Shakers"];
  const fixedPriceFilters = [
    { label: "Under 50 ETB", min: 0, max: 50 },
    { label: "50 ETB - 500 ETB", min: 50, max: 500 },
    { label: "500 ETB - 1000 ETB", min: 500, max: 1000 },
    { label: "1000 ETB - 5000 ETB", min: 1000, max: 5000 },
    { label: "5000 ETB - 10000 ETB", min: 5000, max: 10000 },
    { label: "10000 ETB - 20000 ETB", min: 10000, max: 20000 },
    { label: "20000+", min: 20000, max: "" },
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t px-6">
      
      {/* Filters Section */}
      <div className="min-w-60">
        <p className="text-xl font-semibold mb-4 sm:block hidden">FILTERS</p>

        {/* Price Filter Toggle */}
        <div className="border border-gray-300 pl-5 py-3 mt-4">
          <button 
            onClick={() => setShowPriceFilter(!showPriceFilter)} 
            className="flex items-center justify-between w-full text-sm font-medium cursor-pointer"
          >
            PRICE RANGE {showPriceFilter ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {/* Animated Price Filters */}
          <div 
            className={`transition-all duration-300 overflow-hidden ${showPriceFilter ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          >
            {fixedPriceFilters.map((price, index) => (
              <label 
                key={index} 
                className={`flex gap-2 cursor-pointer p-2 rounded ${
                  selectedPrice === price.label ? "bg-blue-100 text-blue-700" : ""
                }`}
                onClick={() => setSelectedPrice(price.label)}
              >
                <input 
                  type="radio" 
                  name="price" 
                  className="w-4 accent-blue-500" 
                  checked={selectedPrice === price.label}
                  onChange={() => setSelectedPrice(price.label)}
                /> 
                {price.label}
              </label>
            ))}
          </div>
        </div>

        {/* Category Filter Toggle */}
        <div className="border border-gray-300 pl-5 py-3 mt-4">
          <button 
            onClick={() => setShowCategoryFilter(!showCategoryFilter)} 
            className="flex items-center justify-between w-full text-sm font-medium cursor-pointer"
          >
            CATEGORIES {showCategoryFilter ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {/* Animated Category Filters */}
          <div 
            className={`transition-all duration-300 overflow-hidden ${showCategoryFilter ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          >
            {categories.map((category, index) => (
              <label 
                key={index} 
                className={`flex gap-2 cursor-pointer p-2 rounded ${
                  selectedCategories.includes(category) ? "bg-blue-100 text-blue-700" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                <input 
                  type="checkbox" 
                  className="w-4 accent-blue-500" 
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                /> 
                {category}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Sorting and Title */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <h1 className="font-semibold">ALL COLLECTIONS</h1>
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
