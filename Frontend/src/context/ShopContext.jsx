import { createContext, useState, useEffect } from "react"
import axios from "axios"

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const currency = "ETB"
  const delivery_fee = 100

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/list`)
        if (res.data.success) {
          setProducts(res.data.products || res.data.product || [])
        }
      } catch (err) {
        console.error("Failed to fetch products in context:", err)
      }
    }

    fetchProducts()
  }, [])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export default ShopContextProvider
