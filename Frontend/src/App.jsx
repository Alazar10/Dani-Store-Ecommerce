import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollUp'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import LoginSuccess from './components/LoginSuccess'
import SearchResults from './pages/SearchResults'
import { IoNotificationsOff } from 'react-icons/io5'
import Notifications from './pages/Notifications'
import Success from './components/Success'

const App = () => {
  return (
    <GoogleOAuthProvider clientId="98744752679-m4j7pd64vfb095as4ookv586rst9afaf.apps.googleusercontent.com">
      {/* Toast Notifications */}
      <ToastContainer
        theme="dark"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      {/* Black Navbar */}
      <div className="bg-black text-white">
        <Navbar />
      </div>

      <ScrollToTop />

      {/* Main Page Content (light background) */}
      <div className="bg-white text-black px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-4">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login-success' element={<LoginSuccess />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/search-results' element={<SearchResults />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/orders/success" element={<Success />} />


        </Routes>
      </div>

      {/* Black Footer */}
      <div className="bg-black text-[#FF8C00]">
        <Footer />
      </div>
    </GoogleOAuthProvider>
  )
}

export default App
