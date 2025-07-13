import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import publicApi from '../api/publicApi'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { token, setToken, setUser } = useContext(ShopContext)

  const [mode, setMode] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (location.state?.fromLogout) {
      setMode('Login')
      setName('')
      setEmail('')
      setPassword('')
    }
  }, [location.state])

  useEffect(() => {
    if (token) navigate('/')
  }, [token, navigate])

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      let res
      if (mode === 'Sign Up') {
        res = await publicApi.post('/user/register', { name, email, password })
      } else {
        res = await publicApi.post('/user/login', { email, password })
      }

      if (res.data.success && res.data.token) {
        const user = res.data.user || { email }
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(user))
        setToken(res.data.token)
        setUser(user)
        toast.success(`${mode} successful!`)
        navigate('/')
      } else {
        toast.error(res.data.message || `${mode} failed.`)
      }
    } catch (err) {
      console.error('Auth error:', err)
      toast.error(err.response?.data?.message || err.message || 'Something went wrong.')
    }
  }

  const onGoogleSuccess = async (googleResp) => {
    try {
      const googleToken = googleResp.credential
      const res = await publicApi.post('/user/google-auth', { token: googleToken })
      if (res.data.success && res.data.token) {
        const user = res.data.user || { email: res.data.email }
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(user))
        setToken(res.data.token)
        setUser(user)
        toast.success('Login via Google successful!')
        navigate('/')
      } else {
        toast.error(res.data.message || 'Google login failed.')
      }
    } catch (err) {
      console.error('Google auth error:', err)
      toast.error('Google login error.')
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-4 text-[#333333]"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <h2 className="text-3xl font-medium text-[#FF8C00]">{mode}</h2>
        <hr className="border-none h-[1px] w-8 bg-[#FF8C00]" />
      </div>

      {mode === 'Sign Up' && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-[#333333] text-[#333333] rounded-lg"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full px-3 py-2 border border-[#333333] text-[#333333] rounded-lg"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="w-full px-3 py-2 border border-[#333333] text-[#333333] rounded-lg"
      />

      <div className="w-full flex justify-between text-sm -mt-2 text-[#333333]">
        <p className="cursor-pointer hover:text-[#FF8C00] transition">Forgot your password?</p>
        {mode === 'Login' ? (
          <p onClick={() => setMode('Sign Up')} className="cursor-pointer hover:text-[#FF8C00] transition">
            Create account
          </p>
        ) : (
          <p onClick={() => setMode('Login')} className="cursor-pointer hover:text-[#FF8C00] transition">
            Back to Login
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-[#FF8C00] hover:bg-orange-500 text-white font-medium px-8 py-2 mt-4 rounded-lg transition"
      >
        {mode === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>

      <div className="mt-4 w-full flex flex-col items-center">
        {mode === 'Login' ? (
          <GoogleLogin
            onSuccess={onGoogleSuccess}
            onError={() => toast.error('Google login failed.')}
          />
        ) : (
          <p className="text-xs text-[#555555] text-center">
            You can sign up faster by logging in with Google above first.
          </p>
        )}
      </div>
    </form>
  )
}

export default Login
