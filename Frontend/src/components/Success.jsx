import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const OrdersSuccess = () => {
  const location = useLocation()
  const [receipt, setReceipt] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tx_ref = params.get('trx_ref')
    const status = params.get('status')

    if (status === 'success' && tx_ref) {
      setLoading(true)
      axios.get(`/api/payment/verify?tx_ref=${tx_ref}`)
        .then(res => {
          if (res.data.success) {
            setReceipt(res.data)
            toast.success('✅ Payment verified successfully!')
          } else {
            toast.error('⚠️ Payment could not be verified.')
          }
        })
        .catch(err => {
          toast.error('❌ Error verifying payment.')
          console.error(err)
        })
        .finally(() => setLoading(false))
    }
  }, [location])

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-semibold text-[#FF8C00] mb-6 text-center">Payment Success 🎉</h2>

      {loading && (
        <p className="text-center text-gray-600">Verifying transaction...</p>
      )}

      {receipt && (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-green-600 mb-4">✅ Payment Confirmed</h3>
          <div className="space-y-2 text-[#333333]">
            <p><strong>Transaction Ref:</strong> {receipt.tx_ref}</p>
            <p><strong>Amount Charged:</strong> {receipt.amount} {receipt.currency}</p>
            <p><strong>Email:</strong> {receipt.email}</p>
            <p><strong>Status:</strong> {receipt.status}</p>
            <p><strong>Charged:</strong> {receipt.charged}</p>
          </div>
        </div>
      )}

      {!receipt && !loading && (
        <p className="text-center text-gray-500 mt-8">No payment confirmation found. If you've just paid, hang tight or refresh.</p>
      )}
    </div>
  )
}

export default OrdersSuccess
