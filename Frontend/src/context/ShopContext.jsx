import { createContext, useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([]) // ✅ new state
  const [cartItems, setCartItems] = useState({})
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const currency = "ETB"
  const delivery_fee = 100

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/shop/products`)
        if (res.data.success) {
          setProducts(res.data.products || [])
        }
      } catch (err) {
        console.error("Failed to fetch products:", err)
        toast.error("Failed to fetch products.")
      }
    }
    fetchProducts()
  }, [])

  const getUserCart = async (authToken) => {
    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`, {}, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      if (response.data.success) {
        setCartItems(response.data.cartData)
        localStorage.setItem('cartItems', JSON.stringify(response.data.cartData))
      }
    } catch (error) {
      console.error("Failed to fetch user cart:", error)
      toast.error("Could not sync cart.")
    }
  }

  useEffect(() => {
    const localToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    const storedCart = localStorage.getItem('cartItems')

    if (!token && localToken) setToken(localToken)
    if (!user && storedUser) setUser(JSON.parse(storedUser))
    if (storedCart) setCartItems(JSON.parse(storedCart))

    if (localToken) getUserCart(localToken)
  }, [])

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = async (itemId, size) => {
    const sizeLabel = typeof size === "string" ? size : size?.label
    if (!sizeLabel) {
      toast.error("Please select a size before adding to cart.")
      return
    }

    if (!token) {
      toast.error("Please log in to add items to your cart.")
      navigate('/login')
      return
    }

    try {
      await axios.post(`${backendUrl}/api/cart/add`, {
        productId: itemId,
        size: sizeLabel,
        quantity: 1
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const cartData = structuredClone(cartItems)
      if (!cartData[itemId]) cartData[itemId] = {}
      cartData[itemId][sizeLabel] = (cartData[itemId][sizeLabel] || 0) + 1
      setCartItems(cartData)

    } catch (error) {
      console.error("Cart sync failed:", error)
      toast.error(error.response?.data?.message || "Cart sync failed.")
    }
  }

  const updateQuantity = async (itemId, size, quantity) => {
    const sizeLabel = typeof size === "string" ? size : size?.label
    if (!sizeLabel || typeof quantity !== "number" || quantity < 0) return

    const cartData = structuredClone(cartItems)
    if (!cartData[itemId]) cartData[itemId] = {}
    cartData[itemId][sizeLabel] = quantity
    setCartItems(cartData)

    if (token && quantity > 0) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, {
          productId: itemId,
          size: sizeLabel,
          quantity
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } catch (error) {
        console.error("Failed to update quantity:", error)
        toast.error("Could not update cart item.")
      }
    }
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('cartItems')
    setToken('')
    setUser(null)
    setCartItems({})
    toast.success("Logged out.")
    navigate('/login')
  }

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
    searchResults,       
    setSearchResults,    
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
    setToken,
    user,
    setUser,
    logoutUser
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
