import React, { useState, useEffect } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import axios from "axios"
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"

const Collection = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showPriceFilter, setShowPriceFilter] = useState(false)
  const [showCategoryFilter, setShowCategoryFilter] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [sortOption, setSortOption] = useState("relavant")

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = ["Supplements", "Wears", "Belts", "Plates", "Dumbbells", "Gloves", "Shakers"]
  const fixedPriceFilters = [
    { label: "Under 50 ETB", min: 0, max: 50 },
    { label: "50 ETB - 500 ETB", min: 50, max: 500 },
    { label: "500 ETB - 1000 ETB", min: 500, max: 1000 },
    { label: "1000 ETB - 5000 ETB", min: 1000, max: 5000 },
    { label: "5000 ETB - 10000 ETB", min: 5000, max: 10000 },
    { label: "10000 ETB - 20000 ETB", min: 10000, max: 20000 },
    { label: "20000+", min: 20000, max: Infinity },
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/list`)
        if (res.data.success) {
          setProducts(res.data.products || res.data.product || [])
        }
      } catch (err) {
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const filteredProducts = products
    .filter((item) => {
      const inCategory =
        selectedCategories.length === 0 || selectedCategories.includes(item.category)

      const inPriceRange = (() => {
        if (!selectedPrice) return true
        const selected = fixedPriceFilters.find((p) => p.label === selectedPrice)
        if (!selected) return true
        const price = parseFloat(item.price)
        return price >= selected.min && price <= selected.max
      })()

      return inCategory && inPriceRange
    })
    .sort((a, b) => {
      if (sortOption === "low-high") return a.price - b.price
      if (sortOption === "high-low") return b.price - a.price
      return 0
    })

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t px-6">
      {/* Mobile FILTERS Toggle */}
      <div
        className="text-xl font-semibold mb-4 flex items-center justify-between sm:hidden cursor-pointer"
        onClick={() => setShowMobileFilters(!showMobileFilters)}
      >
        <span>FILTERS</span>
        {showMobileFilters ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {/* Filters Section */}
      <div className={`min-w-60 transition-all duration-300 ${showMobileFilters ? "block" : "hidden"} sm:block`}>
        {/* Price Filter */}
        <div className="border border-gray-300 pl-5 py-3 mt-4">
          <button
            onClick={() => setShowPriceFilter(!showPriceFilter)}
            className="flex items-center justify-between w-full text-sm font-medium cursor-pointer"
          >
            PRICE RANGE {showPriceFilter ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              showPriceFilter ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
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

        {/* Category Filter */}
        <div className="border border-gray-300 pl-5 py-3 mt-4">
          <button
            onClick={() => setShowCategoryFilter(!showCategoryFilter)}
            className="flex items-center justify-between w-full text-sm font-medium cursor-pointer"
          >
            CATEGORIES {showCategoryFilter ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              showCategoryFilter ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
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

      {/* Product Sorting + Title + Grid */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            className="border-2 border-gray-300 text-sm px-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relavant">Sort by: Default</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p>No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection
