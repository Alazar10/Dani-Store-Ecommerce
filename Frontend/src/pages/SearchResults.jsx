import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'

const SearchResults = () => {
  const { searchResults } = useContext(ShopContext)

  return (
    <div className="p-6 text-[#333333]">
      <h2 className="text-2xl font-semibold text-[#FF8C00] mb-4">🔍 Search Results</h2>
      
      {searchResults.length === 0 ? (
        <p className="text-[#555555] text-sm">No products matched your search. Try something else?</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {searchResults.map((product, index) => (
            <ProductItem
              key={index}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResults
