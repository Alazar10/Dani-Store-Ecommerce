import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { backendUrl } from '../config' // or use import.meta.env

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${backendUrl}/api/newsletter/subscribe`, { email })
      toast.success(res.data.message)
      setEmail('')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Subscription failed.')
    }
  }

  return (
    <div className="text-center text-[#333333]">
      <p className="text-2xl font-semibold text-[#FF8C00]">Subscribe now & get free delivery</p>
      <p className="text-[#555555] mt-3 px-4 sm:px-0">
        Unlock the first free delivery, early access to new fitness gear, and expert workout tips—straight to your inbox! Stay ahead in your fitness journey.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex flex-col sm:flex-row items-stretch gap-2 mx-auto my-6 border border-[#333333] p-2 rounded-md bg-white"
      >
        <input
          className="flex-1 outline-none bg-transparent text-[#333333] placeholder-[#999999] px-3 py-2"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-[#FF8C00] hover:bg-orange-500 text-white text-xs px-6 py-2 rounded transition whitespace-nowrap cursor-pointer"
        >
          SUBSCRIBE
        </button>
      </form>

    </div>
  )
}

export default Newsletter
