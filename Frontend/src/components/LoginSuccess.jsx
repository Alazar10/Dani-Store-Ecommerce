import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

// inside component



const LoginSuccess = () => {
    const { setToken } = useContext(ShopContext)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get("token")

    if (token) {
      setToken(token)
      localStorage.setItem("token", token)
      setTimeout(() => navigate("/"), 1200) // small delay for UX
    } else {
      navigate("/login")
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-black border-gray-300 mb-6"></div>
      <p className="text-xl font-medium text-gray-800">Verifying your email...</p>
      <p className="text-sm text-gray-500 mt-1">Hang tight, we're logging you in automatically.</p>
    </div>
  )
}

export default LoginSuccess
