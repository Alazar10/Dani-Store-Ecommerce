import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const location = useLocation()

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (location.state?.fromLogout) {
      setName('')
      setEmail('')
      setPassword('')
      setCurrentState('Login')
    }
  }, [location.state])

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const handleGoogleAuth = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential
      const res = await axios.post(`${backendUrl}/api/user/google-auth`, { token: googleToken })
      if (res.data.success) {
        setToken(res.data.token)
        localStorage.setItem('token', res.data.token)
        navigate('/')
      } else {
        toast.error(res.data.message || "Google auth failed.")
      }
    } catch (err) {
      console.error(err)
      toast.error("Google login error.")
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type='text'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type='email'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type='password'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        required
      />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        )}
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>

      <div className='mt-4 w-full flex flex-col items-center'>
        {currentState === 'Login' ? (
          <GoogleLogin
            onSuccess={handleGoogleAuth}
            onError={() => toast.error("Google login failed.")}
          />
        ) : (
          <p className='text-xs text-gray-500'>You can sign up faster by logging in with Google above first.</p>
        )}
      </div>
    </form>
  )
}

export default Login
