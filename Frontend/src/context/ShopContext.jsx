import { createContext, useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [cartItems, setCartItems] = useState({})
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const currency = "ETB"
  const delivery_fee = 100

  // ✅ Fetch products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/product/list`)
        if (res.data.success) {
          setProducts(res.data.products || res.data.product || [])
        }
      } catch (err) {
        console.error("Failed to fetch products:", err)
        toast.error("Failed to fetch products.")
      }
    }
    fetchProducts()
  }, [])

  // ✅ Sync cart with backend
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } })
      if (response.data.success) {
        setCartItems(response.data.cartData)
        localStorage.setItem('cartItems', JSON.stringify(response.data.cartData))
      }
    } catch (error) {
      console.error("Failed to fetch user cart:", error)
      toast.error("Could not sync cart.")
    }
  }

  // ✅ Load token and cart from localStorage
  useEffect(() => {
    const localToken = localStorage.getItem('token')
    const storedCart = localStorage.getItem('cartItems')

    if (!token && localToken) setToken(localToken)
    if (storedCart) setCartItems(JSON.parse(storedCart))

    if (localToken) getUserCart(localToken)
  }, [])

  useEffect(() => {
    if (token) {
      getUserCart(token)
    }
  }, [token])


  // ✅ Always persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = async (itemId, size) => {
    const sizeLabel = typeof size === "string" ? size : size?.label
    if (!sizeLabel) {
      toast.error("Please select a size before adding to cart.")
      return
    }

    const cartData = structuredClone(cartItems)
    if (!cartData[itemId]) cartData[itemId] = {}
    cartData[itemId][sizeLabel] = (cartData[itemId][sizeLabel] || 0) + 1
    setCartItems(cartData)

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, {
          itemId,
          size: sizeLabel
        }, {
          headers: { token }
        })
      } catch (error) {
        console.error("Cart sync failed:", error)
        toast.error("Cart sync failed.")
      }
    }
  }

  const updateQuantity = async (itemId, size, quantity) => {
    const sizeLabel = typeof size === "string" ? size : size?.label
    if (!sizeLabel) return

    const cartData = structuredClone(cartItems)
    if (!cartData[itemId]) cartData[itemId] = {}
    cartData[itemId][sizeLabel] = quantity
    setCartItems(cartData)

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, {
          itemId,
          size: sizeLabel,
          quantity
        }, {
          headers: { token }
        })
      } catch (error) {
        console.error("Failed to update quantity:", error)
        toast.error("Could not update cart item.")
      }
    }
  }

  // ✅ Validate products before counting
  const getCartCount = () => {
    let count = 0
    for (const productId in cartItems) {
      const productExists = products.find(p => p._id === productId)
      if (!productExists) continue

      for (const size in cartItems[productId]) {
        count += cartItems[productId][size]
      }
    }
    return count
  }

  const getCartAmount = () => {
    let total = 0
    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId)
      if (!product) continue

      const sizes = Array.isArray(product.sizes)
        ? product.sizes
        : typeof product.sizes === "string"
          ? JSON.parse(product.sizes)
          : []

      for (const sizeLabel in cartItems[itemId]) {
        const qty = cartItems[itemId][sizeLabel]
        const sizeData = sizes.find(s => s.label === sizeLabel)
        const price = sizeData?.price ?? product.price ?? 0
        total += qty * price
      }
    }
    return total
  }

  const value = {
    products,
    search,
    setSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    navigate,
    backendUrl,
    currency,
    delivery_fee,
    token,
    setToken
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
